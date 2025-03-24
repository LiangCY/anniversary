import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Workbox } from "workbox-window";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./index.css";

import AnniversaryList from "./AnniversaryList";
import AnniversaryDetail from "./AnniversaryDetail";

dayjs.locale("zh-cn");

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

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/anniversary/sw.js");
  wb.register()
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
