import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.css';
import { Card } from 'react-bootstrap';

function Search() {
    const location = useLocation();

    const [searched, setSearched] = useState(true);
    const [error, setError] = useState(false)
    const [result, setResult] = useState([])

        useEffect(() => {
            const getResult = async () => {
            setSearched(true);
            setError(false);
            if (location.state == null || location.state.test === '') {
                setSearched(false)
            }

            try {
            const response = await fetch('/searchResult', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({'title': location.state.test})
            })
            
            if (response.ok) {
                const returnedResult = await response.json();
                setResult(returnedResult);
            }

            if (!response.ok) {
                throw new Error("Content was not found.")
            }} catch (error) {
                setError(true);
            }
        }

        console.log(error)
        getResult()
            
        },[location.state])


    if (searched) {
        return (
                <div>
                    <section className = "text-center m-2 bg-dark">
                        <h1 className = "result"> SEARCH RESULT </h1>
                    </section>
                    <section>
                    {error && <p> Nothing was found. </p>}
                    {!error && <div className = "d-flex justify-content-center">
                        <Card className = "mt-2 text-center" style = {{width: '20%'}}>
                            <Card.Img
                                variant = "top"
                                src = {result.image} 
                                style = {{width: '100%', height: '20vw'}}/>
                            <Card.Title> {result.title} by {result.author_name}</Card.Title>
                        </Card>
                        </div>}
                    </section>
                </div> 
        )
            }
    else {
        return (
                <div className = "text-center text-light mt-2 bg-dark"> 
                    <h1 className = "result"> NOTHING WAS SEARCHED </h1>
                </div>)
    }

}


export default Search;