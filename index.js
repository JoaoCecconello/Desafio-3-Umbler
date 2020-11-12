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
    const url = "mongodb://mongo_desafio-3:27017";
    let results = {};
    try {
        const client = new MongoClient(url);
        client.connect();
        results = client.db('desafio-3').collection('alunos').find({});
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
    return results;
}
var dbResults = 0;
app.use('/alunos', (req, res, next) => {
    dbResults = DBConnection();
    next();
});

app.get('/alunos', function(req,res){
    res.json(dbResults)
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