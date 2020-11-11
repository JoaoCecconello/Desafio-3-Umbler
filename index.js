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
    const uri = "mongodb+srv://mongo_desafio-3:27017/?w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        results = client.db("desafio-3").collection("alunos").find({});
        return results;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
var dbResults = 0;
app.use('/alunos', (req, res, next) => {
    //dbResults = DBConnection();
    next();
});

app.get('/alunos', function(req,res){
    res.send(dbResults)
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