let name = document.querySelector("#name");
let description = document.querySelector("#description");
let price = document.querySelector("#price");
let btn = document.querySelector("#btn");
let outdiv = document.querySelector("#outdiv");
let tasks = [];

btn.addEventListener("click", function() {
    if (name.value == '' || description.value == '' || price.value == '') { //trim means cutting the spaces
        alert("input box is empty");// if input fields empty this alert msg is shown
        return; //exits function , prevnting further execution of code inside eventlistener
    }
    
    let obj = {
        id: Date.now(), //generates unique timestamp as id
        name: name.value,
        description: description.value,
        price: price.value
    };
    tasks.push(obj);

    addToUI(obj);
    name.value = '';
    description.value = '';
    price.value = '';  // these lines reset the values to empty string, clearing input fields after adding the task
    storeLocalStorage();
})

function addToUI(obj) {

    let div = document.createElement("div");
    div.setAttribute("id", "divStyle"); // id given as divStyle to div. allows to apply css styles
    let namespan = document.createElement("span");
    namespan.setAttribute("id", "namespan");
    namespan.innerHTML = obj.name;
    
    let descriptionspan = document.createElement("span");
    descriptionspan.setAttribute("id", "descriptionspan");
    descriptionspan.innerHTML = obj.description;
    let pricespan = document.createElement("span");
    pricespan.setAttribute("id", "pricespan");
    pricespan.innerHTML = obj.price;


    let delbtn = document.createElement("button");
    delbtn.setAttribute("id", "delbtn");
    delbtn.innerHTML = "Delete";
    delbtn.addEventListener("click", function() {
        tasks = tasks.filter(function(item) {
            return item.id != obj.id;
        });
        div.remove();
        storeLocalStorage();
    })

    let updbtn = document.createElement("button");
    updbtn.setAttribute("id", "updbtn");
    updbtn.innerHTML = "Update";
    updbtn.addEventListener("click", function() {
        let upddiv = document.createElement("div");
        let updname = document.createElement("input");
        updname.setAttribute("type", "text");
        updname.value = obj.name;
        upddiv.appendChild(updname);
        outdiv.appendChild(upddiv);
      

        let upddescription = document.createElement("input");
        upddescription.setAttribute("type", "text");
        upddescription.value = obj.description;
        upddiv.appendChild(upddescription);
        outdiv.appendChild(upddiv);

        let updprice = document.createElement("input");
        updprice.setAttribute("type", "text");
        updprice.value = obj.price;
        upddiv.appendChild(updprice);
        outdiv.appendChild(upddiv);

        let newupdbtn = document.createElement("button");
        newupdbtn.setAttribute("id", "newupdbtn");
        newupdbtn.textContent = "UPDATE";
        upddiv.appendChild(newupdbtn);
        newupdbtn.addEventListener("click", function() {
            obj.price = updprice.value;
            obj.name = updname.value;
            obj.description = upddescription.value;
            upddiv.remove();
            addToUI(obj);
            div.remove();

            storeLocalStorage();

           
        })
    })



    outdiv.appendChild(div);
    div.appendChild(namespan);
    div.appendChild(descriptionspan);
    div.appendChild(pricespan);
    div.appendChild(delbtn);
    div.appendChild(updbtn);


}

function storeLocalStorage() {
    localStorage.setItem("mytasks", JSON.stringify(tasks)); // stringify: converts array/ object into string, localstorage mei data hmesha string mei store hota hai
}

function getLocalStorage() {
    if (localStorage.getItem("mytasks")) {
        tasks = JSON.parse(localStorage.getItem("mytasks"));
    }
    tasks.forEach(function(item) {
        addToUI(item);
    });
}
getLocalStorage();












