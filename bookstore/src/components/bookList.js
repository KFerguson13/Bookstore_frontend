import React, {useEffect, useState} from 'react';
import { Row, Modal, Spinner, Button} from 'react-bootstrap';
import './bookList.css';
import Book from './book';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [showBookAdded, setShowBookAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    /** UseEffect is being used so the backend isn't bombarded with get requests. This is where the list of books is fetched 
       from the backend. A state for the books is used and that state is set to be the response from the backend.
       */
    useEffect(() => {
        setIsLoading(true);
        fetch('/books', {
        'methods': 'GET',
        headers : {'Content-Type': 'applications.json'}
        }
    ).then(response => response.json())
    .then(response => setBooks(response)).then(setIsLoading(false))
    .catch(error => console.log("Error"))
    },[])


    /** Whenever a book is added to the cart, a notification pops up and this is the function used for making sure it shows. */
    const sendNotification = () => {
        setShowBookAdded(true);
    };

    /** This function is used for hiding the above mentioned notification. */
    const dismissNotification = () => {
        setShowBookAdded(false)
    };

    return (
        <div className = "text-center">
            <section className = "mt-2 bg-dark">
                <h1 className = "products"> PRODUCTS </h1>
            </section>

            {isLoading &&  <Spinner className = "mt-5" animation="border" variant="primary" />}

        
            <Modal show = {showBookAdded} onHide = {dismissNotification}>
                <Modal.Header closeButton>
                    <Modal.Title> Book Added </Modal.Title>
                </Modal.Header>
                <Modal.Body> Your order was successfully added to the cart. </Modal.Body>
                <Modal.Footer>
                    <Button variant = "success" onClick = {dismissNotification}> Okay </Button>
                </Modal.Footer>
            </Modal>
        
        
            <Row className = "row-cols-auto m-3">
                {books.map(book => <Book 
                        key = {book.book_id}
                        title = {book.title} 
                        image = {book.image}
                        id = {book.book_id}
                        price = {book.price}
                        author = {book.author_name}
                        sendNotification = {sendNotification}/>)}
            </Row>
        </div>

    )

}

export default BookList;