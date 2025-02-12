let database = JSON.parse(localStorage.getItem("userinfo")) || [];
let key1 = document.querySelector(".key");
const pwcheck = () => {
  let id = document.querySelector(".name").value;
  let key = database.filter((item) => item.email === id);
  if (key.length >= 1) {
    console.log(key);
    key1.innerHTML = `비밀번호는 ${key[0].pw} 입니다`;
  } else {
    key1.innerHTML = `아이디가 존재하지 않습니다`;
  }
};
