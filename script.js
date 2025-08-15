const apiKey = "5cb03a6458b7462380b135630251508";

async function suggestCities(query) {
  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = "";

  if (query.length < 2) return;

  const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
  try {
    let res = await fetch(url);
    let data = await res.json();

    data.forEach(city => {
      let div = document.createElement("div");
      div.textContent = `${city.name}, ${city.country}`;
      div.onclick = () => {
        document.getElementById("city").value = city.name;
        suggestionsBox.innerHTML = "";
      };
      suggestionsBox.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching city suggestions", err);
  }
}

async function getWeather() {
  let city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error("City not found");
    }

    let data = await res.json();
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let icon = data.current.condition.icon;

    document.getElementById("result").innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <h1>${temp}°C</h1>
      <p>${condition}</p>
      <img src="https:${icon}" alt="${condition}">
    `;
  } catch (error) {
    document.getElementById("result").innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
