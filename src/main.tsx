import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import AnniversaryList from "./AnniversaryList";
import AnniversaryDetail from "./AnniversaryDetail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename="/anniversary">
      <Routes>
        <Route path="/" element={<AnniversaryList />} />
        <Route path="/anniversary-list" element={<AnniversaryList />} />
        <Route path="/anniversary-detail" element={<AnniversaryDetail />} />
        <Route path="/anniversary-detail/:id" element={<AnniversaryDetail />} />
      </Routes>
    </Router>
  </StrictMode>
);
