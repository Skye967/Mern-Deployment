import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import '../App.css';
import PetList from '../components/PetList';

export default () => {
    const [ pets, setPets ] = useState( [] );
    const [ listLoaded, setListLoaded ] = useState( false );

    useEffect( () => {
        axios.get( 'http://localhost:8000/api/findall' )
            .then( res => {
                setPets( res.data.sort(function(a, b){
                if(a.type < b.type) { return -1; }
                if(a.type > b.type) { return 1; }
                return 0;
                } )  );
                setListLoaded( true );
            } );
    }, [] );


    const removeFromDom = petId => {
        setPets( pets.filter( pet => pet._id != petId ) );
    };



    

    return (
        <div>
            <h1>Pet Shelter</h1>
            <Link to={"pet/add"}>Add a Pet to the shelter</Link>
            { listLoaded && <PetList pets={ pets } removeFromDom={ removeFromDom } /> }
        </div>
    )
}