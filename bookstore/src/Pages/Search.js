import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.css';
import { Row, Modal, Spinner, Button } from 'react-bootstrap';
import Book from '../components/book';

function Search() {
    /** useLocation is necessary receive info from the search bar in the header. */
    const location = useLocation();

    const [searched, setSearched] = useState(true);
    const [error, setError] = useState(false);
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showBookAdded, setShowBookAdded] = useState(false);

    /** A notification pops up to show when a book has been added. */
    const sendNotification = () => {
        setShowBookAdded(true);
    };

    /** The notification is closed.  */
    const dismissNotification = () => {
        setShowBookAdded(false)
    };

        /** useEffect is used to specify that the page should only be reloaded when the information received from the header has changed. */
        useEffect(() => {
            setShowBookAdded(false);
            
            /** The book title entered into the header is sent to the backend and either an error, if no book is found, or a book is returned. 
                Alternatively, nothing was entered at all in which case the setSearched function is set to false and the user gets feedback
                that they didn't give any input.
             */
            const getResult = async () => {
                setSearched(true);
                setError(false);
            
                /** This is for checking if any input was given.  */
                if (location.state == null || location.state.bookToFind === '') {
                    setSearched(false)
                    setIsLoading(false)
                    return;
                }

                /** An attempt is made to get a result from the backend. If no book is found, an error is caught and the user is told no
                    book was found in the backend database.
                 */
                try {
                    setIsLoading(true);
                    const response = await fetch('/searchResult', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify({'title': location.state.bookToFind})
                        })
            
                    setIsLoading(false);

                    if (response.ok) {
                        const returnedResult = await response.json();
                        setResult(returnedResult);
                        }

                    if (!response.ok) {
                        throw new Error("Content was not found.")
                        }

                    } catch (error) {
                        setError(true);
                    }
            }

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
                    {error && 
                        <div className = "text-center mt-2">
                            <p> Nothing was found. </p>
                        </div>}
                    {!error && <div>
                        <Modal show = {showBookAdded} onHide = {dismissNotification}>
                            <Modal.Header closeButton>
                                <Modal.Title> Book Added </Modal.Title>
                            </Modal.Header>
                            <Modal.Body> Your order was successfully added to the cart. </Modal.Body>
                            <Modal.Footer>
                                <Button variant = "success" onClick = {dismissNotification}> Okay </Button>
                            </Modal.Footer>
                        </Modal>
                        
                        <Row className = "m-3">
                            <Book 
                                title = {result.title} 
                                image = {result.image} 
                                id = {result.book_id} 
                                price = {result.price} 
                                sendNotification = {sendNotification}/>
                        </Row>
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