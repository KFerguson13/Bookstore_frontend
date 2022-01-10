import { useContext, useState } from 'react';
import { Card, Form, Button, Col, Modal } from 'react-bootstrap';
import CartContext from '../store/cartContext';


const Book = props => {
    const cart_context = useContext(CartContext);
    const [quantity, setQuantity] = useState(0);
    const [validInput, setValidInput] = useState(true);

    /**  Whenever a book is added, a notification pops up. This function hides it. */
    const dismissNotification = () => {
        setValidInput(true);
    }

    /** This function is for adding a book to the cart. The quantity of books ordered is not allowed to go below 1. The form doens't
     * allow that input and, additionally, there is a state, validInput, for detecting invalid inputs. After the book/books are
     * ordered, quantity is automatically set back to 1.
    */
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

        props.sendNotification();
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