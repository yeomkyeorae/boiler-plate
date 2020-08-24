import React, { useEffect } from "react";
import axios from "axios";
import { useDipatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function(SpecificComponent, option, adminRoute = null) {
  // option:
  // null - 아무나 접근 가능한
  // true - 로그인한 유저만
  // false - 로그인한 유저는 출입 불가능
  function AuthenticationCheck(props) {
    useEffect(() => {
      dispatch(auth()).then(response => {});
    }, []);
  }

  return AuthenticationCheck;
}
