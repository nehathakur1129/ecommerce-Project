let btn = document.querySelector("#btn");
let savebtn = document.querySelector("#savebtn");
let name = document.querySelector("#name");
let description = document.querySelector("#description");
let price = document.querySelector("#price");

btn.addEventListener("click", function () {

    let storedItem = localStorage.getItem("myProducts");

    let arr = storedItem ? JSON.parse(storedItem) : [];

    let newProduct = {
        id: Date.now(),
        name: name.value,
        description: description.value,
        price: price.value
    };
    arr.push(newProduct);

    localStorage.setItem("myProducts", JSON.stringify(arr));

    displayItems(newProduct);
})


function getLocalStorage() {
    let storedItem = localStorage.getItem("myProducts");

    let arr = storedItem ? JSON.parse(storedItem) : [];
    arr.forEach((item) => {
        displayItems(item);

    })

}
getLocalStorage();


function displayItems(obj) {
    let ulist = document.querySelector("#ulist");
    // ulist.innerHTML='';


    let listItem = document.createElement("li");
    
    listItem.setAttribute("id","s"+obj.id);

    listItem.textContent = `Name: ${obj.name} Description: ${obj.description} Price: ${obj.price}`;

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function () {
        prodarr.splice(index, 1);
        localStorage.setItem("myProducts", JSON.stringify(prodarr));
        displayItems();
    })

    let updatebtn = document.createElement("button");
    updatebtn.textContent = "Update";
    updatebtn.addEventListener("click", function () {
        btn.classList.toggle("hide");
        savebtn.classList.toggle("hide");
        updateItem(obj);
    });



    listItem.appendChild(delBtn);
    listItem.appendChild(updatebtn);
    ulist.appendChild(listItem);


}
function updateItem(obj) {
    name.value = obj.name;
    description.value = obj.description;
    price.value = obj.price;
    savebtn.addEventListener("click", () => {
        let storedItem = localStorage.getItem("myProducts");
        let arr = storedItem ? JSON.parse(storedItem) : [];
        arr = arr.map((item) => {
            if (item.id == obj.id) {
                item.name = name.value;
                item.description = description.value;
                item.price = price.value;

            }
            return item;
        })
        localStorage.setItem("myProducts", JSON.stringify(arr));
        let listItem=document.querySelector("#s"+obj.id);

        listItem.textContent = `Name: ${name.value} Description: ${description.value} Price: ${price.value}`;

    });
   


}

//document.addEventListener('DOMContentLoaded',function(){
// local storage array
// foreach on array
//    displayItems(obj)
//})
// displayItems();