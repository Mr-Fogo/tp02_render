const { Album } = require("../database");

exports.get = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    try {
        let albums;
        if (searchTerm) {
            albums = await Album.findAll({
                where: {
                    [Op.or]: [
                        { nom: { [Op.like]: `%${searchTerm}%` } },
                        { auteur: { [Op.like]: `%${searchTerm}%` } }
                    ]
                }
            });
        } else {
            albums = await Album.findAll();
        }
        res.json(albums);
    } catch (error) {
        res.status(500).send({
            message: "Erreur lors de la récupération des albums"
        });
    }
};
