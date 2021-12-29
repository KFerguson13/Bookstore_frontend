import React from 'react';
import './App.css';
import BookList from './components/bookList';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Pages/Home.js';
import Search from './Pages/Search.js';
import Cart from './Pages/Cart.js';
import Header from './layout/header';
import Footer from './layout/footer';
import CartProvider from './store/cartContextProvider';
import { Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
      <CartProvider>
      <Container fluid>
      <div className = "content">
      <div className = "content-wrap">
      <Header/>
        <Routes>
          <Route path="/Home" element = { <Home /> }></Route>
          <Route path = "/AllBooks" element = { <BookList /> }> </Route>
          <Route path = "/Search" element = { <Search /> }> </Route>
          <Route path = "/Cart" element = { <Cart /> }> </Route>
          <Route path = "/" element={<Navigate replace to = "/Home" />}> </Route>
        </Routes>
      <Footer/>
      </div>
      </div>
      </Container>
      </CartProvider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
