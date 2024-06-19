const { v4: uuidv4 } = require("uuid");
const { ACCESS_TOKEN_SECRET } = require("../config.js");
const jwt = require('jsonwebtoken');
const { User } = require("../database");

// Fonction pour générer un token JWT
function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

// Fonction pour obtenir un utilisateur par login et mot de passe
async function getUserByLoginAndPassword(login, password) {
  return await User.findOne({ where: { login: login, password: password } });
}

// Route pour la connexion
exports.login = async (req, res) => {
  console.log("login start");
  const { login, password } = req.body;

  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(login) && pattern.test(password)) {
    const utilisateur = await getUserByLoginAndPassword(login, password);
    if (utilisateur) {
      const { id, name, firstname, email } = utilisateur;
      const user = { id, name, firstname, login, email };
      console.log("C'est good");
      let accessToken = generateAccessToken(user);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.send(utilisateur);
    } else {
      res.status(404).send({
        message: "Utilisateur inexistant"
      });
    }
  } else {
    res.status(400).send({
      message: "Login ou mot de passe invalide"
    });
  }
};

exports.register = async (req, res) => {
  const { nom, prenom, email, login, password } = req.body;
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(login) && pattern.test(password)) {
    try {
      const user = await User.create({ name: nom, firstname: prenom, email: email, login: login, password: password });
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send({
        message: "Erreur lors de l'enregistrement de l'utilisateur"
      });
    }
  } else {
    res.status(400).send({
      message: "Login ou mot de passe invalide"
    });
  }
};

// Route pour obtenir un utilisateur par son id
exports.userinfo = async (req, res) => {
  const id = req.params.id;
  try {
    const utilisateur = await User.findByPk(id);
    if (utilisateur) {
      res.json(utilisateur);
    } else {
      res.status(404).send({
        message: "Utilisateur non trouvé"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Erreur lors de la récupération de l'utilisateur"
    });
  }
};
