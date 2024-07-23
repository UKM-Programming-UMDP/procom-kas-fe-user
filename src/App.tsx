import Homepage from "@pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <div className="min-h-[100vh]">
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
