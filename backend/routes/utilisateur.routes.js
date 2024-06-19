const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    let router = require("express").Router();

    // login utilisateur
    router.post("/login", utilisateur.login);
    router.post("/register", utilisateur.register);  
    router.get("/userinfo", utilisateur.userinfo);

    app.use('/utilisateur', router);
  };
