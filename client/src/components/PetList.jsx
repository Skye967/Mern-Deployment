import React from 'react';
import '../App.css';
import { Link } from '@reach/router';
import axios from 'axios';
import { useState } from 'react';

export default props => {
    const { removeFromDom } = props;


    const deletePet = ( petId ) => {
        axios.delete( 'http://localhost:8000/api/pet/' + petId )
            .then( res => {
                removeFromDom( petId );
            } );
    };
    

    return (
        <div className="table_container">
            <table>
                <tr>
                    <th>Pet Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                {
                    props.pets.map( ( pet, i ) => {
                        return (
                            <tr>
                                <td>{ pet.name }</td>
                                <td>{ pet.type }</td>
                                <td>
                                    <button><Link to={ "/pet/" + pet._id + "/edit" }>Edit</Link></button>
                                    <button>
                                        <Link to={ '/' + pet._id }>Details</Link>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                } 

            </table>

        </div>
    )
}