import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"
import Editor from "./Editor.tsx"
import Timer from "./Timer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
)
