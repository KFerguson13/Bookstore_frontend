import React, {useEffect, useState} from 'react';
import { Row, Alert} from 'react-bootstrap';
import './bookList.css';
import Book from './book';

function BookList() {
    const [books, setBooks] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetch('/books', {
        'methods': 'GET',
        headers : {'Content-Type': 'applications.json'}
        }
    ).then(response => response.json())
    .then(response => setBooks(response))
    .catch(error => console.log("Error"))
    },[])

    const sendAlert = () => {
        setShowAlert(true);
    };

    const dismissAlert = () => {
        setShowAlert(false)
    };

    return (
        <div className = "text-center">
            <section className = "mt-2 bg-dark">
                <h1 className = "products" style = {{color: "white"}}> PRODUCTS </h1>
            </section>
        {showAlert && 
            <Alert variant="success" onClose={dismissAlert} dismissible>
                <p> Item Succesfully added to cart </p>
            </Alert>
        }
        
        <Row className = "row-cols-auto m-3">
            {books.map(book => <Book 
                        title = {book.title} 
                        image = {book.image}
                        id = {book.book_id}
                        price = {book.price}
                        sendAlert = {sendAlert}/>)}
        </Row>
        </div>
        /** 
        <div>
        <CardGroup className = "mt-2">
            {books.map(book => <Book title = {book.title} image = {book.image} id = {book.book_id}/>)}
        </CardGroup>
        </div>
        */

    )

        /** 
        <CardGroup className = "mt-2">
            {books.map(book =>
            <Card>
                <CardHeader> {book.title} </CardHeader>
                <Card.Img variant = "top" src = {book.image} alt = {book.title} className="w-75"/>
            </Card>)}
        </CardGroup>
    )
      
    */
}

export default BookList