import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<HomePage />} />
      <Route path="/experience" element={<HomePage />} />
      <Route path="/projects" element={<HomePage />} />
      <Route path="/skills" element={<HomePage />} />
      <Route path="/contact" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
