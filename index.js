const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//View engine:
app.set('view engine','ejs');

//Arquivos static:
app.use(express.static('public'));
//Body-parser (para aceitar dados de formulários):
app.use(bodyParser.urlencoded({extend:false}));
//aceitar também dados formato json:
app.use(bodyParser.json());

//Conectando-se ao BD:
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso");
    }).catch((error)=>{
        console.log(error);
    });

//Utilizando rotas de outro arquivo:
app.use("/", categoriesController);
app.use("/", articlesController);

//Rota:
app.get("/", (req, res) => {
    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(articles=>{
        Category.findAll().then(categories=>{
            res.render("index", {articles:articles, categories:categories});
        });
    });
});

//Rota para página de artigo:
app.get("/:slug", (req, res)=>{
    var slug=req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render("article", {article:article, categories:categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/");
    })
})

app.get("/category/:slug",(req, res) =>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model:Article}] //incluindo na busca nas categorias todos artigos que faze parte dela
    }).then(category=>{
        if(category != undefined){
            Category.findAll().then(categories=>{
                res.render("index", {articles: category.articles, categories:categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err=>{
        res.redirect("/");
    })
})


//Servidor:
app.listen(8080, ()=>{
    console.log("Servidor está rodando!");
});