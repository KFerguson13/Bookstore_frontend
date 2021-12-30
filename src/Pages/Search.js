import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.css';
import { Col, Alert, Spinner } from 'react-bootstrap';
import Book from '../components/book';

function Search() {
    const location = useLocation();

    const [searched, setSearched] = useState(true);
    const [error, setError] = useState(false);
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    const sendAlert = () => {
        setShowAlert(true);
    };

    const dismissAlert = () => {
        setShowAlert(false)
    };

        useEffect(() => {
            setResult([]);
            setShowAlert(false);
            const getResult = async () => {
            setSearched(true);
            setError(false);
            if (location.state == null || location.state.test === '') {
                setSearched(false)
            }

            try {
                setIsLoading(true);
                const response = await fetch('/searchResult', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({'title': location.state.test})
            })
            
            setIsLoading(false);

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


    if (isLoading) {
        return (
            <div className = "d-flex justify-content-center mt-5">
                 <Spinner animation="border" variant="primary" />
            </div>
        );
    }
    if (searched) {
        return (
                <div>
                    <section className = "text-center m-2 bg-dark">
                        <h1 className = "result"> SEARCH RESULT </h1>
                    </section>
                    <section>
                    {error && <p> Nothing was found. </p>}
                    {!error && <div>
                        {showAlert && 
                            <Alert variant="success" onClose={dismissAlert} dismissible>
                            <p> Item Succesfully added to cart </p>
                            </Alert>
                        }
                        <Col>
                            <Book title = {result.title} image = {result.image} id = {result.book_id} price = {result.price} sendAlert = {sendAlert}/>
                        </Col>
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