const express = require("express")
const router = express.Router();

var serverTime;
router.use('/hora', function (req, res, next) {
    let date = new Date;
    serverTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    next();
});

router.get('/hora' , function(req,res){res.send(serverTime)});


module.exports = router;