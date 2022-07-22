import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import isLogin1 from "./isLogin1";


export default function AuthRoute({ version, component: Component, ...rest }) {
  if (version === 1) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isLogin1() ? <Component {...props} /> : <Link to="/login" />
        }
      />
    );
  } 
//   else if (version === 2) {
//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           isLogin2() ? <Component {...props} /> : <Redirect to="/stafflogin" />
//         }
//       />
//     );
//   }
}