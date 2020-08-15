const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt를 만들 때의 자릿수

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    maxlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre("save", function(next) {
  // 비밀번호를 암호화 시킨다
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}); // user 정보를 저장하기 전에 콜백을 실행하게

const User = mongoose.model("User", userSchema);

module.exports = {
  User
};
