const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const port = 8000;


app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( {
    exptended: true
} ) );

require( './server/routes/exam.routes' )( app );
require( './server/config/mongoose.config' );

app.listen( port, () => {
    console.log( "Listening at Port 8000" );
} );
