document.querySelector('.busca').addEventListener('submit', async (event)=>{
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if(input !== ''){
    clearInfor();
    showWarning('Carregando...');

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=fec0cfc215c206dff7c421ec90c42a51&units=metric&lang=pt_br`;

      let results = await fetch(url);
      let json = await results.json();

    if(json.cod === 200){
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        winSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });
    } else{
      clearInfor();
      showWarning('Não Encontramos Esta Localização.')
    }
   
  }else{
    clearInfor();
  }
});

function showInfo(json){
  showWarning('');

  
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.winSpeed} <span>km/h</span>`;

  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

  document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg){
  document.querySelector('.aviso').innerHTML = msg;
}

function clearInfor(){
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}
