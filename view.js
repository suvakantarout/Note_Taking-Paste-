let index = localStorage.getItem("viewIndex");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

const viewTitle = document.getElementById("viewTitle");
const viewDescription = document.getElementById("viewDescription");

viewTitle.value = notes[index].title;
viewDescription.value = notes[index].description;
