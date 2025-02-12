let dataSet = [];
let database = JSON.parse(localStorage.getItem("userinfo")) || [];

const nameCheck = database.filter((item) => item.email === userinfo);
console.log(nameCheck);
const wel = document.querySelector(".welcome");
if (nameCheck) {
  wel.innerHTML = `${nameCheck[0].name}`;
} else {
  wel.innerHTML = `error`;
}
