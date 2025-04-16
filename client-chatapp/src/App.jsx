import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join.jsx";
import Chat from "./components/Chat/Chat.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Join />} /> {/*user joining the chat*/}
      <Route path="/chat" element={<Chat />} /> {/*user in the chat*/}
    </Routes>
  </Router>
);
export default App;
