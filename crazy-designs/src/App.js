import "./App.css";
import ViewDetail from "./component/mainPage/ViewDetail.tsx";
import Main from "./component/mainPage/Main.tsx";
import { BrowserRouter, Route, Routes ,Navigate} from "react-router-dom";
import { urlConstants } from "./model/Constant.ts";
import React from "react";

function App() {
  debugger
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={urlConstants.baseUrl} />}
        ></Route>
        <Route key={1} path={urlConstants.baseUrl} element={<Main />} />
        <Route key={2} path={urlConstants.detailPageUrl} element={<ViewDetail />} />
        <Route key={3} path={urlConstants.home} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
