const title = document.getElementById("title");
const desc = document.getElementById("description");
const createBtn = document.getElementById("createBtn");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function render() {
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
  <div class="note-left">
    <div class="note-title">${note.title}.txt</div>
    <div class="note-date">${note.date}</div>
  </div>

  <div class="note-actions">
    <i class="ri-pencil-line" onclick="edit(${index})"></i>
    <i class="ri-delete-bin-line" onclick="del(${index})"></i>
    <i class="ri-eye-line" onclick="openNote(${index})"></i>
  </div>
`;


    notesList.appendChild(card);
  });
}

createBtn.addEventListener("click", () => {
  if (!title.value.trim() || !desc.value.trim()) return alert("Please fill both fields");

  const note = {
    title: title.value,
    description: desc.value,
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })
  };

  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));

  title.value = "";
  desc.value = "";

  render();
});

function del(i) {
  notes.splice(i, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  render();
}

function edit(i) {
  localStorage.setItem("editIndex", i);
  window.location.href = "update.html";
}

function openNote(i) {
  localStorage.setItem("viewIndex", i);
  window.location.href = "view.html";
}

render();
