let products = [];
let customers = [];

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);

  if (!name || isNaN(price)) return alert("Unesi ispravan naziv i cijenu!");

  const product = { name, price };
  products.push(product);
  renderProducts();
}

function deleteProduct(index) {
  products.splice(index, 1);
  renderProducts();
}

function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";
  products.forEach((product, index) => {
    list.innerHTML += `
      <li>${product.name} - ${product.price.toFixed(2)} EUR
        <button onclick="deleteProduct(${index})">Obriši</button>
      </li>`;
  });
}

function addCustomer() {
  const name = document.getElementById("customerName").value;
  if (!name) return alert("Unesi ime kupca!");

  customers.push(name);
  renderCustomers();
}

function deleteCustomer(index) {
  customers.splice(index, 1);
  renderCustomers();
}

function renderCustomers() {
  const list = document.getElementById("customerList");
  const select = document.getElementById("customerSelect");
  list.innerHTML = "";
  select.innerHTML = "";

  customers.forEach((customer, index) => {
    list.innerHTML += `
      <li>${customer}
        <button onclick="deleteCustomer(${index})">Obriši</button>
      </li>`;
    select.innerHTML += `<option value="${customer}">${customer}</option>`;
  });
}

function issueReceipt() {
  const customer = document.getElementById("customerSelect").value;
  if (!customer) return alert("Odaberi kupca!");

  let total = products.reduce((sum, p) => sum + p.price, 0);
  const output = document.getElementById("receiptOutput");
  output.innerHTML = `
    <h3>Račun za: ${customer}</h3>
    <ul>
      ${products.map(p => `<li>${p.name} - ${p.price.toFixed(2)} EUR</li>`).join("")}
    </ul>
    <strong>Ukupno: ${total.toFixed(2)} EUR</strong>
  `;
}
