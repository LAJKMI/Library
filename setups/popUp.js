const btn = document.querySelector(".action");
const btn1 = document.querySelector(".action1");
const text = document.getElementById("text");

// Load pages from local storage or initialize them
const pages = JSON.parse(localStorage.getItem("notebookPages")) || ["", "", "", "",""];
let currentPage = 0;

// Initialize the first page
text.value = pages[currentPage];

// Save pages to local storage
function saveToLocalStorage() {
  localStorage.setItem("notebookPages", JSON.stringify(pages));
}


btn.addEventListener("click", () => {
    pages[currentPage] = text.value;
    saveToLocalStorage();
    currentPage = (currentPage + 1) % pages.length;
    text.value = pages[currentPage];
});

btn1.addEventListener("click", () => {
    pages[currentPage] = text.value;
    saveToLocalStorage();
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    text.value = pages[currentPage];
});
