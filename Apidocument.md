// Page 1 //

List of city
> http://localhost:8700/location
> https://zomatonodejs.herokuapp.com/location
List of restaurants 
> http://localhost:8700/restaurants
>https://zomatonodejs.herokuapp.com/restaurants
restaurants wrt to city 
> http://localhost:8700/restaurants?state_id=3
> https://zomatonodejs.herokuapp.com/restaurants?state_id=3
mealType data/quick search data  
> http://localhost:8700/mealtype
> https://zomatonodejs.herokuapp.com/mealtype

// Page 2 //

restaurants wrt to quickSearch /mealType
> http://localhost:8700/restaurants?meal_id=5
> >https://zomatonodejs.herokuapp.com/restaurants?meal_id=5

// filter //
> cuisine filter
  data respect to cuisine and quickSearch 
  > http://localhost:8700/filter/3?cuisine=4
  > https://zomatonodejs.herokuapp.com/filter/3?cuisine=4
  
> // cost filter //
  > http://localhost:8700/filter/1?lcost=200&hcost=500
  > https://zomatonodejs.herokuapp.com/filter/1?lcost=200&hcost=500
  
 // data respect to cuisine and cost //
> cuisine filter + cost filter 
  > http://localhost:8700/filter/1?lcost=200&hcost=500&cuisineId=1
  >https://zomatonodejs.herokuapp.com/filter/1?lcost=200&hcost=500&cuisineId=1
> // sort //
    sort low to high in same quickSearch
    > http://localhost:8700/filter/1?cuisineId=1&sort=1
    > https://zomatonodejs.herokuapp.com/filter/1?cuisineId=1&sort=1

    sort high to low in same quickSearch
    > http://localhost:8700/filter/1?cuisineId=1&sort=-1
    > https://zomatonodejs.herokuapp.com/filter/1?cuisineId=1&sort=-1

// Page 3 //

> restaurants details
> http://localhost:8700/details/3
> https://zomatonodejs.herokuapp.com/details/3

> Menu of that restaurants
> http://localhost:8700/menu/4
> https://zomatonodejs.herokuapp.com/menu/3

//pagination

// page 4 //

  > menu items on user selection
  > localhost:8700/menuItem
  > https://zomatonodejs.herokuapp.com/menuItem
  > 
  >body[4,5,7]

  >api to place order
  >localhost:8700/placeOrder
  >https://zomatonodejs.herokuapp.com/placeOrder


// page 5 //
> list all order
  > http://localhost:8700/orders/2
  > https://zomatonodejs.herokuapp.com/orders
  
  > http://localhost:8700/orders?email="priya@gmail.com"
  > https://zomatonodejs.herokuapp.com/orders?email="priya@gmail.com

Delete order 
> localhost:8700/deleteOrder
>  https://zomatonodejs.herokuapp.com/deleteOrder
 

 update order
 > localhost:8700/updateOrder/6206bf300b02502ea5bfde52?status=Success
