let database = JSON.parse(localStorage.getItem("userinfo")) || [];
fetch("/userinfo")
  .then((response) => response.json()) // JSON 형식으로 응답 받기
  .then((userinfo) => {
    let userinfo1 = userinfo;
    let dataSet = JSON.parse(localStorage.getItem("userinfo")) || [];
    const emailCheck = dataSet.filter((item) => item.email === userinfo1.email);
    if (emailCheck.length < 1) {
      dataSet.push(userinfo1);
      localStorage.setItem("userinfo", JSON.stringify(dataSet));
    }
  })
  .catch((error) => console.error("Error:", error));

const check = () => {
  let email = document.querySelector(".email").value;
  let pw = document.querySelector(".pw").value;
  let text = document.querySelector(".text");
  const emailCheck = database.filter(
    (item) => item.email === email && item.pw === pw
  );
  if (emailCheck.length > 0) {
    window.location.href = `/login1?id=${email}`;
  } else {
    text.innerHTML = `이메일과 비밀번호가 틀렸습니다`;
  }
};
const join = () => {
  window.location.href = `/join`;
};
const idFind = () => {
  window.location.href = `/idFind`;
};
const pwFind = () => {
  window.location.href = `/pwFind`;
};
