## Authentication REST APIs
* GET (users list)	  **/api**
* POST (sign-in)	      **/api/signin**
* POST (sign-up)	      **/api/register-user**
* GET (user profile)	  **/api/user-profile/id**
* PUT (update user)	  **/api/update-user/id**
* DELETE (delete user)  **/api/delete-user/id**
* GET (products list)  **/api/products
* GET (get products according to user) **/api/products/:userId
* POST (Add a new product)  **/api/products/add
* PUT (Update product) **/api/update-product/:productId
* DELETE (Delete a product) **/api/delete-product/:productId

## Required
node V12+
npm V6+
mongodb (We're using mongodb database)
Angular cli V12+

## How to run node app
- Run `npm install` to install required packages
- Open terminal run `nodemon`
- Open other terminal run `mongod`

## How to run angular app
- Run `npm install` to install required packages
- open terminal and run ng serve

Open API URL on [http://localhost:4000/api](http://localhost:4000/api)
