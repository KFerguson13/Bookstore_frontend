# Bookstore_frontend
This code utilizes react, a python backend, and bootstrap 5 to create a frontend for a mock bookstore. 

Project Overview
---------------------------------------------------------------------------------

This project is a mock bookstore that includes a front page, a header with a search bar, a page that lists the products, and a page for the cart. The pages for both the 
search results and the products page is where products can be added to the cart with a click of a button below each item. The user can also specify the quantity of the item
they intend to add to the cart. The default quantity is set to 1 and the user is not allowed to go any lower. An important note about the search bar is that it requires a correctly
spelled title for the user to get a result. From the cart page, the user can remove items one at a time as they please and checkout when ready. The checkout form requires a 
first name, last name, state, city, and address. The order/orders are then sent to the python backend, utilizing flask, and are stored in a bookshop database. That database is
also where the products and their informationa are retrieved from. The cart is automatically emptied.

Some Project Dependencies to Know About 
-----------------------------------------------------------------------------

The backend for this project requires Flask and Flask-SQLAlchemy.


How to Run
------------------------------------------------------------------------------
Before starting, the following commands should be entered for the backend application:

$env:FLASK_APP = "bookstore.py"
$env:FLASK_ENV = "development"

Then simply run the project, switch over to the frontend react application, and run "npm start".
