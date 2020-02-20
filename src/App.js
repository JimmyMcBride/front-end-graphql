import React from "react";

// Set up all routes in App
import { Route } from "react-router-dom";

// Using AppWrapper to set font and background for the app
import { AppWrapper } from "bushido-strap";

import { useSelector } from "react-redux";

// Importing all routes
import PrivateRoute from "./components/PrivateRoute";
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";
import Dashboard from "./views/Dashboard";
import Posts from "./views/Posts";
import PostID from "./views/PostID";
import AddPost from "./views/AddPost";

import Loading from "./components/Loading";

// Using Web Font Loader for google fonts
import WebFont from "webfontloader";

// setting our font variables
const h_font = "Comfortaa";
const r_font = "Montserrat";

// using WebFont to easily access Google fonts
WebFont.load({
  google: {
    families: [h_font, r_font]
  }
});

const App = () => {
  // If user is logged in on login page redirects them to protected route
  const loading = useSelector(state => state.firebase.isInitializing);

  if (loading) return <Loading />;
  return (
    <AppWrapper head_font={h_font} font={r_font}>
      <PrivateRoute exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute exact path="/posts" component={Posts} />
      <PrivateRoute path="/posts/:id" component={PostID} />
      <PrivateRoute path="/add_post" component={AddPost} />
    </AppWrapper>
  );
};

export default App;
