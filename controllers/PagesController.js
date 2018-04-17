const db = require(`../models/index.js`);
/**
 * Class Pages Controller
 */
class PagesController {
  /**
   * Page about
   * @param {*} req
   * @param {*} res
   */
  about(req, res) {
    res.render("pages/about");
  }
  /**
   * Méthodes du controller pour la page concept
   * @param {*} req
   * @param {*} res
   */
  concept(req, res) {
    res.render("pages/concept");
  }
  contact(req, res) {
    res.render("pages/contact");
  }
  users(req, res) {
    db.Users.findAll().then(users => {
      res.render("pages/users", {
        users
      });
    });
  }
  articles(req, res) {
    db.Articles.findAll().then(articles => {
      res.render("pages/articles", {
        articles
      });
    });
  }

  dashboard(req, res) {
    async function getElt() {
      const nbCommentaires = await db.Comments.count().then(
        nbCommentaires => nbCommentaires
      );
      const nbArticles = await db.Articles.count().then(
        nbArticles => nbArticles
      );
      const nbCategories = await db.Categories.count().then(
        nbCategories => nbCategories
      );
      const comments = await db.Comments.findAll({ limit: 5 }).then(
        comments => comments
      );
      res.render("pages/dashboard", {
        nbCommentaires,
        nbArticles,
        nbCategories,
        comments
      });
    }
    getElt();
  }
}

module.exports = PagesController;
