import { useContext } from 'react';
import { Button, Col, Card } from 'react-bootstrap';
import CartContext from '../store/cartContext';

/** This component represents the individual cart items that show up as cards on the page. */
const CartItem = (props) => {
    const cart_context = useContext(CartContext);

    /** This function is used for removing books, one at a time, from the cart and the price of that book from the total price. */
    const removeFromCartHandler = () => {
        cart_context.removeBook(props.id, props.price, props.quantity);
    }; 

    return (
    <div>
        <Col>
            <Card style = {{width: "18rem"}}>
                <Card.Img 
                    variant = "top" 
                    src = {props.image} 
                    alt = {props.title}
                    style = {{width: '100%', height: '25vw'}}
                    />
                <Card.Title> {props.title}</Card.Title>
                <Card.Title> by {props.author} </Card.Title>
                <section> 
                    Amount in Cart: {props.quantity} 
                </section>
                <Button variant = "primary" onClick = {removeFromCartHandler}> Remove From Cart </Button>
            </Card>
        </Col>
    </div>
    )
};

export default CartItem;

