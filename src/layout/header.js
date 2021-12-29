import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './header.css';
import { Button, FormControl, Form, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Header (props) {
    const [title, setBookTitle] = useState('')
    let navigate = useNavigate();


    function changeHandler(event) {
        setBookTitle(event.target.value)
    }


    function searchHandler(event) {
        event.preventDefault()

        let bookToFind = title;
    
        
        navigate("/Search", { state: {test: bookToFind}})
            setBookTitle('')
        }

    return (
            <Navbar bg="dark" expand="lg">
                <h1 className ="brand">Book Store </h1>
                    <Link to = "/Home" className = "nav-link"> Home </Link>
                    <Link to ="/AllBooks" className = "nav-link">Products</Link>
                    <Link to ="/Cart" className = "nav-link">Cart </Link>
                    <Form className="d-flex ms-auto me-4">
                        <FormControl
                            type="text"
                            placeholder="Enter title"
                            className="me-2 d-none d-md-block"
                            value = {title}
                            onChange = {changeHandler}
                        />
                        <Button 
                            variant="outline-primary" 
                            onClick = {searchHandler}
                            className = "d-none d-md-block">Search
                        </Button>
                    </Form>    
            </Navbar>
        
    )
}