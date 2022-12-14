const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

//Rota de artigos:
router.get("/admin/articles", (req, res)=>{
    Article.findAll({
        include:[{model: Category}]
    }).then(articles =>{
        res.render("admin/articles/index",{articles:articles});  
    })
});

//Rota para criar novo artigo
router.get("/admin/articles/new", (req, res) =>{
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
});

//Rota para salvar artigo:
router.post("/articles/save", (req, res)=> {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category //foreign key criado pelo relacionamento belongsTo
    }).then(()=>{
        res.redirect("/admin/articles");
    });
});

//Rota para deletar artigo:
router.post("/articles/delete", (req, res)=>{
    //vou receber o id da categoria que queremos deletar:
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //se for um número
            Article.destroy({
                where:{
                    id :id
                }
            }).then(()=>{
                res.redirect("/admin/articles")
            })
        } else {//se não for número
            res.redirect("/admin/articles")
        }
    }else{ //se for null
        res.redirect("/admin/articles")
    }
});

//Rota para edição da artigos:
router.get("/admin/articles/edit/:id", (req, res) =>{
    var id = req.params.id;
    
    Article.findByPk(id).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render("admin/articles/edit",{categories:categories})
            });
        }else{
            res.redirect("/admin/articles");
        }
    }).catch(err=> {
        res.redirect("/");
    })
});

//Rota para salvar edições no BD:
router.post("/articles/update", (req, res)=> {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;

    Article.update({title: title, slug: slugify(title), body:body}, {
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/articles");
    });
});

module.exports = router;