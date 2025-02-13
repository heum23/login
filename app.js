const express = require("express");
const multer = require("multer");
//path 선언
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    //원본 파일명에서 확장자 추출
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    //파일명에 타임스탭프와 확장자를 포함시켜서 저장
    cb(null, uniqueSuffix + ext); //timestamp + 확장자
  },
});
const upload = multer({ storage: storage });

const app = express();
const port = 3000;

//body-parser
// x-www.form-urlencoded 방식, 객체 형태로 결과가 나옴 {}
app.use(express.urlencoded({ extended: true }));
//json
app.use(express.json());
app.use(express.static(path.join(__dirname, "js_css")));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.set("views", "./views");

//로그인 화면
app.get("/", (req, res) => {
  res.render("practice", { title: "" });
});
let database = "";
app.post("/getLocal", (req, res) => {
  database = req.body;
});
app.post("/getLog", (req, res) => {
  const check = database.filter(
    (item) => item.email === req.body.email && item.pw === req.body.pw // 비밀번호가 일치하는지 확인
  );

  if (check.length < 1) {
    const emailCheck = database.filter((item) => item.email === req.body.email);
    if (emailCheck.length > 0) {
      res.json({ title: "이메일과 비밀번호를 한번 더 확인해주세요." });
      console.log("로그인 실패");
    } else {
      res.json({ title: "이메일이 존재하지 않습니다." });
    }
  } else {
    console.log("로그인 성공");
    res.json({ title: "로그인 성공" });
  }
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
app.get("/getData", (req, res) => {
  userinfo = req.query;
  res.send(userinfo);
  console.log("회원가입완료");
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

//practice
app.post("/upload", upload.array("files"), (req, res) => {
  if (req.files) {
    const fileName = [];
    req.files.map((item) => {
      console.log(item.filename);
      fileName.push(item.filename);
    });
    res.send({ url: fileName });
  } else {
    console.log("error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
