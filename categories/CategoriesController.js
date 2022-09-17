const express = require("express");
const router = express.Router();

router.get("/categories", (req, res)=>{
    res.send("Rotas de categoria")
});

module.exports = router;