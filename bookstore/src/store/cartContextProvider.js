import { useReducer } from 'react';
import CartContext from './cartContext';


//This is the initial state of the cart
const defaultCartState = {
    booksInCart: [],
    totalPrice: 0
};


const cartReducer = (state, action) => {

    /** For this action, a book is added to the cart. If it's already in the cart, the quantity listed for that book increases. 
        Total Price also increases. 
     */
    if (action.type === 'ADD') {
        const indexOfBook = state.booksInCart.findIndex((book) => book.id === action.book.id)

        let updatedBooksInCart;
        let updatedPrice;

        if (indexOfBook !== -1) {
            const bookToAdd = {
                ...state.booksInCart[indexOfBook],
                quantity: parseInt(state.booksInCart[indexOfBook].quantity) + parseInt(action.book.quantity)
            };
            updatedBooksInCart = [...state.booksInCart];
            updatedBooksInCart[indexOfBook] = bookToAdd;
            
            updatedPrice = state.totalPrice + (parseFloat(action.book.price) * action.book.quantity)
        }
        else {
            updatedBooksInCart = state.booksInCart.concat(action.book);
            updatedPrice = state.totalPrice + (parseFloat(action.book.price) * action.book.quantity);
        }

        return {
            booksInCart: updatedBooksInCart,
            totalPrice: updatedPrice
        };

        
    }
    
    /** For this action, a book is removed from the cart. Id, price and quantity parameters are accepted. The id is used to find the book
     * in the cart. If more than one copy of this book is in the cart, its quantity goes down by one. Total price decreases. 
     */
    if (action.type === 'REMOVE') {

        let updatedCart;
        let updatedPrice;
        
        
        if (action.quantity > 1) {
            const indexOfBook = state.booksInCart.findIndex((book) => book.id === action.id);

            const updatedBook = {
                ...state.booksInCart[indexOfBook],
                quantity: state.booksInCart[indexOfBook].quantity - 1
            };

            updatedCart = [...state.booksInCart];
            updatedCart[indexOfBook] = updatedBook;
            updatedPrice = state.totalPrice - parseFloat(action.price);
        }

        else {
            updatedCart = state.booksInCart.filter(book => book.id !== action.id);
            updatedPrice = state.totalPrice - parseFloat(action.price);
        }
        return {
            booksInCart: updatedCart,
            totalPrice: updatedPrice
        };
    }

    /** For the checkout action, the cart is emptied. The cart component handles sending the orders. */
    if (action.type === 'CHECKOUT') {
        const emptiedCart = [];

        return {
            booksInCart: emptiedCart,
            totalPrice: 0
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const[cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addToCartHandler = (book) => {
        dispatchCartAction({type: 'ADD', book: book})
    };

    const removeFromCartHandler = (id, price, quantity) => {
        dispatchCartAction({type: 'REMOVE', id: id, price: price, quantity: quantity})
    };

    const checkoutHandler = () => {
        dispatchCartAction({type: 'CHECKOUT'})
    };

    const cartContext = {
        booksInCart: cartState.booksInCart,
        totalPrice: cartState.totalPrice,
        addBook: addToCartHandler,
        removeBook: removeFromCartHandler,
        checkout: checkoutHandler
    };

    return (
        <CartContext.Provider value= {cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};


export default CartProvider;