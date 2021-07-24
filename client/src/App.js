import './App.css';
import React from 'react';
import { Router } from '@reach/router';
import { useState, useEffect } from 'react';
import Main from './views/Main';
import AddPet from './components/AddPet';
import EditPet from './components/EditPet';
import PetDetails from './views/PetDetails';
import axios from 'axios';

function App () {
        const [ pet, setPet ] = useState( [] );
        const [ loaded, setLoaded ] = useState( false );

        useEffect( () => {
          axios.get( 'http://localhost:8000/api/findall' )
            .then( res => {
              setPet( res.data );
              setLoaded( true );
            } );
        }, [] );

        const removeFromDom = petId => {
          setPet( pet.filter( p => p._id != petId ) );
        };
  
  
  return (
    <div className="App">
      <Router>
        <Main path="/" />
        <AddPet path="pet/add" />
        <EditPet path="pet/:id/edit" />
        <PetDetails path="/:id" removeFromDom={removeFromDom}/>
      </Router>
    </div>
  );
}

export default App;
