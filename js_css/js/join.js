let name1 = document.querySelector(".name").value;
let nameDiv = document.querySelector(".nameDiv");
let database = JSON.parse(localStorage.getItem("userinfo")) || [];
const onkey = () => {
  name1 = document.querySelector(".name").value;
};
let open5 = false;
const idCheck = () => {
  check = database.filter((item) => String(item.email) === String(name1));
  if ((check.length < 1) & (name1.length > 1)) {
    nameDiv.innerHTML = `<div>사용가능한 이메일입니다.</div>`;
    open5 = true;
  } else {
    nameDiv.innerHTML = `<div>중복된 이메일입니다.</div>`;
    open5 = false;
  }

  numCheck();
};
let btn4 = document.querySelector(".btn4");
const numCheck = () => {
  let pw = document.querySelector(".pw").value;
  let pwCheck = document.querySelector(".psCheck").value;
  let first = document.querySelector(".firstNum").value;
  let second = document.querySelector(".secondNum").value;
  let third = document.querySelector(".thirdNum").value;

  let open1 = false,
    open2 = false,
    open3 = false;
  open4 = false;
  if (pw === pwCheck && pwCheck.length > 1) {
    open4 = true;
  }
  if (first.length === 3) {
    open1 = true;
  }
  if (second.length === 4) {
    open2 = true;
  }
  if (third.length === 4) {
    open3 = true;
  }

  const btn = document.querySelector("#btn");

  if (open1 && open2 && open3 && open4 && open5) {
    btn.removeAttribute("disabled");
    btn.classList.remove("btn");
    btn.classList.add("btn2");
  } else {
    btn.setAttribute("disabled", true);
    btn.classList.add("btn");
    btn.classList.remove("btn2");
  }
  document.querySelector(".firstNum").addEventListener("keyup", numCheck);
  document.querySelector(".secondNum").addEventListener("keyup", numCheck);
  document.querySelector(".thirdNum").addEventListener("keyup", numCheck);
  document.querySelector(".psCheck").addEventListener("keyup", numCheck);
  document.querySelector(".btn4").addEventListener("click", numCheck);
};

// 연도 추가 (현재 연도부터 100년 전까지)
const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= currentYear - 100; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}

// 월 추가 (1~12월)
const monthSelect = document.getElementById("month");
for (let i = 1; i <= 12; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  monthSelect.appendChild(option);
}

// 일 추가 (1~31일, 월에 따라 조정)
const daySelect = document.getElementById("day");
function updateDays() {
  daySelect.innerHTML = ""; // 기존 옵션 초기화
  let selectedYear = parseInt(yearSelect.value);
  let selectedMonth = parseInt(monthSelect.value);
  let daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate(); // 해당 월의 마지막 날짜

  for (let i = 1; i <= daysInMonth; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }
}

// 월 변경 시 일 업데이트
monthSelect.addEventListener("change", updateDays);
yearSelect.addEventListener("change", updateDays);

// 초기 실행
updateDays();
