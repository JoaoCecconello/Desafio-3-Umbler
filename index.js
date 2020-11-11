const express = require("express")
const app = express();

const alunosRoute = require("./routes/alunos")

app.use((req, res, next) => {
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
        res.redirect(`https://${req.headers.host}${req.url}`);
    else
        next();
});

app.get('/' , function(req,res){ res.send('Hello World') })

app.get('/alunos' , alunosRoute);

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