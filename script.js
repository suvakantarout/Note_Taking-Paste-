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
      <i class="ri-eye-line" onclick="openNote(${index})"></i>
        <i class="ri-file-copy-line" onclick="copyNote(${index})"></i>
        <i class="ri-pencil-line" onclick="edit(${index})"></i>
        <i class="ri-delete-bin-line" onclick="del(${index})"></i>
      </div>
    `;

    notesList.appendChild(card);
  });
}

// CREATE NOTE
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

// DELETE NOTE
function del(i) {
  notes.splice(i, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  render();
}

// EDIT NOTE
function edit(i) {
  localStorage.setItem("editIndex", i);
  window.location.href = "update.html";
}

// VIEW NOTE
function openNote(i) {
  localStorage.setItem("viewIndex", i);
  window.location.href = "view.html";
}

// ✅ COPY NOTE DESCRIPTION
function copyNote(i) {
  const note = notes[i];
  if (!note) {
    alert("Note not found.");
    return;
  }

  const text = note.description || "";

  // Use Clipboard API when available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Description copied to clipboard!");
      })
      .catch(() => {
        // fallback if Clipboard API fails
        fallbackCopy(text);
      });
  } else {
    // fallback for older browsers or insecure contexts
    fallbackCopy(text);
  }
}

/* Simple fallback using a hidden textarea */
function fallbackCopy(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    // keep it off-screen
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);

    if (ok) {
      alert("Description copied to clipboard!");
    } else {
      alert("Copy failed. Please select and copy manually.");
    }
  } catch (err) {
    alert("Copy failed. Please select and copy manually.");
  }
}

render();
