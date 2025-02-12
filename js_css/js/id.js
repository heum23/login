let database = JSON.parse(localStorage.getItem("userinfo")) || [];

const btn = () => {
  let div = document.querySelector(".key");
  let first = document.querySelector(".firstNum").value;
  let second = document.querySelector(".secondNum").value;
  let third = document.querySelector(".thirdNum").value;
  div.innerHTML = "";
  const checkpw = database.filter(
    (item) =>
      Number(item.firstNum) === Number(first) &&
      Number(item.secondNum) === Number(second) &&
      Number(item.thirdNum) === Number(third)
  );
  console.log(checkpw);
  if (checkpw.length >= 1) {
    div.innerHTML = `아이디는 ${checkpw[0].email} 입니다`;
  } else {
    div.innerHTML = `입력하신 전화번호로 가입된 아이디가 없습니다.`;
  }
};
