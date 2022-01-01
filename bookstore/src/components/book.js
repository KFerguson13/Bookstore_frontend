import { useContext, useState } from 'react';
import { Card, Form, Button, Col, Modal } from 'react-bootstrap';
import './book.css'
import CartContext from '../store/cartContext';


const Book = props => {
    const cart_context = useContext(CartContext);
    const [quantity, setQuantity] = useState(0);
    const [validInput, setValidInput] = useState(true);

    const dismissNotification = () => {
        setValidInput(true);
    }

    const addToCartHandler = () => {

        if (quantity < 0) {
            setValidInput(false);
            return;
        }

        setValidInput(true);

        cart_context.addBook({
            id: props.id,
            title: props.title,
            image: props.image,
            price: props.price,
            author: props.author,
            quantity: quantity > 0 ? quantity : 1,
        });

        setQuantity(0);

        props.sendAlert();
    };

    const changeQuantityHandler = (event) => {
        setQuantity(event.target.value);

    }


    return (
        <div>
            <Modal show = {!validInput} onHide = {dismissNotification}>
                <Modal.Header closeButton style = {{color: "red"}}>
                    Invalid Input
                </Modal.Header>
                <Modal.Body>
                    You can't order a negative number of books!
                </Modal.Body>
            </Modal>
        <Col>
            <Card className = "text-center m-1" style = {{ width: '18rem'}}>
                <Card.Img 
                    variant = "top" 
                    src = {props.image} 
                    alt = {props.title} 
                    style = {{width: '100%', height: '25vw'}}/>
                <Card.Title> {props.title} </Card.Title>
                <Card.Title> by {props.author} </Card.Title>
                <section>
                    Price: ${props.price}
                </section>
                <section>
                <Form>
                    <Form.Group>
                        <p> Enter Order Amount </p>
                        <Form.Control
                            type = "number"
                            value = {quantity > 0 ? quantity : 1}
                            min = {1}
                            onChange = {changeQuantityHandler}> 
                        </Form.Control>
                    </Form.Group>
                </Form>
                </section>
                <Button variant = "primary" onClick = {addToCartHandler} className = "mb-0"> Add to Cart </Button>
            </Card>
        </Col>
        </div>
    )
};

export default Book;