import "./App.css";
import MainPage from "./component/mainPage/MainPage.js";
import DetailsPage from "./component/mainPage/DetailsPage.js";
import DetailedFocusView from "./component/mainPage/DetailedFocusView.tsx";
import Main from "./component/mainPage/Main.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { urlConstants } from "./model/Constant.ts";

function App() {
  debugger
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={<Navigate to={urlConstants.baseUrl} />}
        ></Route> */}
        <Route key={1} path={urlConstants.baseUrl} element={<MainPage />} />
        <Route key={2} path={urlConstants.detailPageUrl} element={<DetailsPage />} />
        <Route key={3} path={urlConstants.detailedFocusView} element={<DetailedFocusView />} />
        <Route key={3} path={urlConstants.home} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
