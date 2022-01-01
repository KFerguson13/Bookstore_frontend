import { useReducer } from 'react';
import CartContext from './cartContext';


const defaultCartState = {
    booksInCart: [],
    totalPrice: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const indexOfBook = state.booksInCart.findIndex((book) => book.id === action.book.id)
        console.log(indexOfBook);

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