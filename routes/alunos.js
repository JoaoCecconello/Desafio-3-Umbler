const express = require("express")
const router = express.Router();

const mongoose = require('mongoose');
const Alunos = require('../model');

mongoose.connect('mongodb:mongo_desafio-3:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Successful connection");
}).catch((err) => {
    console.log("Error: "+err);
});


router.get('/', async function(req,res){
    try {
        await Alunos.find({}).then((alunos) => {
            return res.json(alunos)
        })
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;