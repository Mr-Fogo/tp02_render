const Sequelize = require('sequelize');
const POSTGRE_KEY = process.env.DB_CONNECTION_STRING;
//const POSTGRE_KEY = "postgres://couille_user:1JbyKVaOkwwyliIAisldgIpJ3mvxGY2D@dpg-cppa2rtds78s73e4htug-a.frankfurt-postgres.render.com/couille"



const albumsData = [
  {"id":"0","nom":"VillainS","nbTitre":"5","prix":"35","auteur":"DreamCatcher","genre":"K-pop","image":"/assets/picture/ootd_album.jpg"},
  {"id":"1","nom":"Apocalypse : Save us","nbTitre":"14","prix":"35","auteur":"DreamCatcher","genre":"K-pop","image":"/assets/picture/Save_Us.png"},
  {"id":"2","nom":"Random Access Memories","nbTitre":"13","prix":"40","auteur":"Daft Punk","genre":"Electronic","image":"/assets/picture/tzm.jpg"},
  {"id":"3","nom":"Dystopia : The Tree of Language","nbTitre":"7","prix":"40","auteur":"DreamCatcher","genre":"K-pop","image":"/assets/picture/Dreamcatcher_-_Dystopia_The_Tree_of_Language.jpg"},
  {"id":"4","nom":"Raid of Dream","nbTitre":"6","prix":"10","auteur":"DreamCatcher","genre":"K-pop","image":"/assets/picture/rod.jpg"},
  {"id":"5","nom":"aespa","nbTitre":"12","prix":"15","auteur":"aespa","genre":"K-pop","image":"/assets/picture/ae.jpg"}
];

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite',
//     logging: true
//   });
 //EN HAUT DE LA PAGE
  const sequelize = new Sequelize(POSTGRE_KEY, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native:true
    }
  });

  const user = require("./models/user.js")(sequelize, Sequelize);
  const album = require("./models/album.js")(sequelize, Sequelize);
  
 module.exports.User = user;
 module.exports.Album = album;
 module.exports.sequelize = sequelize; 


  

