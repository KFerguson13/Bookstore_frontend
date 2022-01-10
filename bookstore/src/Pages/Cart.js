import { useContext, useState } from 'react';
import { Button} from 'react-bootstrap';
import CartList from '../components/CartList';
import CartContext from '../store/cartContext';
import CheckoutForm from '../components/checkoutForm';
import './Cart.css';

const Cart = () => {
    const cart_context = useContext(CartContext);
    const [showForm, setShowForm] = useState(false);

    /** This is used to determine whether or not total price should be shown and whether or not to disable the checkout button. If
        you have an empty cart, you can't check anything out. 
     */
    const cartEmpty = cart_context.booksInCart.length === 0;

    /** The checkout form is displayed */
    const showCheckOutForm = () => {
        setShowForm(true);
    };

    /** The checkout form is closed. */
    const closeCheckOutForm = () => {
        setShowForm(false);
    };


    /** The orders are sent to the backend. The cart list is iterated through and for each book, including the quantity of that
        book ordered, a post request is sent to the backend. This function receives the name, state, city, and address from the
        checkout form component. Once this is successfully done, the cart is emptied. 
     */
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
                <h1 className = "cart"> YOUR CART </h1>
            </section>
            
            {showForm && <CheckoutForm 
                    show = {showCheckOutForm}
                    close = {closeCheckOutForm} 
                    confirm = {sendOrder}/>}
            
            {cartEmpty && <p className = "empty-cart"> You have no items in your cart. </p>}

            <CartList />
            
            {!cartEmpty && <h1 className = "mt-4"> Total Price: ${cart_context.totalPrice} </h1>}
            
            <Button className = "m-2 btn-lg" 
                    variant = "primary" 
                    onClick = {showCheckOutForm}
                    disabled = {cartEmpty}> Checkout </Button>
        </div>
    );
};

export default Cart;