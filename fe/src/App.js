import React, { useEffect } from "react";
// import axios from "axios";
// import { API_URL } from "./constants/API";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoggedInRoute,
  NonLoggedInRoute,
  AdminRoute,
  AdminNonLoggedRoute,
  HomePageUser,
  SuperAdminRoute,
} from "./helper/ProtectedRoute";

import { CheckLogin } from "./redux/actions/users";
import { CheckCart } from "./redux/actions/carts";
import { CheckAddress } from "./redux/actions/addressUser";
// PAGES //
import Home from "./pages/Landing/Home";
import Auth from "./pages/Auth";
import UserNavbar from "./components/Landing/UserNavbar";
import Footer from "./components/Landing/Footer";

import {
  routes,
  LoggedInRoute as LoggedIn,
  AdminRoute as isAdminRoute,
  SuperAdminRoute as isSuperAdminRoute,
} from "./helper/routes";

// import AdminRevenue from "./pages/AdminRevenue";

function App() {
  const userGlobal = useSelector((state) => state.users);
  const adminGlobal = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const userLocalStorage = localStorage.getItem("token_shutter");

  //KEEP LOGIN CHECKER
  const keepLogin = () => {
    if (userLocalStorage) {
      // Get User Login Action Reducer
      dispatch(CheckLogin(userLocalStorage));
      //GET CART Action Reducer
      dispatch(CheckCart(userLocalStorage));
      //GET ADDRESS Action Reducer
      dispatch(CheckAddress(userLocalStorage));
    }
  };

  useEffect(() => {
    // getArrival()
    keepLogin();
  }, []);

  return (
    <BrowserRouter>
      {adminGlobal.idRole ? null : <UserNavbar />}

      {routes.map(({ component, path }) => {
        return <Route component={component} path={path} />;
      })}

      <HomePageUser
        component={Home}
        path="/"
        isAdmin={adminGlobal.idRole}
        exact
      />
      <NonLoggedInRoute
        path="/authentication"
        component={Auth}
        isLogin={userGlobal.isLogin}
      />

      {LoggedIn.map(({ component, path, exact }) => {
        return (
          <LoggedInRoute
            component={component}
            path={path}
            exact={exact}
            isLogin={userGlobal.isLogin}
          />
        );
      })}

      {adminGlobal.idRole ? null : <Footer />}

      {/* ADMIN */}
      <AdminNonLoggedRoute
        path="/auth-admin"
        component={Auth}
        isLogin={adminGlobal.isLogin}
      />

      {isAdminRoute.map(({ component, path, exact }) => {
        return (
          <AdminRoute
            component={component}
            path={path}
            exact={exact}
            isAdmin={adminGlobal.idRole}
          />
        );
      })}

      {isSuperAdminRoute.map(({ component, path, exact }) => {
        return (
          <SuperAdminRoute
            component={component}
            path={path}
            exact={exact}
            isAdmin={adminGlobal.idRole}
          />
        );
      })}
    </BrowserRouter>
  );
}

export default App;
