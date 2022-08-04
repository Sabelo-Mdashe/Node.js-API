fetch("http://localhost:6969/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((i) => {
      document.querySelector(".table").innerHTML += `<tr>
        <td>${i.product_id}</td>
        <td>${i.sku}</td>
        <td>${i.name}</td>
        <td>${i.price}</td>
        <td>${i.weight}</td>
        <td>${i.descriptions}</td>
        <td>${i.thumbnail}</td>
        <td>${i.image}</td>
        <td>${i.category}</td>
        <td>${i.create_date}</td>
        <td>${i.stock}</td>
        </tr>`;
    });
  });
