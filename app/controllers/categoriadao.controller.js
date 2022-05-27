const db = require("../models");
const Categoria = db.Categoria;
const Op = db.Sequelize.Op;

exports.create = ( req, res ) => {

    const categoria = {
        nombre_categoria: req.body.nombre_categoria,
    };

    Categoria.create ( categoria )
        .then ( data => {
            res.send( data );
    })
        .catch ( err => {
            res.status ( 500 ).send({
                message:
                err.message || "Error al crear categoria"
        });
    });
};

exports.findOne = ( req, res ) => {
   const id = req.params.id;
   Categoria.findByPk ( id )
    .then( data => {
        res.send ( data );
    })
    .catch ( err => {
        res.status ( 500 ).send ({
            message: "Error al obtener categoria con id=" + id
        });
    });
}

exports.findAll =  ( req, res ) => {
   const nombre_categoria = req.query.nombre;
   var condition = nombre_categoria ? { nombre_categoria: { [Op.iLike]: `%${nombre_categoria }`} }: null; 

   Categoria.findAll ( { where: condition } )
    .then ( data => {
        res.send( data );
    })
    .catch ( err => {
        res.status (500).send({
            message:
            err.message || "No se pudo obtener las categorias"
        });
    });
};

async function GetCategoria () {
    const dato = await Categoria.findAll( { attributes: ['nombre_categoria']});

    console.log ( 'Sevidor : ', JSON.stringify( dato, null, 2 ) );
    return dato;
}

exports.actualizar = ( req, res ) => {
    Categoria.update ({
        nombre_categoria: req.body.nombre,
    },
    {
        where: {
            id_Categoria: req.body.id_categoria,
        }
    }).then ( (result) => res.json( result ));
}

exports.eliminar = ( req, res ) => {
    Categoria.destroy ({
        where: {
            id_Categoria: req.body.id_categoria,
        }
    }).then ( ( result ) => ( req, res ));
}

module.exports.GetCategoria = GetCategoria;