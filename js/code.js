
let asuncion = {
    name: "Asunción",
    img: "asuncion.jpg",
    flag: "pry",
}

let bogota = {
    name: "Bogota",
    img: "bogota.jpg",
    flag: "col",
}

let brasilia = {
    name: "Brasília",
    img: "brasilia.jpg",
    flag: "bra",
}

let buenosAires = {
    name: "Buenos Aires",
    img: "buenosAires.jpg",
    flag: "arg",
}

let caracas = {
    name: "Caracas",
    img: "caracas.jpg",
    flag: "ven",
}

let georgetown = {
    name: "George Town",
    img: "georgetown.jpg",
    flag: "guy",
}

let laPaz = {
    name: "La Paz",
    img: "laPaz.jpg",
    flag: "bol",
}

let lima = {
    name: "Lima",
    img: "lima.jpg",
    flag: "per",
}

let montevideo = {
    name: "Montevideo",
    img: "montevideo.jpg",
    flag: "ury",
}

let puertoEspaña = {
    name: "Puerto España",
    img: "puertoEspaña.jpg",
    flag: "tto",
}

let quito = {
    name: "Quito",
    img: "quito.jpg",
    flag: "ecu",
}

let santiagoDeChile = {
    name: "Santiago",
    img: "santiago.jpg",
    flag: "chl",
}

let capitales = [asuncion, bogota, brasilia, buenosAires, caracas, georgetown, laPaz, lima, montevideo, puertoEspaña, quito, santiagoDeChile];

const selectCity1 = () => {
    for (let i = 0; i < capitales.length; i++) {
        let opt = document.createElement("option");
        opt.text = capitales[i].name;
        document.querySelector("#selectCity1").append(opt);
    }
}
selectCity1();

const selectCity2 = () => {
    for (let i = 0; i < capitales.length; i++) {
        let opt = document.createElement("option");
        opt.text = capitales[i].name;
        document.querySelector("#selectCity2").append(opt);
    }
}
selectCity2();

const back = () => {
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#content").style.display = "none";
    location.reload();
}
document.querySelector("#spanBack").addEventListener("click", back);

const showContent = () => {
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#content").style.display = "block";

    c1 = [];
    c2 = [];
}

let c1 = [];
let c2 = [];
console.log(c1);
console.log(c2);
let c1FNWeather = [];
let c1FNMax = [];
let c1FNMin = [];
let c1FNWind = [];
let c1FNHumidity = [];
let c1FNData = [c1FNWeather, c1FNMax, c1FNMin, c1FNWind, c1FNHumidity];
let c2FNWeather = [];
let c2FNMax = [];
let c2FNMin = [];
let c2FNWind = [];
let c2FNHumidity = [];
let c2FNData = [c2FNWeather, c2FNMax, c2FNMin, c2FNWind, c2FNHumidity];

const compararData = () => {
    let c1Point = 0;
    let c2Point = 0;

    const compararDataPre = () => {
        if(c1[7] < c2[7]){
            c1Point++;
        }
        else if(c1[7] === c2[7]){
            c1Point++;
            c2Point++;
        }
        else{
            c2Point++;
        }
        if(c1[8] > c2[8]){
            c1Point++;
        }
        else if(c1[8] === c2[8]){
            c1Point++;
            c2Point++;
        }
        else{
            c2Point++;
        }
        if(c1[9] < c2[9]){
            c1Point++;
        }
        else if(c1[9] === c2[9]){
            c1Point++;
            c2Point++;
        }
        else{
            c2Point++;
        }
        console.log(c1Point);
        console.log(c2Point);
    }
    compararDataPre();

    if(c1Point > c2Point){
        console.log(c1FNData)
        forecastNext(c1FNData);
        forecast(c1);
    }
    else{
        console.log(c2FNData);
        forecastNext(c2FNData);
        forecast(c2);
    }
}

const cData = () => {
    let c1selected = document.querySelector("#selectCity1").value;
    let c2selected = document.querySelector("#selectCity2").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c1selected}&appid=3d79a0448b93b7715ef159486ac7bd2f&lang=es&units=metric`)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        c1.push(data.name);
        c1.push(Math.round(data.main.temp));
        c1.push(data.weather[0].main);
        c1.push(Math.round(data.main.temp_max));
        c1.push(Math.round(data.main.temp_min));
        c1.push(Math.round(data.wind.speed * 3.6));
        c1.push(data.main.humidity);
        forecastC1(lat, lon);
        console.log(data);
    })
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c2selected}&appid=3d79a0448b93b7715ef159486ac7bd2f&lang=es&units=metric`)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        c2.push(data.name);
        c2.push(Math.round(data.main.temp));
        c2.push(data.weather[0].main);
        c2.push(Math.round(data.main.temp_max));
        c2.push(Math.round(data.main.temp_min));
        c2.push(Math.round(data.wind.speed * 3.6));
        c2.push(data.main.humidity);
        forecastC2(lat, lon);
        console.log(data);
    })
}

const forecastC1 = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=471be13f0794eeac9457b0504f512bc7`)
        .then(r => r.json())
        .then(data => {
        let wind = [];
        data.daily.forEach(e => {
        wind.push(e.wind_speed * 3.6)
        });
        let windSum = wind.reduce((previous, current) => current += previous);
        let windAvg = windSum / wind.length;
        c1.push((Math.round(windAvg)));
        let max = [];
        let min = [];
        data.daily.forEach(e => {
            let maxData = e.temp.max;
            max.push(maxData - 273.15);
        });
        data.daily.forEach(e => {
            let minData = e.temp.min;
            min.push(minData - 273.15);
        });
        let maxSum = max.reduce((previous, current) => current += previous);
        let maxAvg = maxSum / max.length;
        let minSum = min.reduce((previous, current) => current += previous);
        let minAvg = minSum / min.length;
        let maxMinAvg = (maxAvg + minAvg) / 2;
        c1.push((Math.round(maxMinAvg)));
        
        let rain = 0;
        data.daily.forEach(e => {
            let rainData = e.weather[0].main;
            if(rainData === "Rain"){
                rain++;
            }
        });
        c1.push(rain);
        for(i = 0; i <= data.daily.length -1; i++){
            c1FNWeather.push(data.daily[i].weather[0].main);
            c1FNMax.push(Math.round((data.daily[i].temp.max) - 273.15));
            c1FNMin.push(Math.round((data.daily[i].temp.min) - 273.15));
            c1FNWind.push(Math.round(Math.round(data.daily[i].wind_speed) * 3.6));
            c1FNHumidity.push(data.daily[i].humidity);
        }
        compararData();
    });
}

const forecastC2 = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=471be13f0794eeac9457b0504f512bc7`)
        .then(r => r.json())
        .then(data => {
        let wind = [];
        data.daily.forEach(e => {
        wind.push(e.wind_speed * 3.6)
        });
        let windSum = wind.reduce((previous, current) => current += previous);
        let windAvg = windSum / wind.length;
        c2.push((Math.round(windAvg)));
        let max = [];
        let min = [];
        data.daily.forEach(e => {
            let maxData = e.temp.max;
            max.push(maxData - 273.15);
        });
        data.daily.forEach(e => {
            let minData = e.temp.min;
            min.push(minData - 273.15);
        });
        let maxSum = max.reduce((previous, current) => current += previous);
        let maxAvg = maxSum / max.length;
        let minSum = min.reduce((previous, current) => current += previous);
        let minAvg = minSum / min.length;
        let maxMinAvg = (maxAvg + minAvg) / 2;
        c2.push((Math.round(maxMinAvg)));
        
        let rain = 0;
        data.daily.forEach(e => {
            let rainData = e.weather[0].main;
            if(rainData === "Rain"){
                rain++;
            }
        });
        c2.push(rain);
        for(i = 0; i <= data.daily.length -1; i++){
            c2FNWeather.push(data.daily[i].weather[0].main);
            c2FNMax.push(Math.round((data.daily[i].temp.max) - 273.15));
            c2FNMin.push(Math.round((data.daily[i].temp.min) - 273.15));
            c2FNWind.push(Math.round(Math.round(data.daily[i].wind_speed) * 3.6));
            c2FNHumidity.push(data.daily[i].humidity);
        }
        compararData();
    });
}

const forecast = (a) => {
    document.querySelector("#h4Name").innerHTML = `${a[0]}`;
    document.querySelector("#spanTempNow").innerHTML = `${a[1]} °C`;
    document.querySelector("#imgWeatherNow").src = `img/${a[2]}.png`;
    document.querySelector("#pTempMax").innerHTML = `${a[3]} °C`;
    document.querySelector("#pTempMin").innerHTML = `${a[4]} °C`;
    document.querySelector("#pWind").innerHTML = `${a[5]} km/h`;
    document.querySelector("#pHumidity").innerHTML = `${a[6]} %`;
    const imgCity = () => {
        for(i = 0; i <= capitales.length -1; i++){
            if(capitales[i].name === a[0]){
                document.querySelector("header").style.backgroundImage = `url('img/${capitales[i].img}')`
            }
        }
    }
    imgCity();
    const spanFlag = () => {
        for(i = 0; i <= capitales.length -1; i++){
            if(capitales[i].name === a[0]){
                document.getElementById("#spanFlag").className = `flag-icon flag-icon-${capitales[i].flag}`
            }
        }
    }
    spanFlag();
}

let article1 = document.createElement("article");
let article2 = document.createElement("article");
let article3 = document.createElement("article");
let article4 = document.createElement("article");
let article5 = document.createElement("article");
let article6 = document.createElement("article");
let article7 = document.createElement("article");
let articles = [article1, article2, article3, article4, article5, article6, article7];

const forecastNext = (a) => {
    for (let i = 0; i < articles.length; i++) {
        document.querySelector("#divArticles").append(articles[i]);
    }
    article1.innerHTML = 
    `<img src="img/${a[0][1]}.png" alt="clima">
    <div>
        <p>Max</p>
        <p>${a[1][1]} °C</p>
        <p>Min</p>
        <p>${a[2][1]} °C</p>
    </div>
    <div>
        <p>Viento</p>
        <p>${a[3][1]} km/h</p>
    </div>
    <div>
        <p>Humedad</p>
        <p>${a[4][1]} %</p>
    </div>`
    article2.innerHTML = 
    `<img src="img/${a[0][2]}.png" alt="clima">
    <div>
        <p>Max</p>
        <p>${a[1][2]} °C</p>
        <p>Min</p>
        <p>${a[2][2]} °C</p>
    </div>
    <div>
        <p>Viento</p>
        <p>${a[3][2]} km/h</p>
    </div>
    <div>
        <p>Humedad</p>
        <p>${a[4][2]} %</p>
    </div>`
    article3.innerHTML = 
    `<img src="img/${a[0][3]}.png" alt="clima">
    <div>
        <p>Max</p>
        <p>${a[1][3]} °C</p>
        <p>Min</p>
        <p>${a[2][3]} °C</p>
    </div>
    <div>
        <p>Viento</p>
        <p>${a[3][3]} km/h</p>
    </div>
    <div>
        <p>Humedad</p>
        <p>${a[4][3]} %</p>
    </div>`
    article4.innerHTML = 
    `<img src="img/${a[0][4]}.png" alt="clima">
    <div>
        <p>Max</p>
        <p>${a[1][4]} °C</p>
        <p>Min</p>
        <p>${a[2][4]} °C</p>
    </div>
    <div>
        <p>Viento</p>
        <p>${a[3][4]} km/h</p>
    </div>
    <div>
        <p>Humedad</p>
        <p>${a[4][4]} %</p>
    </div>`
    article5.innerHTML = 
    `<img src="img/${a[0][5]}.png" alt="clima">
    <div>
        <p>Max</p>
        <p>${a[1][5]} °C</p>
        <p>Min</p>
        <p>${a[2][5]} °C</p>
    </div>
    <div>
        <p>Viento</p>
        <p>${a[3][5]} km/h</p>
    </div>
    <div>
        <p>Humedad</p>
        <p>${a[4][5]} %</p>
    </div>`
    article6.innerHTML = 
    `<img src="img/${a[0][6]}.png" alt="clima">
    <div>
        <p>Max</p>
        <p>${a[1][6]} °C</p>
        <p>Min</p>
        <p>${a[2][6]} °C</p>
    </div>
    <div>
        <p>Viento</p>
        <p>${a[3][6]} km/h</p>
    </div>
    <div>
        <p>Humedad</p>
        <p>${a[4][6]} %</p>
    </div>`
    article7.innerHTML = 
    `<img src="img/${a[0][7]}.png" alt="clima">
    <div>
        <p>Max</p>
        <p>${a[1][7]} °C</p>
        <p>Min</p>
        <p>${a[2][7]} °C</p>
    </div>
    <div>
        <p>Viento</p>
        <p>${a[3][7]} km/h</p>
    </div>
    <div>
        <p>Humedad</p>
        <p>${a[4][7]} %</p>
    </div>`
}

const comparar = () => {
    cData();
    showContent();
}
document.querySelector("#inputComparar").addEventListener("click", comparar);



