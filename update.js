let index = localStorage.getItem("editIndex");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

const titleInput = document.getElementById("editTitle");
const descInput = document.getElementById("editDescription");
const updateBtn = document.getElementById("updateBtn");

titleInput.value = notes[index].title;
descInput.value = notes[index].description;

updateBtn.onclick = () => {
  notes[index].title = titleInput.value;
  notes[index].description = descInput.value;

  localStorage.setItem("notes", JSON.stringify(notes));

  window.location.href = "index.html";
};
