// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// //
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PageRouter from "./Router.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PageRouter />
  </StrictMode>
);
