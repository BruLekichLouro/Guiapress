const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

//Criando rota:
router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new")
});

//Rota para pegar dados do formulário e criar nova categoria:
router.post("/categories/save", (req, res)=>{
    var title = req.body.title;
    if(title != undefined){//usuário não poderá cadastrar valor nulo

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/");
        })
    }else{
        res.redirect("/admin/categories/new");
    }
})

//Rota para tela onde serão listadas as categorias:
router.get("/admin/categories", (req, res)=>{

    //chamar model:
    Category.findAll().then(categories =>{
        res.render("admin/categories/index", {categories:categories})
    }); 
});

module.exports = router;