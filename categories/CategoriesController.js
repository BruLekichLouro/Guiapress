const express = require("express");
const router = express.Router();

//Criando rota:
router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new")
});

module.exports = router;