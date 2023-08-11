import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { HomePage, SuksesPage } from "./pages";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sukses" element={<SuksesPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
export default App;