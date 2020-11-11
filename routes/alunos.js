const express = require("express")
const router = express.Router();

const {MongoClient} = require('mongodb');

router.get('/alunos', async function(req,res){
    alunos = await DBConnection();
    res.send(`${alunos}`)
});

async function DBConnection(){
    const uri = "mongodb+srv://nephiladb:desafio3DB@mongo_desafio-3:27017/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        return alunos = client.db("desafio-3").collection("alunos").find();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = router;