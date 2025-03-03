import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import NewGame from "./pages/NewGame";
import Market from "./pages/Market";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Main />} />
      <Route path="new" element={<NewGame />} />
      <Route path="market" element={<Market />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
