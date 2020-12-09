const submitCity = document.getElementById('submit-city');
const divCityName = document.getElementById('name-id');
const divCityTemperature = document.getElementById('temperature-id');
const otherInfos = document.getElementById('infos');
const nextDaysSection = document.getElementById('next-days-id');

const createNextDaysDivs = () => {
  for (let index = 0; index <= 9; index += 1) {
    const nextDayParagraph = document.createElement('p');
    const nextDayDiv = document.createElement('div');
    nextDayDiv.className = "next-day-class";
    nextDayParagraph.id = index;
    nextDayDiv.appendChild(nextDayParagraph);
    nextDaysSection.appendChild(nextDayDiv);    
  }
}

createNextDaysDivs();

const appendResults = (data) => {
  const { city, date, time, description, temp, wind_speedy, humidity } = data.results;

  divCityName.innerText = `${city}
  ${date}, ${time}
  ${description}`;

  divCityTemperature.innerText = `${temp}°C
  ${(temp * 1.8 + 32).toPrecision(2)}°F`;

  otherInfos.innerText = `Vento: ${wind_speedy}
  Humidade: ${humidity}%`;
}

const appendForecast = (data) => {
  let counter = 0;
  data.results.forecast.forEach((element) => {
    const p = document.getElementById(`${counter}`);
    p.innerText = `${element.weekday}, ${element.date}
    ${element.min}° à ${element.max}°
    ${element.description}`;
    counter += 1;
  });
}

const fetchWheater = (cityCode) => {
  fetch(`https://api.hgbrasil.com/weather?key=2207bfed&format=json-cors&woeid=${cityCode}`)
  .then((response) => {
    response.json().then((data) => {
      if (data.error === true) return alert('Sem dados para retorno: limite de consultas de cidades excedido.');
      appendResults(data);
      appendForecast(data);
    })
  })
  .catch((error) => alert("Máximo de requisições atingido! Tente novamente mais tarde!"));
}

const fetchWheaterByIp = () => {
  fetch(`https://api.hgbrasil.com/weather?key=2207bfed&format=json-cors&user_ip=remote`)
  .then((response) => {
    response.json().then((data) => {
      if (data.error === true) return alert('Sem dados para retorno: limite de consultas de cidades excedido.');
      appendResults(data);
      appendForecast(data);
    })
  })
}

submitCity.addEventListener('click', () => {
  const input = document.getElementById('choose-city');
  fetchWheater(input.value);
});

window.onload = fetchWheaterByIp();