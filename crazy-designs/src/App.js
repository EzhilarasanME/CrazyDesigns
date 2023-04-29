import "./App.css";
import MainPage from "./component/mainPage/MainPage.js";
import DetailsPage from "./component/mainPage/DetailsPage.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { urlConstants } from "./model/Constant.ts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={urlConstants.baseUrl} />}
        ></Route>
        <Route path={urlConstants.baseUrl} element={<MainPage />} />
        <Route path={urlConstants.detailPageUrl} element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
