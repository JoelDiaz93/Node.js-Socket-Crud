import { saveNote, deleteNote, getNoteById, updateNote } from "./sockets.js";

const notesList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

let savedId = "";

const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2" style="background-color: #16324f">
  <div class="d-flex justify-content-between">
      <h1 class="card-title h3" style="color: #e9e3e6">${note.title}</h1>
      <div>
          <button class="btn btn-danger delete" style="background-color: #16324f" data-id="${note._id}">Delete</button>
          <button class="btn btn-primary update" style="background-color: #16324f" data-id="${note._id}">Update</button>
      </div>
  </div>
  <p style="color: #e8f1f2">${note.description}</p>
</div>
    `;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");
  btnDelete.addEventListener("click", (e) => deleteNote(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", (e) => getNoteById(btnUpdate.dataset.id));

  return div;
};

export const renderNotes = (notes) => {
  notesList.innerHTML = "";
  notes.forEach((note) => notesList.append(noteUI(note)));
};

export const fillForm = (note) => {
  title.value = note.title;
  description.value = note.description;
  savedId = note._id;
};

export const onHandleSubmit = (e) => {
  e.preventDefault();
  if (savedId) {
    updateNote(savedId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }
  savedId = "";
  title.value = "";
  description.value = "";
};

export const appendNote = (note) => {
  notesList.append(noteUI(note));
};
