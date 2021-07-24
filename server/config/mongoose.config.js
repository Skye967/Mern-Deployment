const mongoose = require( 'mongoose' );
mongoose.set( 'runValidators', true );

mongoose.connect( "mongodb://localhost/mernexamdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    } )
    .then( () => console.log( "Established a connnection to the database" ) )
    .catch( ( err ) => console.log( "something went wrong when connecting to the database", err ) );
