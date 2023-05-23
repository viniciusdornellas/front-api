const express = require('express');
const app = express();
const contatoRoutes = express.Router();
const mongoose = require('mongoose');

let Contato = require('../model/contato');

// api to add item
contatoRoutes.route('/add').post(function (req, res) {
  console.log("Chegou aqui!")
  let contato = new Contato(req.body);
  contato.save()
  .then(contato => {
    res.status(200).json({'status': 'success','mssg': 'contato added successfully'});
    console.log('ID do contato', contato._id)
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get itens
contatoRoutes.route('/list').get(function (req, res) {

    Contato.find({})
    .exec()
    .then(contatos => {
      res.status(200).json(contatos);
    })
    .catch(err => {
      console.error('Erro ao listar contatos:', err);
      res.status(500).json({ error: 'Erro ao listar contatos' });
    });
  });

// api to get item
contatoRoutes.route('/contato/:id').get(function (req, res) {
  let id = req.params.id;
  contato.findById(id, function (err, contato){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','contato': contato });
    }
  });
});

// api to update route
contatoRoutes.route('/update/:id').put(function (req, res) {
    User.findById(req.params.id, function(err, contato) {
    if (!contato){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        contato.nome = req.body.nome;
        contato.email = req.body.email;
        contato.mensagem = req.body.mensagem;

        contato.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
contatoRoutes.route('/delete/:id').delete(function (req, res) {
  contato.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = contatoRoutes;