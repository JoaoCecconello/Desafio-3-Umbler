const express = require("express")
const app = express();

app.use((req, res, next) => {
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
        res.redirect(`https://${req.headers.host}${req.url}`);
    else
        next();
});

var serverTime;
app.use(function (req, res, next) {
    let date = new Date;
    serverTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    next();
});

app.get('/' , function(req,res){ res.send('Hello World') })

app.get('/hora' , function(req,res){
    res.send(serverTime)
})

app.get('/alunos' , function(req,res){ res.send('Alunos') })

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('%s', port);
});