var count =0;
var loader = document.querySelector(".loader") // the loader object stores the reference of the div element with class loade
console.log(loader); // for debugging purposes
window.addEventListener("load",vanish); // when the windows loads vanish function is executed
 function vanish() {  // this fn adds the class disappear to the div element 
     loader.classList.add("disappear"); // the disapppear class make the preloader disappear
 }
/* thankyou jquery for existing */
 $(document).on('click','ul li',function(){
     $(this).addClass('iactive').siblings().removeClass('iactive')
 })
 /* above code is used for toggling the active links */
/* for toggling betwwen veiw cart and hide cart */
 function changeCommand() {
     var ele = document.getElementById("changetext");
     if (count==0){
        ele.innerHTML='Hide cart';
        count=1;
     }
     else {
        ele.innerHTML='View cart';
        count=0;
    }
     
 }
 /* toggling cart ends */

 /* Js for cart */
    updateCartTotal();
    var removeCartItemBtn = document.getElementsByClassName("btn-danger");
    for (var i=0 ;i <removeCartItemBtn.length ; i++){
        var button = removeCartItemBtn[i];
        button.addEventListener("click",removeCartItem);
    }
    var quantityInput = document.getElementsByClassName("cart_quantity_input");
    for (i = 0 ; i<quantityInput.length; i++){
        var input = addEventListener("change",quantityChange); 
    }
    var addToCartBtn = document.getElementsByClassName("addProduct");
    console.log(addToCartBtn);
    for (i=0 ; i < addToCartBtn.length;i++){
        var addBtn = addToCartBtn[i];
        addBtn.addEventListener("click",addToCartClicked);
    }

    function removeCartItem(event){
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    }

    function quantityChange(event){
        var input = event.target;
        if (isNaN(input.value) || input.value <=0 ){
            input.value = 1;
        }
        updateCartTotal();
    }
    
    function addToCartClicked(event){
        var button = event.target;
        var product = button.parentElement;
        var title = product.getElementsByClassName("p_title")[0].innerHTML; // Title  (WELL DONE)
        console.log(title);
        var raw_price = product.parentElement;
        var price = raw_price.getElementsByClassName("prices")[0].innerHTML; // price (WELL DONE)
        console.log(price);
        var raw_image = raw_price.previousElementSibling;
        console.log(raw_image);
        var imageSrc = raw_image.getElementsByTagName("img")[0].src; // image source (WELL DONE)
        console.log(imageSrc);
        // all the data that is required to put in cart is retrieved
        addItemtoCart(title,price,imageSrc);
    }
   // update : naa chutiya hi hoon main 
    function addItemtoCart(title,price,imageSrc){
        var cartRow = document.createElement("div");
        var cartItemContainer = document.getElementsByClassName("display_cart")[0];
        console.log(cartItemContainer);
      /*  cartItemContainer.append(cartRow);
        cartRow.classList.add("cart_row")
        var cart_item = document.createElement("div");
        cartRow.append(cart_item);
        cart_item.classList.add("cart_item","cart_column");
        var imgbx = document.createElement("img");
        imgbx.src=imageSrc;
        imgbx.classList.add("cart_item_image");
        cart_item.append(imgbx);
        var cart_item_title = document.createElement("span");
        cart_item_title.innerHTML=title;
        cart_item_title.classList.add("cart_item_title");
        cart_item.append(cart_item_title);
        var cart_amt = document.createElement("span");
        cart_amt.classList.add("cart_amt","cart_column");
        cart_amt.innerHTML= price;
        cartRow.append(cart_amt);
        var secondDiv = document.createElement("div");
        secondDiv.classList.add("cart_quantity","cart_column");
        cartRow.append(secondDiv);
        var input_quantity = document.createElement("input");
        input_quantity.type="number";
        input_quantity.value="1";
        input_quantity.classList.add("cart_quantity_input");
        secondDiv.append(input_quantity);
        var removeBtn = document.createElement("button");
        removeBtn.classList.add("btn","btn-danger");
        removeBtn.innerHTML="Remove";
        secondDiv.append(removeBtn);
        console.log(cartRow); */
      //  ANOTHER WAY AND BEST WAY TO DO ALL THE ABOVE KHICHDI, in short chutiya kat gaya
      var cartRowContents = `
                             <div class="cart_item cart_column">
                                <img src="${imageSrc}" alt="" class="cart_item_image">
                                <span class="cart_item_title">${title}</span>
                            </div>
                            <span class="cart_amt cart_column">${price}</span>
                            <div class="cart_quantity cart_column">
                                    <input type="number" name="" id="" class="cart_quantity_input" value="1" min="0">
                                    <button type="button" class="btn btn-danger">Remove</button>
                            </div>`;
            cartRow.innerHTML=cartRowContents;
            cartRow.classList.add("cart_row");
            cartItemContainer.append(cartRow);   
            cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click",removeCartItem);
            cartRow.getElementsByClassName("cart_quantity_input")[0].addEventListener("change",quantityChange); 
            updateCartTotal();
    }
    
    function updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName("display_cart")[0];
        var cartRows = cartItemContainer.getElementsByClassName("cart_row");
             totalAmount =0;
            for (var i=1 ; i<cartRows.length; i++){
                var cartRow = cartRows[i];
                var priceElement = cartRow.getElementsByClassName("cart_amt")[0];
                var quantityElement = cartRow.getElementsByClassName("cart_quantity_input")[0];
                var price = priceElement.innerHTML.replace("Rs"," ");
                console.log(price);
                var quantity = quantityElement.value;
                console.log(quantity);
                totalAmount = totalAmount + (quantity * price);
                console.log(totalAmount);
            } 
            document.getElementsByClassName("cart_total_price")[0].innerHTML=`Rs${totalAmount}`;
    }
    
 /* js for cart ends */
