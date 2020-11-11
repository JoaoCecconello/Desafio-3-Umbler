const express = require("express")
const router = express.Router();

const {MongoClient} = require('mongodb');

router.get('/alunos', async function(req,res){
    const uri = "mongodb+srv://mongo_desafio-3:27017/?w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const alunos = await client.db("desafio-3").collection("alunos").find({});
    } catch (e) {
        console.error(e);
    } finally {
        res.send(alunos);
        await client.close();
    }
});

module.exports = router;