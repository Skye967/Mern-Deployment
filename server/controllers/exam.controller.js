const {Pet} = require( '../models/exam.model' );

module.exports.index = ( req, res ) => {
    res.json( {
        message: "Hello World"
    } );
};

module.exports.create = ( req, res ) => {
    const {
        name,
        type,
        description,
        skills
    } = req.body;
    Pet.create( {
            name,
            type,
            description,
            skills
        } )
        .then( player => res.json( player ) )
        .catch( err => res.status( 400 ).json( err ) );
};

module.exports.findAll = ( req, res ) => {
    Pet.find( {} )
        .then( pets => res.json( pets ) )
        .catch( err => res.json( err ) );
};

module.exports.getOne = ( req, res ) => {
    Pet.findOne( {
            _id: req.params.id
        } )
        .then( pet => res.json( pet ) )
        .catch( err => res.json( err ) );
};

module.exports.update = ( req, res ) => {
    Pet.findOneAndUpdate( {_id: req.params.id}, req.body, {new: true, runValidators: true} )
        .then( updatedPet => res.json( updatedPet ) )
        .catch( err => res.status( 400 ).json( err ) );
};

module.exports.delete = ( req, res ) => {
    console.log( 'works' );
    Pet.deleteOne( {
            _id: req.params.id
        } )
        .then( deleteConfirmation => res.json( deleteConfirmation ) )
        .catch( err => res.json( err ) );
};