function getUser() {
  const btn = document.getElementById("loadUser");
  btn.disabled = true;

  const promise = new Promise((resolve, reject) => {
    fetch("https://randomuser.me/api")
      .then((response) => {
        if (!response.ok) {
          reject("Помилка HTTP: " + response.status);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

  promise
    .then((data) => {
      const user = data.results[0];
      const picture = user.picture.large;
      const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
      const city = user.location.city;
      const postcode = user.location.postcode;
      const cell = user.cell;

      document.getElementById("userInfo").innerHTML = `
        <img src="${picture}" class="size-60 rounded-md" alt="Фото користувача">
        <div>
          <p class="text-xl font-bold mb-2">${name}</p>
          <p><strong>Місто:</strong> ${city}</p>
          <p><strong>Поштовий індекс:</strong> ${postcode}</p>
          <p><strong>Телефон:</strong> ${cell}</p>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Помилка при отриманні даних:", error);
    })
    .finally(() => {
      btn.disabled = false;
    });
}

document.getElementById("loadUser").addEventListener("click", getUser);
