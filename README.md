# cavea-stack
To start the back-end server, you need to write: npm run dev.

In my server, I've made a Sequelize connection to PostgreSQL, which is working nicely and smoothly. Firstly, I defined a user model to create columns in my data. Then, I wrote a function to test if my database is working correctly or not. I made an array for pushing data and then inserted the data with bulkCreate, using my array as a parameter. Following that, I synced my model with the database. Then, I made a GET method to find a user ID. I wanted to add edit functionality, but then I remembered that I don't need it. Lastly, I made a delete function and added a sorting method to sort data by name and price.

In my front-end app, I made routes to get started and two components for different things. Firstly, I made a Listing component to create simple tables to store data in it. Then, I made a Createlist component to add a new list to the table. I'm still working on that. I have comments about my functions so that anyone reading this can understand them easily. In the front-end, I added pagination to go to as many pages as you want if you have lots of data. I implemented a loading method to lazy-load if you have big data and modified some fetch functions to async functions to work properly.

