const button = document.getElementById("FinderBtn");
const Input = document.getElementById("Cityname");
const Title = document.getElementById("Title");
const Container = document.getElementById("Container");
button.addEventListener("click", async function(){
	const cityName = Input.value;
	Title.textContent = cityName;
	const Link = "https://wttr.in/" + cityName + "?format=j1";
	const response = await fetch(Link);
	const data = await response.json();
	const temp = data.current_condition[0].FeelsLikeC;
	Container.textContent = temp + " °C";
	localStorage.setItem("City", cityName);	
});


async function  CheckMemory(){
	const SaveData = localStorage.getItem("City");
	if (SaveData){
		const cityName = SaveData;
		Title.textContent = cityName;
		const Link = "https://wttr.in/" + cityName + "?format=j1";
		const response = await fetch(Link);
		const data = await response.json();
		const temp = data.current_condition[0].FeelsLikeC;
		Container.textContent = temp + " °C";
};
};
CheckMemory();