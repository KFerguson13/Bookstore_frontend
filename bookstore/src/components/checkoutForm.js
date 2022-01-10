import { Modal } from 'react-bootstrap';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';
import './CheckoutForm.css';

const CheckoutForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [customerState, setCustomerState] = useState('');
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    /** This is for detecting what parts of the entered information is and isn't valid. */
    const [formValidity, setFormValidy] = useState(
        {
            fnValid: true,
            lnValid: true,
            cityValid: true,
            stateValid: true,
            addressValid: true
        }
    );

    /** Checking for empty inputs */
    const checkLength = (inputValue) => {
        if (inputValue.trim() === '') {
            return false
        } 
        else {
            return true
        }
    };

    function changeFirstNameHandler(event) {
        setFirstName(event.target.value);
    };

    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    };

    const changeStateHandler = (event) => {
        setCustomerState(event.target.value);
    }

    const changeCityHandler = (event) => {
        setCity(event.target.value);
    }
    const changeAddressHandler = (event) => {
        setAddress(event.target.value);
    };

    /** This function is for when the user is ready to attempt to submit the form. Each input is checked to determine form validity
        before the form can be submitted. If there's something wrong, the user gets feedback such as when they don't enter a first
        name. If everything is okay, a function from the cart component is called to submit the data to the backend.
     */
    const submitHandler = (event) => {
        event.preventDefault();

        const first_name = firstName
        const last_name = lastName
        const customer_state = customerState
        const customer_city = city
        const address_info = address;
        
        setFirstName('');
        setLastName('');
        setCustomerState('');
        setCity('');
        setAddress('');

        const checkFNLength = checkLength(first_name);
        const checkLNLength = checkLength(last_name);
        const checkStateLength = checkLength(customer_state);
        const checkCityLength = checkLength(customer_city);
        const checkAddressLength = checkLength(address_info);

        const checkFormValidity = checkFNLength && checkLNLength && checkStateLength && checkCityLength && checkAddressLength;

        setFormValidy(
           {
               fnValid: checkFNLength,
               lnValid: checkLNLength,
               stateValid: checkStateLength,
               cityValid: checkCityLength,
               addressValid: checkAddressLength
           } 
        )

        if (!checkFormValidity) {
            return;
        }

        props.confirm(first_name, last_name, customer_state, customer_city, address_info);
        setSubmitted(true);
          
    };

    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Submit Orders</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!submitted && 
                <div>
                    
                    <Form>
                        
                        <Form.Group className = "mt-2">
                            {!formValidity.fnValid && <p style = {{color: "red"}}> Please enter first name </p>}
                            <FormControl 
                                type = "text"
                                placeholder = "Enter First Name"
                                value = {firstName}
                                onChange = {changeFirstNameHandler}
                                className = {!formValidity.fnValid ? 'invalidInput' : ''}>
                            </FormControl>
                        </Form.Group>

                        <Form.Group className = "mt-2">
                            {!formValidity.lnValid && <p style = {{color: "red"}}> Please enter last name </p>}
                            <FormControl
                                type = "text"
                                placeholder = "Enter Last Name"
                                value = {lastName}
                                onChange = {changeLastNameHandler}
                                className = {!formValidity.lnValid ? 'invalidInput' : ''}>
                            </FormControl>
                        </Form.Group>

                        <Form.Group className = "mt-2 mb-2">
                            {!formValidity.stateValid && <p style = {{color: "red"}}> Please enter state </p>}
                            <FormControl
                                type = "text"
                                placeholder = "Enter State"
                                value = {customerState}
                                onChange = {changeStateHandler}
                                required
                                className = {!formValidity.stateValid ? 'invalidInput' : ''}>
                            </FormControl>
                        </Form.Group>

                        <Form.Group className = "mt-2 mb-2">
                            {!formValidity.cityValid && <p style = {{color: "red"}}> Please enter city </p>}
                            <FormControl
                                type = "text"
                                placeholder = "Enter City"
                                value = {city}
                                onChange = {changeCityHandler}
                                required
                                className = {!formValidity.cityValid ? 'invalidInput' : ''}>
                            </FormControl>
                        </Form.Group>

                        <Form.Group className = "mt-2 mb-2">
                            {!formValidity.addressValid && <p style = {{color: "red"}}> Please enter address </p>}
                            <FormControl
                                type = "text"
                                placeholder = "Enter Address"
                                value = {address}
                                onChange = {changeAddressHandler}
                                required
                                className = {!formValidity.addressValid ? 'invalidInput' : ''}>
                            </FormControl>
                        </Form.Group>
                    
                    </Form>

                    <Button variant = "primary" onClick = {submitHandler}> Submit </Button>
                </div>}
                
                {submitted && <p> The orders were sent. </p>}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Close
                </Button>
            </Modal.Footer>
            
        </Modal>

    )
}

export default CheckoutForm;