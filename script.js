const button = document.getElementById("FinderBtn");
const Input = document.getElementById("Cityname");
const Title = document.getElementById("Title");
const Container = document.getElementById("Container");
const Text_1 = document.getElementById("condition");
const Text_2 = document.getElementById("feelsLike");
const History = document.getElementById("historyBlock");

const weatherDictionary = {
    "Patchy rain nearby": "Местами дождь",
    "Partly cloudy": "Переменная облачность",
    "Clear": "Ясно",
    "Sunny": "Ясно",
    "Cloudy": "Облачно",
    "Overcast": "Пасмурно",
    "Mist": "Туман",
    "Light rain": "Небольшой дождь",
    "Moderate rain": "Умеренный дождь",
    "Heavy rain": "Сильный дождь",
    "Light snow": "Небольшой снег",
    "Snow": "Снег"
};

button.addEventListener("click", async function(){
	const cityName = Input.value;
	const Link = "https://wttr.in/" + cityName + "?format=j1&lang=ru";
	const response = await fetch(Link);
	const data = await response.json();
	const temp = data.current_condition[0].temp_C;
	let rawCondition = data.current_condition[0].lang_ru[0].value;
	let finalCondition = weatherDictionary[rawCondition] || rawCondition;
	let arr = JSON.parse(localStorage.getItem("Cities")) || [];
	const cityData = {
		name: cityName,
		temp: temp,
		feelslike: data.current_condition[0].FeelsLikeC,
		condition: finalCondition
	};
	arr.push(cityData);
	localStorage.setItem("Cities", JSON.stringify(arr));
	renderHistory();
});

function renderHistory(){	
	History.innerHTML = "";
	
	let history = JSON.parse(localStorage.getItem("Cities")) || [];
	history.forEach((city, index) => {
		const item = document.createElement("div");
		const Text = document.createElement("h2");
		const button = document.createElement("button"); 
		const Temp = document.createElement("p");
		const Feels = document.createElement("p");
		const Weather = document.createElement("p");
		const Bar = document.createElement("p");
		Bar.textContent = "-------------------------------------------------";
		Text.textContent = city.name;
		Feels.textContent = "Ощущается как: " + city.feelslike + " °C" ;
		Temp.textContent = "Фактическая температура: " + city.temp + " °C";
		Weather.textContent = "Состояние погоды: " + city.condition;		
		button.textContent = "Удалить";
		button.onclick = function(){
			history.splice(index, 1);
			localStorage.setItem("Cities", JSON.stringify(history));
			renderHistory();
		};
		item.appendChild(Bar);
		item.appendChild(Text);
		item.appendChild(Temp);
		item.appendChild(Feels);
		item.appendChild(Weather);
		item.appendChild(button);
		History.appendChild(item);
	});
};
renderHistory();