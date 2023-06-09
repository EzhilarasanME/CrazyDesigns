import "./App.css";
import ViewDetail from "./component/mainPage/ViewDetail.tsx";
import Paypal from "./component/mainPage/Paypal.jsx";
import Main from "./component/mainPage/Main.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { urlConstants } from "./model/Constant.ts";
import React from "react";
import TemplateProvider from './shared/customProvider/TemplateProvider';

function App() {
  return (
    <TemplateProvider>
      <BrowserRouter>
        <Routes>
          <Route
            key={4}
            path="/"
            element={<Navigate to={urlConstants.baseUrl} />}
          ></Route>
          <Route key={1} path={urlConstants.baseUrl} element={<Main />} />
          <Route
            key={2}
            path={urlConstants.detailPageUrl}
            element={<ViewDetail />}
          />
          <Route key={3} path={urlConstants.Paypal} element={<Paypal />} />
        </Routes>
      </BrowserRouter>
    </TemplateProvider>
  );
}

export default App;
