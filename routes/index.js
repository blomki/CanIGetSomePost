let express = require("express");
let router = express.Router();

/**
 * Routing for Articles
 */
const ArticlesController = require("../controllers/smtpController");
const controller = new ArticlesController();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Quête Odyssey Envoyer un email" });
});

router.get("/askForCookiesRecipe", (req, res) =>
  controller.envoyerRecette(req, res)
);

module.exports = router;
