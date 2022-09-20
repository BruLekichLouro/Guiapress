const express = require("express");
const router = express.Router();

router.get("/articles", (req, res)=>{
    res.send("Rotas de artigos");
});

module.exports = router;