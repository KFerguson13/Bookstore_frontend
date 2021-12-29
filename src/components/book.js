import { useContext, useState } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import './book.css'
import CartContext from '../store/cartContext';


const Book = props => {
    const cart_context = useContext(CartContext);
    const [quantity, setQuantity] = useState(0);

    const addToCartHandler = () => {
        //const id = Math.random().toString(16).slice(2);

        console.log("Book: ", props.id);

        cart_context.addBook({
            id: props.id,
            title: props.title,
            image: props.image,
            price: props.price,
            quantity: quantity > 0 ? quantity : 1,
        });

        setQuantity(0);

        //<Button variant = "primary" onClick = {addToCartHandler} className = "mb-0"> Add to Cart </Button>

        props.sendAlert();
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(quantity -1);
    };

    const changeQuantityHandler = (event) => {
        setQuantity(event.target.value);
    };

    return (
    
        <Col>
        <Card className = "text-center m-1" style = {{ width: '18rem'}}>
            <Card.Img 
                variant = "top" 
                src = {props.image} 
                alt = {props.title} 
                style = {{width: '100%', height: '25vw'}}/>
            <Card.Title> {props.title} </Card.Title>
            <section>
                Price: ${props.price}
            </section>
            <section className>
            <Form>
                <Form.Group>
                    <p> Enter Order Amount </p>
                    <Form.Control
                        type = "number"
                        value = {quantity}
                        min = {0}
                        onChange = {changeQuantityHandler}> 
                    </Form.Control>
                </Form.Group>
            </Form>
            </section>
            <Button variant = "primary" onClick = {addToCartHandler} className = "mb-0"> Add to Cart </Button>
        </Card>
        </Col>
    
    )
};

export default Book