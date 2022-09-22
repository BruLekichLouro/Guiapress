const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

//Rota:
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
            res.redirect("admin/categories");
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

//Rota para deletar categoria:
router.post("/categories/delete", (req, res)=>{
    //vou receber o id da categoria que queremos deletar:
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //se for um número
            Category.destroy({
                where:{
                    id :id
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            })
        } else {//se não for número
            res.redirect("/admin/categories")
        }
    }else{ //se for null
        res.redirect("/admin/categories")
    }
});

//Rota para edição da categoria:
router.get("/admin/categories/edit/:id", (req, res) =>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/categories");
    };
    Category.findByPk(id).then(category =>{
        if(category != undefined){
            res.render("admin/categories/edit",{category: category})

        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro=> {
        res.redirect("/admin/categories");
    })
});

module.exports = router;