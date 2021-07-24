import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import '../App.css';
export default props => {
    const { id } = props;
    const [ name, setName ] = useState( "" );
    const [ type, setType ] = useState( "" );
    const [ description, setDescription ] = useState( "" );
    const [ skills, setSkills ] = useState( [] );
    const [ skillOne, setSkillOne ] = useState( "" );
    const [ skillTwo, setSkillTwo ] = useState( "" );
    const [ skillThree, setSkillThree ] = useState( "" );
    const [ errors, setErrors ] = useState( [] );
    
    useEffect( () => {
        axios.get( 'http://localhost:8000/api/pet/' + id )
            .then( res => {
                setName( res.data.name );
                setType( res.data.type );
                setDescription( res.data.description );
                setSkills( res.data.skills );
                
                if ( res.data.skills.length >= 1 ) {
                    setSkillOne( res.data.skills[ 0 ] );
                }
                if ( res.data.skills.length >= 2 ) {
                    setSkillTwo( res.data.skills[ 1 ] );
                }
                if ( res.data.skills.length >= 3 ) {
                    setSkillThree( res.data.skills[ 2 ] );
                }
            } );
    }, [] );
    
    const updatePet = e => {
        setSkills( skills.push( skillOne, skillTwo, skillThree ) );
        e.preventDefault();
        axios.put( 'http://localhost:8000/api/pet/' + id, {
            name, type, description, skills
        } )
            .then( res => {
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


    return (
        <div>
            <div className="edit_header">
                <h1>Pet Shelter</h1>
                <Link to={ "/" }>Home</Link>
            </div>
            <div style={{textAlign: 'left', margin: '20px'}} >
                <h3>Edit { name }</h3>
            </div>
            <div className="edit_form_container">
            <form className="edit_form"  onSubmit={ updatePet }>
                {
                    errors.map( ( err, i ) => <p style={{color:'red'}} className="error" key={ i }>{err}</p>)
                }
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={ name } onChange={ (e) => setName(e.target.value)}/>
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
                </div>
                <div>
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
                    <input type="submit" value="Edit Pet"/>
                </div>
            </form>
            </div>
        </div>
    )
}