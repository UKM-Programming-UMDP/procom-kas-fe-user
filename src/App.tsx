import HomepageLayout from "@pages/Homepage/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100vh]">
        <Routes>
          <Route path="/" element={<HomepageLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
