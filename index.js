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
    const uri = "mongodb://mongo_desafio-3:27017";
    const client = new MongoClient(uri,
        { useUnifiedTopology: true },
        (err, connection) => {
            if(err) return console.log(err)
            global.connection = connection.db('desafio-3')
        });
    let results = {};
    try {
        await client.connect();
        results = client.db('desafio-3').collection("alunos").find();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log(results)
    }
    return results;
}
var dbResults = 0;
app.use('/alunos', (req, res, next) => {
    dbResults = DBConnection();
    next();
});

app.get('/alunos', function(req,res){
    console.log(dbResults);
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