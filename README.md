# cavea-stack
#To start back end server:

you need to write:npm run dev

in my server i've made sequlize connection to postgress which is working nicly and smoothly.

first i defined a user modal to make columns in my data,then i write function to test my database if its working corectly or not,i made array for pushing data and then,insert data with bulkcreate and then give my array as a parameter.following that i sync my model with database.then i made get method to find user id.i wanted to add edit functionality but then i remembered i dont need :),lastly i've made delate function.so i added sorting method to sort data by name,price.


#frontend


in my frontend app i've made firstly routes to get started then,2 components to use for different things.so i made Listing component to make simple tables to store data in it and then i made Createlist to add new klist to the table i'm still working on that.i have comments about my functions so whose reading this will understand easy.
in fronted i added pagination to go many pages as you want if you have lots of data,implimented loading method to lazy load if you have big data,modified some fentch to async functions to work properly.

