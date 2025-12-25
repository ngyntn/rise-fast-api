import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./assets/styles/Global";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./components/pages/home/Home";

const App = () => {

  return (
    <>
      <GlobalStyles />
      <div className="app">
        <Routes>
          {/* Apply MainLayout */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} /> 
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>

          {/* Not layout applied */}
          <Route path="*" element={<div>Page Error Not Found</div>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
