const mongoose = require('mongoose');

const Alunos = new mongoose.Schema({
    "Nome": {
        type: String,
        required: true
    },
    "Idade": {
        type: String,
        required: true
    }
},
{timestamps: true,});

module.exports = mongoose.model('alunos', Alunos);