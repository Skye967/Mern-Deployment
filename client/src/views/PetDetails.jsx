import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

export default props => {
    const [ pet, setPet ] = useState( {} );
    const [ skills, setSkills ] = useState( [] );
    const { removeFromDom } = props;
    useEffect( () => {
        axios.get( 'http://localhost:8000/api/pet/' + props.id )
            .then( res => {
                setPet( res.data );
                setSkills( res.data.skills );
            } );
    }, [] );

    const deletePet = ( petId ) => {
        console.log( petId );
        axios.delete( 'http://localhost:8000/api/pet/' + petId )
            .then( res => {
                removeFromDom( petId );
                navigate("/");
            } )
    }
    console.log( skills );

    return (
        <div>
            <h1>Pet Shelter</h1>
            <Link to={ "/" }>Home</Link>
            <div>
            <h3>Details About { pet.name }</h3>
                <button onClick={ ( e ) => { deletePet( pet._id ); } }>Adopt</button>
            </div>
            <h4>Type: { pet.type }</h4>
            <h4>Description: { pet.description }</h4>
            <div>
                <h4>Skills: </h4>
                {
                    skills.map( ( i, x ) => {
                        return (
                            <p>{i}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}