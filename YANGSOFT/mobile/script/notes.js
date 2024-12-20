const editableBox = document.getElementById("editable-box");

// Load saved content from localStorage when the page loads
window.addEventListener("load", () => {
  const savedContent = localStorage.getItem("notesContent");
  if (savedContent) {
    editableBox.innerHTML = savedContent;
  }
});

// Save content to localStorage whenever it changes
editableBox.addEventListener("input", () => {
  localStorage.setItem("notesContent", editableBox.innerHTML);
});

window.addEventListener("load", () => {
      // Move cursor to the end
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(editableBox);
  range.collapse(false); // Collapse the range to the end
  selection.removeAllRanges();
  selection.addRange(range);
});