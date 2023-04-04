const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


  const usuarioGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, usuarios ] = Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
          .skip(Number(desde))
          .limit(Number(limite))
    ]);

    res.json({
      resp
    });
  }

  const usuarioPost = async(req, res = response) => {
    
    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});


    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
  }
  const usuarioPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario);
  }
  const usuarioPatch = async(req, res = response) => {
    res.json({
        msg: 'patch Api Users controller'
    });
  }
  const usuarioDelete = async(req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json(usuario);
  }



  module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPatch,
    usuarioPut,
    usuarioDelete
  }