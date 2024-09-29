//get total
// craete product
// save data in logal storage
//clear
// read
//count
//update
//delete
//search
//validation
const titel = document.getElementById("titel");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
let count = document.getElementById("count");
const catecory = document.getElementById("catecory");
const submit = document.getElementById("submit");
const tbody = document.getElementById("tbody");
const btnDeleteAll = document.querySelector("#deleteAll");
const search = document.getElementById("search");
let mode = "create";
let index;
//get total
function getTotal() {
  // price.value= taxes.value= ads.value=discount.value='';
  if (price.value !== "") {
    let result =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.style.backgroundColor = "#a00d02";
    total.innerHTML = "0";
  }
}
// craete product
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}
submit.addEventListener("click", function () {
  submit.innerHTML = "Create";
  count.style.display = "block";
  let newProduct = {
    titel: titel.value,
    price: +price.value,
    taxes: +taxes.value,
    ads: +ads.value,
    discount: +discount.value,
    total: +total.innerHTML,
    count: +count.value,
    catecory: catecory.value,
  };
 if(titel.value!=='' && price.value!=='' && catecory.value!=='')
 {
    if (mode === "create") {
        //count
        if (newProduct.count > 1) {
          for (let i = 0; i < newProduct.count; i++) {
            dataProduct.push(newProduct);
          }
        } else {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct[index] = newProduct;
      }
      titel.value =
      price.value =
      taxes.value =
      ads.value =
      count.value =
      catecory.value =
      discount.value =
        "";
 }
 else
 {

 }
  mode = "create";
  // save data in logal storage
  localStorage.setItem("product", JSON.stringify(dataProduct));
  total.innerHTML = 0;
  total.style.backgroundColor = "#a00d02";
  readProducts();
  // claer data
//   titel.value =
//     price.value =
//     taxes.value =
//     ads.value =
//     count.value =
//     catecory.value =
//     discount.value =
//       "";
  createBtnAll();
});
//read data
function readProducts() {
  let tabel = "";

  for (let i = 0; i < dataProduct.length; i++) {
    tabel += `
      <tr>
                 <td>${i + 1}</td>
                 <td>${dataProduct[i].titel}</td>
                 <td>${dataProduct[i].price}</td>
                 <td>${dataProduct[i].taxes}</td>
                 <td>${dataProduct[i].ads}</td>
                 <td>${dataProduct[i].discount}</td>
                 <td>${dataProduct[i].total}</td>
                 <td>${dataProduct[i].count}</td>
                 <td>${dataProduct[i].catecory}</td>
                 <td><button id="update" onclick='updateProduct(${i})'>update</button></td>
                 <td><button id="delet" onclick='deleteProduct(${i})'>delete</button></td>
             </tr>
  `;
  }
  tbody.innerHTML = tabel;
}
readProducts();
//delet Product
function deleteProduct(product) {
  dataProduct.splice(product, 1);
  localStorage.product = JSON.stringify(dataProduct);
  readProducts();
  createBtnAll();
}
//displya Btn DeleteAll
function createBtnAll() {
  if (dataProduct.length > 0) {
    btnDeleteAll.style.display = "block";
    btnDeleteAll.innerHTML = `Delete All (${dataProduct.length})`;
  } else {
    btnDeleteAll.style.display = "none";
  }
}
createBtnAll();
//delete All products
btnDeleteAll.addEventListener("click", function () {
  localStorage.clear();
  dataProduct.splice(0);
  localStorage.product = JSON.stringify(dataProduct);
  readProducts();
  createBtnAll();
});
//upadate Products
function updateProduct(product) {
  titel.value = dataProduct[product].titel;
  price.value = dataProduct[product].price;
  taxes.value = dataProduct[product].taxes;
  ads.value = dataProduct[product].ads;
  discount.value = dataProduct[product].discount;
  //   count.value = dataProduct[product].count;
  count.style.display = "none";
  catecory.value = dataProduct[product].catecory;
  total.innerHTML = dataProduct[product].total;
  getTotal();
  submit.innerHTML = "Update";
  mode = "update";
  console.log(mode);
  index = product;
  localStorage.product = JSON.stringify(dataProduct);
  scroll({ top: 0, behavior: "smooth" });
}
//search
let searchMood = "title";
function getSearchMood(id) {
  if (id === "searchTitlel") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "catecory";
    search.placeholder = "Search By Category";
  }
  search.focus();
}
let results;
function searchProduct(value) {
  if (searchMood === "title") {
    results = dataProduct.filter((product) =>
      product.titel.toLowerCase().includes(value.toLowerCase())
    );

    if (results.length > 0) {
      let tabel = "";

      for (let i = 0; i < results.length; i++) {
        tabel += `
      <tr>
                 <td>${i + 1}</td>
                 <td>${results[i].titel}</td>
                 <td>${results[i].price}</td>
                 <td>${results[i].taxes}</td>
                 <td>${results[i].ads}</td>
                 <td>${results[i].discount}</td>
                 <td>${results[i].total}</td>
                 <td>${results[i].count}</td>
                 <td>${results[i].catecory}</td>
                 <td><button id="update" onclick='updateProduct(${i})'>update</button></td>
                 <td><button id="delet" onclick='deleteProduct(${i})'>delete</button></td>
             </tr>
  `;
      }
      tbody.innerHTML = tabel;
    }
  } else {
    console.log("No products found.");
    results = dataProduct.filter((product) =>
      product.catecory.toLowerCase().includes(value.toLowerCase())
    );
    console.log(value);
    if (results.length > 0) {
      {
        let tabel = "";

        for (let i = 0; i < results.length; i++) {
          tabel += `
        <tr>
                   <td>${i + 1}</td>
                   <td>${results[i].titel}</td>
                   <td>${results[i].price}</td>
                   <td>${results[i].taxes}</td>
                   <td>${results[i].ads}</td>
                   <td>${results[i].discount}</td>
                   <td>${results[i].total}</td>
                   <td>${results[i].count}</td>
                   <td>${results[i].catecory}</td>
                   <td><button id="update" onclick='updateProduct(${i})'>update</button></td>
                   <td><button id="delet" onclick='deleteProduct(${i})'>delete</button></td>
               </tr>
    `;
        }
        tbody.innerHTML = tabel;
      }
    }
  }
}
//claen data