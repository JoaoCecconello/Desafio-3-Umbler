const express = require("express")
const router = express.Router();
const {MongoClient} = require('mongodb')

async function DBConnection(){
    const url = "mongodb://nephiladb:desafio3DB@mongo_desafio-3:27017/?authSource=desafio-3";
    const client = new MongoClient(url, { useUnifiedTopology: true });
    let allResults = '';
    try {
        await client.connect();
        console.log('MongoDB connection opened')
        results = client.db('desafio-3').collection('alunos').find({});
        await results.forEach(element => {
            allResults += "<p>Nome: "+element.Nome+"    Idade: "+element.Idade+"</p>";
        });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('MongoDB connection closed')
    }
    return allResults;
}


router.get('/alunos', async function(req,res){
    res.send(await DBConnection())
});

module.exports = router;