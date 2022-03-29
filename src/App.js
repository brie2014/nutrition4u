import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NutritionNav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import AllFoods from "./components/AllFoods";
import MyFoods from "./components/MyFoods";
import FoodDetails from "./components/FoodDetail";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import axios from "axios";

export default function App() {
  const [state, setState] = useState({
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  });
  console.log(state);

  const logoutHandler = () => {
    setState({
      ...state,
      isAuth: false,
      token: null,
      userId: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };
  const loginHandler = (e, email, password) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.data;
      })
      .then((resData) => {
        console.log(resData);
        setState({
          ...state,
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId,
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signupHandler = (event, name, email, password) => {
    event.preventDefault();
    setState({
      authLoading: true,
    });
    axios
      .put(
        "http://localhost:8080/auth/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res;
      })
      .then((resData) => {
        setState({
          isAuth: false,
          authLoading: false,
        });
        window.location = "/login";
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiryDate");
  const userId = localStorage.getItem("userId");
  const remainingMilliseconds =
    new Date(expiryDate).getTime() - new Date().getTime();
  useEffect(() => {
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    if (token) {
      setState({
        isAuth: true,
        token: token,
        userId: userId,
      });
      setAutoLogout(remainingMilliseconds);
    }
  }, [token]);

  return (
    <Router>
      <NutritionNav isAuth={state.isAuth} onLogout={logoutHandler} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            state.isAuth ? <AllFoods /> : <Login onLogin={loginHandler} />
          }
        />
        <Route exact path="/food/:foodId" element={<FoodDetails />} />
        <Route exact path="/login" element={<Login onLogin={loginHandler} />} />
        <Route
          exact
          path="/sign-up"
          element={<SignUp onSignup={signupHandler} />}
        />
        <Route
          exact
          path="/my-foods"
          element={
            state.isAuth ? (
              <MyFoods userId={userId} />
            ) : (
              <Login onLogin={loginHandler} />
            )
          }
        />
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </Router>
  );
}
