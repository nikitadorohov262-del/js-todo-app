const button = document.getElementById("saveBtn");
const Input = document.getElementById("nameInput");
button.addEventListener("click", function(){
	localStorage.setItem("userName", Input.value);
});
const savedData = localStorage.getItem("userName");

if(savedData){
	alert(savedData);
};