async function main() {
    const data = await fetch("http://localhost:3000/table");
    const json = await data.json();
    json.forEach(element => {
        CreateElementDom(element);
    });
}
function CreateElementDom(element) {
    document.body.innerHTML += `<h1>${element.ProductName}</h1><p>${element.prijs}</p><p>${element.WebsiteName}</p><a href="${element.URL}" target="_blank">${element.URL}</a>`;
}
main();
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
        }
      }).catch(error => {
        console.log("Error from Server:", error);
      });
}
function sendwebsite(name) {
    const data = {
        "name" : name
      };
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
        }
      }).catch(error => {
        console.log("Error from Server:", error);
      });
}