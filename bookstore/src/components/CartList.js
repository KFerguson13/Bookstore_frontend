import { useContext } from 'react';
import CartContext from '../store/cartContext';
import CartItem from './CartItem';
import { Row } from 'react-bootstrap';

/** This component is just used for listing the cart items. */
const CartList = () => {
    const cart_context = useContext(CartContext);
    
    return (
        <Row className = "row-cols-auto m-3">
            {cart_context.booksInCart.map((book) => 
                <CartItem
                    key = {book.id}
                    title = {book.title} 
                    image = {book.image} 
                    id = {book.id} 
                    price = {book.price}
                    author = {book.author}
                    quantity = {book.quantity}/>)}
        </Row>
        
        );
}

export default CartList;