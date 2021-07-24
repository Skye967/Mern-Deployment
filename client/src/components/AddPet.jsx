import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import '../App.css';
import { set } from 'mongoose';

export default () => {
    const [ pets, setPets ] = useState( [] );
    const [ name, setName ] = useState( "" );
    const [nameError, setNameError] = useState("");
    const [ type, setType ] = useState( "" );
    const [ description, setDescription ] = useState( "" );
    const [ skills, setSkills ] = useState( [] );
    const [ skillOne, setSkillOne ] = useState( "" );
    const [ skillTwo, setSkillTwo ] = useState( "" );
    const [ skillThree, setSkillThree ] = useState( "" );
    const [ errors, setErrors ] = useState( [] );
    
    const submitHandler = ( e ) => {
        setSkills( skills.push( skillOne, skillTwo, skillThree ) );
        if ( nameChecker( name ) === false ) {
            return false;
        }
        e.preventDefault();
        axios.post( 'http://localhost:8000/api/pet', {
            name, type, description, skills
        } )
            .then( ( res ) => {
                console.log( res );
                navigate( "/" );
            } )
            .catch( ( err ) => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for ( const key of Object.keys( errorResponse ) ) {
                    errorArr.push( errorResponse[ key ].message );
                }
                setErrors( errorArr );
            } );
    };

        useEffect( () => {
        axios.get( 'http://localhost:8000/api/findall' )
            .then( res => {
                setPets( res.data);
            } );
    }, [] );

    const nameChecker = ( name ) => {
        setName( name );
        let checker = true;
        // pets.map( ( p, i ) => {
        //     if ( p.name === name ) {
        //         checker = false;
        //         setNameError( "Name already exists" );
        //         console.log( nameError );
        //         return checker;
        //     } 
        // } );
        for ( let i = 0; i < pets.length; i++ ){
            if ( pets[ i ].name == name ) {
                checker = false;
                setNameError( "Name already exists" );
                console.log( nameError );
                break;
            } else {
                setNameError( "" );
                checker = true;
            }
        }
        return checker;
    }

    return (
        <div>
            <h1>Pet Shelter</h1>
            <div>
            <h3>Know a pet needing a home?</h3>
                <Link to={ "/" }>Home</Link>
            </div>
            <div>
            <form onSubmit={ submitHandler }>
                {
                    errors.map( ( err, i ) => <p style={{color:'red'}} className="error" key={ i }>{err}</p>)
                }
                <div>
                    {
                        nameError ?
                        <p style={{color:'red'}}>{ nameError }</p> :
                        <p> &nbsp; </p>
                    }
                        
                    <label>Name: </label>
                    <input type="text" name="name" value={ name } onChange={ (e) => nameChecker(e.target.value)}/>
                </div>
                <div>
                    <label>Type: </label>
                    <input type="text" name="type" value={ type } onChange={ (e) => setType(e.target.value)}/>
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text" name="description" value={ description } onChange={ (e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Skills(optional): </label>
                    <br></br>
                    <label>Skill 1:</label>
                    <input type="text" name="skillOne" value={ skillOne } onChange={ (e) => setSkillOne(e.target.value)}/>
                </div>
                <div>
                    <label>Skill 2:</label>
                    <input type="text" name="skillTwo" value={ skillTwo } onChange={ (e) => setSkillTwo(e.target.value)}/>        
                </div>
                <div>
                    <label>Skill 3:</label>
                    <input type="text" name="skillThree" value={ skillThree } onChange={ (e) => setSkillThree(e.target.value)}/>        
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
            </div>
        </div>
    )
}