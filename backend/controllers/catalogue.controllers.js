const { Album } = require("../database");
const { Op } = require("sequelize");

exports.get = async (req, res) => {
    const searchTerm = req.query.searchTerm;

    try {
        let albums;
        if (searchTerm) {
            console.log("Search Term:", searchTerm);
            albums = await Album.findAll({
                where: {
                    [Op.or]: [
                        { nom: { [Op.iLike]: `%${searchTerm}%` } },
                        { auteur: { [Op.iLike]: `%${searchTerm}%` } }
                    ]
                }
            });
        } else {
            albums = await Album.findAll();
        }
        res.json(albums);
    } catch (error) {
        console.error("Error during album search:", error);
        res.status(500).send({
            message: "Erreur lors de la récupération des albums"
        });
    }
};
