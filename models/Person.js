const mongoose = require('mongoose');

const Person = mongoose.model('Person', {

//!campos da tabela
    name: String,
    salary: Number,
    approved: Boolean

}) //?criar tabela 

module.exports = Person;