import ManageFiles from "./components/ux/main";
import PostProcessTable from "./components/ux/post-process";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManageFiles />} />
        <Route path="/:id" element={<PostProcessTable />} />
      </Routes>
    </Router>
  );
}

export default App;
