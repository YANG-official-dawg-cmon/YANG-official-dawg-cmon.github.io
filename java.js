function clearForm() { 
let firstName = document.getElementById('first-name')
let lookinFor = document.getElementById('lookin-for')
 var x = document.getElementById("thanks");
 if (firstName.value !== "" && lookinFor.value !== "") {
  x.style.display = "block";
  setTimeout(clearForm2, 5)
  } else {
  x.style.display = "none";
  }
}

function clearForm2(){
  let firstName = document.getElementById('first-name')
  let lookinFor = document.getElementById('lookin-for')
  firstName.value = ""
  lookinFor.value = ""
}