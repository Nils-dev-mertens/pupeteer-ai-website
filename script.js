async function main() {
    const data = await fetch("http://localhost:3000/table");
    const json = await data.json();
    json.forEach(element => {
        CreateProduct(element);
    });
    FetchOptionsProduct();
    FetchOptionsWebsite();
}
async function start() {
try {
  const response = await fetch('http://localhost:3000');
  if (response.ok) {
    main();
  }
  else {
    ShowGetServer();
  }
} catch (error) {
  ShowGetServer();
}
}
function ShowGetServer() {
  document.body.innerHTML = "<h1>get the server</h1><button onclick='start()'>search again or use a different server than localhost</button>";
}
async function FetchOptionsProduct() {
    const data = await fetch("http://localhost:3000/product");
    const json = await data.json();
    document.getElementById("productinput").innerHTML = "";
    json.forEach(element => {
    CreateOptionsProduct(element);
  });
}
function CreateOptionsProduct(value) {
  document.getElementById("productinput").innerHTML += `<option value="${value.Id}">${value.Naam}</option>`;
}
async function FetchOptionsWebsite() {
  const data = await fetch("http://localhost:3000/Website");
  const json = await data.json();
  document.getElementById("websiteinput").innerHTML = "";
  json.forEach(element => {
  CreateOptionsWebsite(element);
});
}
function CreateOptionsWebsite(value) {
document.getElementById("websiteinput").innerHTML += `<option value="${value.Id}">${value.Naam}</option>`;
}
function CreateProduct(element) {
    document.querySelector(".show").innerHTML += `<h1>${element.ProductName}</h1><p>${element.prijs}</p><p>${element.WebsiteName}</p><a href="${element.URL}" target="_blank">${element.URL}</a>`;
}
function ClickProduct() {
  sendproduct(document.querySelector(".product-input .text-input").value);
}
function ClickWebsite() {
  const value = document.querySelector(".website-input .text-input").value;
  sendwebsite(value);
}
function sendproduct(name) {
    const data = {
        "name" : name
      };
      fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => {
        console.log("Response from Server:", response);
        if(response.ok == true){
          console.log("product added to Database");
          FetchOptionsProduct();
        }
      }).catch(error => {
        console.log("Error from Server:", error);
      });
}
function sendwebsite(name) {
    const data = {
        "name" : name
      };
      console.log(data);
      fetch("http://localhost:3000/website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => {
        console.log("Response from Server:", response);
        if(response.ok == true){
          console.log("Website added to Database");
          FetchOptionsWebsite();
        }
      }).catch(error => {
        console.log("Error from Server:", error);
      });
}
document.querySelector(".delete-database-input .text-input").addEventListener("input", (event) => {
  if(event.target.value === "Reset database"){
    document.querySelector(".delete-database-input .btn-danger").onclick = function() {ResetDatabase()};
  }
});
async function ResetDatabase() {
  fetch("http://localhost:3000/ResetDatabase");
};
start();