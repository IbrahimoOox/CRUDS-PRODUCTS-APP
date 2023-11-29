// get total // first function operations
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

function getTotal() {
  if (price.value !== '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = '#0d02';
  }
}

// function create products
let dataPro;
if (localStorage.product !== undefined) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === 'create') {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
  }
  localStorage.setItem('product', JSON.stringify(dataPro));
  clearData();
  showData();
};

// clear inputs
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// read
function showData() {
  getTotal();
  let table = '';
  document.getElementById('tbody').innerHTML = table;
  for (let i = 0; i < dataPro.length; i++) {
    table += `    <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>
            <button onclick="updateData(${i})" id="update">Update</button>
            </td>
            <td>
            <button onclick="deleteData(${i})" id="delete">Delete</button>
            </td>
        </tr>`;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll');
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
            <button onclick="deleteAll()" id="delete">Delete All(${dataPro.length})</button>
        `;
  } else {
    btnDelete.innerHTML = '';
  }
}

showData();

// delete products
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro = [];
  showData();
}

// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  });
}

// search
function searchByTitle() {
  let searchValue = document.getElementById('search').value.trim().toLowerCase();
  let filteredData = dataPro.filter((item) => item.title.toLowerCase().includes(searchValue));
  displayFilteredData(filteredData);
}

function searchByCategory() {
  let searchValue = document.getElementById('search').value.trim().toLowerCase();
  let filteredData = dataPro.filter((item) => item.category.toLowerCase().includes(searchValue));
  displayFilteredData(filteredData);
}

function displayFilteredData(filteredData) {
  let table = '';
  if (filteredData.length > 0) {
    for (let i = 0; i < filteredData.length; i++) {
      table += `    <tr>
            <td>${i}</td>
            <td>${filteredData[i].title}</td>
            <td>${filteredData[i].price}</td>
            <td>${filteredData[i].taxes}</td>
            <td>${filteredData[i].ads}</td>
            <td>${filteredData[i].discount}</td>
            <td>${filteredData[i].total}</td>
            <td>${filteredData[i].category}</td>
            <td>
            <button onclick="updateData(${i})" id="update">Update</button>
            </td>
            <td>
            <button onclick="deleteData(${i})" id="delete">Delete</button>
            </td>
        </tr>`;
    }
  } else {
    table = '<tr><td colspan="10">No results found.</td></tr>';
  }
  document.getElementById('tbody').innerHTML = table;
}