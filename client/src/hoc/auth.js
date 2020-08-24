import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

export default function(SpecificComponent, option, adminRoute = null) {
  // option:
  // null - 아무나 접근 가능한
  // true - 로그인한 유저만
  // false - 로그인한 유저는 출입 불가능
  const dispatch = useDispatch();

  function AuthenticationCheck(props) {
    useEffect(() => {
      dispatch(auth()).then(response => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return withRouter(AuthenticationCheck);
}
