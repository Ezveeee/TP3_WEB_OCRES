// Fonction appelée lors du click du bouton
function start() {
  let city = document.getElementById('city-input').value;
  if (city === "") {
    city = "paris";
  }
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function (response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main-0').innerHTML = main;
      document.getElementById('today-forecast-more-info-0').innerHTML = description;
      document.getElementById('icon-weather-container-0').innerHTML = icon;
      document.getElementById('today-forecast-temp-0').innerHTML = `${temp}°C`;

    })
    .catch(function (error) {
      // Affiche une erreur
      console.error(error);
    });

  apiWeather
    .fetchThreeDayForecast()
    .then(function (response) {
      // Récupère la donnée d'une API
      const data = response.data.list;
      for (let i = 1; i <= data.length; i++) {
        // On récupère l'information principal
        const main = data[i].weather[0].main;
        const description = data[i].weather[0].description;
        const temp = data[i].temp.day;
        const icon = apiWeather.getHTMLElementFromIcon(data[i].weather[0].icon);
        // Modifier le DOM
        document.getElementById(`today-forecast-main-${i}`).innerHTML = main;
        document.getElementById(`today-forecast-more-info-${i}`).innerHTML = description;
        document.getElementById(`icon-weather-container-${i}`).innerHTML = icon;
        document.getElementById(`today-forecast-temp-${i}`).innerHTML = `${temp}°C`;
      }
    })
    .catch(function (error) {
      // Affiche une erreur
      console.error(error);
    });
}
