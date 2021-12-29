import { useContext } from 'react';
import { Button, Col, Card } from 'react-bootstrap';
import CartContext from '../store/cartContext';

const CartItem = (props) => {
    const cart_context = useContext(CartContext);

    const removeFromCartHandler = () => {
        cart_context.removeBook(props.id, props.price, props.quantity);
    }; 

    return (
    <Col>
    <Card style = {{width: "18rem"}}>
        <Card.Img 
            variant = "top" 
            src = {props.image} 
            alt = {props.title} 
            />
        <Card.Title> {props.title} </Card.Title>
        <section> 
            Amount in Cart: {props.quantity} 
        </section>
        <Button variant = "primary" onClick = {removeFromCartHandler}> Remove From Cart </Button>
    </Card>
    </Col>
    
    )
};

export default CartItem;

