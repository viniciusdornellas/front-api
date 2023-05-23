const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contato = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  mensagem: {
    type: String
  }
},{
    collection: 'contato'
});

module.exports = mongoose.model('Contato', Contato);