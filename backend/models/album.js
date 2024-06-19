module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define("Album", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nbTitre: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        prix: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        auteur: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Album;
};