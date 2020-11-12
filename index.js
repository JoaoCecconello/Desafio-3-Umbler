const express = require("express")
const app = express();

const {MongoClient} = require('mongodb')

app.use((req, res, next) => {
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
        res.redirect(`https://${req.headers.host}${req.url}`);
    else
        next();
});

app.get('/' , function(req,res){ res.send('Hello World') })


async function DBConnection(){
    const url = "mongodb://nephiladb:desafio3DB@mongo_desafio-3:27017/?authSource=desafio-3";
    const client = new MongoClient(url, { useUnifiedTopology: true });
    let allResults = {};
    try {
        await client.connect();
        console.log('MongoDB connection opened')
        results = client.db('desafio-3').collection('alunos').find({});
        allResults = await results.toArray();
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log(allResults)
        console.log('MongoDB connection closed')
    }
    return allResults;
}

app.get('/alunos', async function(req,res){
    res.send(await DBConnection())
});

var serverTime;
app.use('/hora', function (req, res, next) {
    let date = new Date;
    serverTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    next();
});

app.get('/hora' , function(req,res){res.send(serverTime)});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('%s', port);
});