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


var alunos = null;
app.use('/alunos', (req, res, next) => {

    const uri = "mongodb+srv://mongo_desafio-3:27017/?w=majority";
    const client = new MongoClient(uri);
    try {
        client.connect();
        alunos = client.db("desafio-3").collection("alunos").find({});
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }

    next();
});

app.get('/alunos', async function(req,res){
    res.send(alunos)
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