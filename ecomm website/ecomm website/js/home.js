document.addEventListener("DOMContentLoaded",function(){
    const arr=document.querySelector("#divid");
    const loadbtn=document.querySelector("#loadmore");

    let products=[];
    let startIndex=0;
    const batchSize=6;


    function retrieveProducts(){
        const localStorageProducts=JSON.parse(localStorage.getItem("mytasks"));
       // console.log(localStorageProducts); array of objects
        if(localStorageProducts && localStorageProducts.length>0){
            products=localStorageProducts;
            
        }
        console.log(products);
    }


    function displayProducts(start,end){
        for(let i=start;i<end;i++){
            const product=products[i];
            //console.log(product);
            if(product){
            //     const productsItem=document.createElement("div");
            //     productsItem.textContent=`Name: ${product.product} Description: ${product.description} Price: ${product.price}`
            // arr.appendChild(productsItem);
            const productDiv = document.createElement("div");
                productDiv.classList.add("product"); // Adding a CSS class for styling

                const namePara = document.createElement("p");
                namePara.textContent = `Name: ${product.name}`;

                const descriptionPara = document.createElement("p");
                descriptionPara.textContent = `Description: ${product.description}`;

                const pricePara = document.createElement("p");
                pricePara.textContent = `Price: ${product.price}`;

                productDiv.appendChild(namePara);
                productDiv.appendChild(descriptionPara);
                productDiv.appendChild(pricePara);

                arr.appendChild(productDiv);
            
            }
        }
    }


    retrieveProducts();
    displayProducts(startIndex,startIndex+batchSize);
    loadbtn.addEventListener("click",function(){
            startIndex+=batchSize;
            displayProducts(startIndex,startIndex+batchSize);


            if(startIndex+batchSize>=products.length){
                loadbtn.style.display='none'; 
            }
            else {
                loadbtn.style.display = "block";
              }
        });
    
});