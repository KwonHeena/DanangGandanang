export async function renderWeather() {
  // 날씨 API
  let myKey = '7e25ee5a00f9ee61c0720496643a0139';
  let city = 'DaNang';
  let country = 'VN';
  let site = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${myKey}&units=metric&lang=kr`;

  try {
    let res = await fetch(site);
    let data = await res.json();
    console.log('weatherdata:', data);

    let current = document.querySelector('.current');
    let temp = document.querySelector('.temp');
    let imgIcon = document.querySelector('.weather_icon img');
    let feel_w = document.querySelector('.feel_w');
    let humidity = document.querySelector('.humidity');

    let iconCode = data.weather[0].icon;
    let description = data.weather[0].description;
    let iconUrl = '';

    current.textContent = description;
    temp.textContent = `${Math.round(data.main.temp)}℃`;
    feel_w.textContent = `체감온도 ${Math.round(data.main.feels_like)} °`;
    humidity.textContent = `습도 ${data.main.humidity}%`;
    console.log('iconCode:', iconCode);

    switch (iconCode) {
      case '01d':
      case '01n':
        iconUrl = './src/img/sub/ico_sky.png'; // 맑음
        break;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
        iconUrl = './src/img/sub/ico_fewclouds.png'; // 구름 조금
        break;
      case '04d':
      case '04n':
        iconUrl = './src/img/sub/ico_scatteredclouds.png'; // 구름 많음
        current.textContent = '구름많음';
        break;
      case 'broken clouds':
        iconUrl = './src/img/sub/brokenclouds.png'; // 구름 걷히는 중
        break;
      case '09d':
      case '09n':
        iconUrl = './src/img/sub/showerrain.png'; // 소나기
        break;
      case '10d':
      case '10n':
        iconUrl = './src/img/sub/ico_rain.png'; // 비
        break;
      case '11d':
      case '11n':
        iconUrl = './src/img/sub/thundersrorm.png'; //천둥번개
        break;
      case '13d':
      case '13n':
        iconUrl = './src/img/sub/ico_snow.png'; // 눈
        break;
      case '50d':
      case '50n':
        iconUrl = './src/img/sub/ico_mist.png'; // 안개
        break;
    }

    imgIcon.src = iconUrl;
  } catch (error) {}
}
renderWeather();
