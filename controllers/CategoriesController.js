const db = require(`../models/index.js`);
/**
 * Class Categories Controller
 */
class CategoriesController {
  /**
   * Page lister les catégories
   * @param {*} req
   * @param {*} res le contenu de la réponse
   */
  liste(req, res) {
    // d'abord je récupère les Catégories dans la tables Catégories...
    db.Categories.findAll().then(categories => {
      //  ... puis j'envoie à la vue
      res.render("categories/liste", {
        // on précise le contenu de ce qui est envoyé (à savoir les objets categories)
        categories
      });
    });
  }
  creer(req, res) {
    res.render("categories/creer");
  }
  enregistrer(req, res) {
    const monFichier = req.files.photo; // on pourrait écrire en destructuring : const{photo} = req.files;
    let datas = req.body;
    datas.photo = monFichier.name;
    monFichier.mv(`public/uploads/${monFichier.name}`, () => {
      db.Categories.create(datas).then(categorie =>
        res.redirect("/categories/liste")
      );
    });
  }
  supprimer(req, res) {
    // on récupère les données en post et on regarde le body du résultat
    db.Categories.findById(req.params.id).then(categorie => {
      categorie.destroy().then(() => {
        res.redirect("/categories/liste");
      });
    });
  }
  modifier(req, res) {
    db.Categories.findById(req.params.id).then(categorie => {
      //  ... puis j'envoie à la vue
      res.render("categories/modifier", { categorie });
    });
  }
  maj(req, res) {
    // on récupère les données en post et on regarde le body du résultat
    db.Categories.update(req.body, { where: { id: req.params.id } }).then(
      categorie => res.redirect("/categories/liste")
    );
  }
  affichage(req, res) {
    db.Categories.update(
      { active: req.query.visibilite },
      { where: { id: req.query.id } }
    ).then(() => {
      res.redirect("/categories/liste");
    });
  }
}

module.exports = CategoriesController;
