const express = require("express");
const app = express();
const port = 3000;

//body-parser
// x-www.form-urlencoded 방식, 객체 형태로 결과가 나옴 {}
app.use(express.urlencoded({ extended: true }));
//json
app.use(express.json());

//path 선언
const path = require("path");

app.use(express.static(path.join(__dirname, "js_css")));
app.set("view engine", "ejs");
app.set("views", "./views");

//로그인 화면
app.get("/", (req, res) => {
  res.render("main");
});

//로그인 성공시
app.get("/login1", (req, res) => {
  const email = req.query.id || ""; // URL에서 이메일 가져오기
  res.render("login", { userinfo: email });
});
//회원가입 페이지
//회원가입 성공시
app.get("/join", (req, res) => {
  res.render("join");
});

let userinfo = "";
app.post("/login", (req, res) => {
  userinfo = req.body; // userinfo에 데이터 저장
  //post 요청은 req.body
  res.render("main", { title: "환영합니다!", userinfo: req.body });
});

app.get("/userinfo", (req, res) => {
  // userinfo 사용
  res.json(userinfo); // 클라이언트에게 JSON 형식으로 응답
});

//id 찾기
app.get("/idFind", (req, res) => {
  res.render("id");
});

//pw 찾기
app.get("/pwFind", (req, res) => {
  res.render("pw");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
