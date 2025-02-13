const { default: axios } = require("axios");

let database = JSON.parse(localStorage.getItem("userinfo")) || [];
axios({
  url:"/userinfo",
  
})
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

const submitForm = (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  const form = document.getElementById("formData");
  const formData = new FormData(form);

  const params = {};
  formData.forEach((value, key) => {
    params[key] = value;
  });
  console.log(params);
  axios({
    method: "post",
    url: "/getLocal",
    data: database,
  }).then((res) => {});
  let login = document.forms["login"];
  let email = login.elements.email.value;
  let pw = login.elements.pw.value;
  axios({
    method: "post",
    data: { pw, email },
    url: "/getLog",
  })
    .then((response) => {
      // 서버에서 받은 응답 값으로 title을 설정
      const title = response.data.title;
      if (title === "로그인 성공") {
        document.querySelector(".text").innerText = title;
        window.location.href = `/login1?id=${email}`;
      } else {
        document.querySelector(".text").innerText = title;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
