const express = require("express");
const app = express();
const port = 3000;

const { User } = require("./models/User");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

// login
app.post("/login", (req, res) => {
  // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      });
    }
    // 2. 데이터베이스에 이메일이 있으면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "비밀번호 불일치" });
      }
      // 3. 비밀번호가 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {});
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
