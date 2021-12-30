import { useContext, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import CartItem from '../components/CartItem';
import CartContext from '../store/cartContext';
import CheckoutForm from '../components/checkoutForm';
import './Cart.css';

const Cart = () => {
    const cart_context = useContext(CartContext);
    const [showForm, setShowForm] = useState(false);

    const cartEmpty = cart_context.booksInCart.length === 0;

    const showCheckOutForm = () => {
        setShowForm(true);
    };

    const closeCheckOutForm = () => {
        setShowForm(false);
    };

    const sendOrder = (firstName, lastName, customerState, customerCity, address) => {

        for (const book of cart_context.booksInCart) {
            fetch('/sendOrder', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    'title': book.title,
                    'firstName': firstName,
                    'lastName': lastName,
                    'state': customerState,
                    'city': customerCity,
                    'address': address,
                    'quantity': book.quantity
            })
        })
    }
        cart_context.checkout();
    }


    return (
        <div className = "mt-2 text-center">
            <section className = "bg-dark">
                <h1 className = "cart" style = {{color: "white"}}> YOUR CART </h1>
            </section>
            {showForm && <CheckoutForm 
                    show = {showCheckOutForm}
                    close = {closeCheckOutForm} 
                    confirm = {sendOrder}/>}
            
            {cartEmpty && <p className = "empty-cart"> You have no items in your cart. </p>}
            <Row className = "row-cols-auto">
                {cart_context.booksInCart.map((book) => 
                <CartItem title = {book.title} image = {book.image} id = {book.id} price = {book.price} quantity = {book.quantity}/>)}
            </Row>
            {!cartEmpty && <h1 className = "mt-4"> Total Price ${cart_context.totalPrice} </h1>}
            <Button className = "m-2 btn-lg" 
                    variant = "primary" 
                    onClick = {showCheckOutForm}
                    disabled = {cart_context.booksInCart.length === 0}>Checkout</Button>
        </div>
    );
};

export default Cart;