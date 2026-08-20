import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Text from "./components/Text/Text";
import Login from "./pages/Login";
import ForgetPassword from "./pages/Forgetpassword";

function App() {
  return (
    <div>
      <Text variant="title">VAYZO Admin</Text>
      <Text variant="body">Welcome to VAYZO</Text>
      <Text variant="caption">This is a test</Text>
    </div>
  );
}

export default App;