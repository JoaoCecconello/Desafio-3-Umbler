const express = require("express")
const app = express();

app.use((req, res, next) => {
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
        res.redirect(`https://${req.headers.host}${req.url}`);
    else
        next();
});

app.get('/' , function(req,res){ res.send('Hello World') })

app.get('/hora' , function(req,res){ res.send('Hora') })

app.get('/alunos' , function(req,res){ res.send('Alunos') })

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('%s', port);
});