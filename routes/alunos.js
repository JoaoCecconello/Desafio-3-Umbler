const express = require("express")
const router = express.Router();

router.get('/alunos', function(req,res){
    res.send('alunos')
});

module.exports = router;