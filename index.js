const express = require("express")
const app = express();

const alunosRoute = require('./routes/alunos')
const horaRoute = require('./routes/hora')

app.use((req, res, next) => {
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
        res.redirect(`https://${req.headers.host}${req.url}`);
    else
        next();
});

app.get('/' , function(req,res){ res.send('Hello World') })

app.get('/alunos', alunosRoute);

app.get('/hora' , horaRoute);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('%s', port);
});