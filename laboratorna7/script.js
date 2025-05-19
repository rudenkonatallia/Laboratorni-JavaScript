let allCategories = [];

function loadHome() {
  document.getElementById('content').innerHTML = `
    <p>Оберіть категорію товарів із каталогу.</p>
  `;
}

function loadCatalog() {
  fetchJSON('data/categories.json', function(categories) {
    allCategories = categories;
    let html = '<h2>Каталог</h2><ul>';
    categories.forEach(cat => {
      html += `<li><a href="#" onclick="loadCategory('${cat.shortname}')">${cat.name}</a></li>`;
    });
    html += `<li><a href="#" onclick="loadRandomCategory()">Specials</a></li>`;
    html += '</ul>';
    document.getElementById('content').innerHTML = html;
  });
}

function loadRandomCategory() {
  if (allCategories.length === 0) {
    loadCatalog();
    return;
  }
  const random = allCategories[Math.floor(Math.random() * allCategories.length)];
  loadCategory(random.shortname);
}

function loadCategory(shortname) {
  fetchJSON(`data/${shortname}.json`, function(data) {
    let html = `<h2>${data.category}</h2>`;
    data.items.forEach(item => {
      html += `
        <div class="card">
          <img src="https://place-hold.it/200x150" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p><strong>${item.price}</strong></p>
        </div>
      `;
    });
    document.getElementById('content').innerHTML = html;
  });
}

function fetchJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => callback(JSON.parse(xhr.responseText));
  xhr.send();
}
