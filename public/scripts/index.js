fetch("https://nodejs-api-sql.herokuapp.com/users")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((i) => {
      document.querySelector(".table").innerHTML += `<tr>
                <td>${i.user_id}</td>
                <td>${i.email}</td>
                <td>${i.password}</td>
                <td>${i.full_name}</td>
                <td>${i.billing_address}</td>
                <td>${i.default_shipping_address}</td>
                <td>${i.country}</td>
                <td>${i.phone}</td>
                <td>${i.user_type}</td>
                </tr>`;
    });
  });
