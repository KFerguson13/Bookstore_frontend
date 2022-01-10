import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './header.css';
import { Button, FormControl, Form, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** This component is used for easily navigating through the application and includes a search bar for searching up specific titles. */
const Header = () => {
    const [title, setBookTitle] = useState('')
    let navigate = useNavigate();


    const changeHandler = (event) => {
        setBookTitle(event.target.value)
    }


    /** This is the function used for whenever something is searched in the search bar. Once the title is entered, the title is
        sent over to the search component which checks whether or not that book exists in the backend. UseNavigate is used to accomplish
        nagivating to that component's respective page with the title information.
     */
    const searchHandler = (event) => {
        event.preventDefault()

        let bookToFind = title;
    
        
        navigate("/Search", { state: {bookToFind: bookToFind}})
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
                            className = "d-none d-md-block">
                                Search
                        </Button>
                    </Form>    
            </Navbar>
        
    )
}

export default Header;