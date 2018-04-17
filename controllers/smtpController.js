const nodemailer = require("nodemailer");
/**
 * Class Articles Controller
 */
class ArticlesController {
  envoyerRecette(req, res) {
    // Création de la méthode de transport de l'email
    let smtpTransport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3957a04f3d530b",
        pass: "48f31fa8ee30f3"
      }
    });
    smtpTransport.sendMail(
      {
        from: "Julien Foucher <julien@fabr.fr>", // Expediteur
        to: "supergrandma@yopmail.com", // Destinataires
        subject: "Au secours !", // Sujet
        text:
          "Bonjour mamie, j'ai besoin de ton aide. Pourrais-tu m'envoyer ta recette de cookies ?", // plaintext body
        html:
          "Bonjour mamie, j'ai besoin de ton aide. Pourrais-tu m'envoyer ta recette de <b>cookies</b> ?" // html body
      },
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent");
        }
      }
    );
    res.render("index", { title: "Quête Odyssey Envoyer un email", destinataire: "supergrandma@yopmail.com", resultat: "Message envoyé !" });
  }
}

module.exports = ArticlesController;
