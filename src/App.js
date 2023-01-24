import "./App.css";
// import { GLobalProvider } from "./context/GlobalProvider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./widget/LandingPage";
import Homepage from "./pages/Homepage/Home";
import JobVacancy from "./pages/JobVacancy/JobVacancy";
import LoginPage from "./pages/Loginpage/LoginPage";
import Registration from "./pages/Loginpage/Registration";
import Admin from "./widget/Admin";
import JobVacancyTable from "./pages/Adminpage/JobVacancyTable";
import InputJobVacancy from "./pages/Adminpage/InputJobVacancy";
import DashboardPage from "./pages/Adminpage/DashboardPage";
import Cookies from "js-cookie";
import JobVacancyDetail from "./pages/JobVacancy/JobVacancyDetail";
import ChangePassword from "./pages/Adminpage/ChangePassword";
import { GlobalProvider } from "./context/GlobalProvider";
function App() {
  const LoginRoute = (props) => {
    if (Cookies.get("token") !== undefined) {
      return props.children;
    } else if (Cookies.get("token") === undefined) {
      return <Navigate to={"/"} />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage>
                  <Homepage />
                </LandingPage>
              }
            />

            <Route
              path="/JobVacancy"
              element={
                <LandingPage>
                  <JobVacancy />
                </LandingPage>
              }
            />

            <Route
              path="/JobVacancy/:Id"
              element={
                <LandingPage>
                  <JobVacancyDetail />
                </LandingPage>
              }
            />

            <Route
              path="/Login"
              element={
                <LandingPage>
                  <LoginPage />
                </LandingPage>
              }
            />

            <Route
              path="/Registration"
              element={
                <LandingPage>
                  <Registration />
                </LandingPage>
              }
            />

            <Route
              path="/Dashboard/"
              element={
                <LoginRoute>
                  <Admin>
                    <DashboardPage />
                  </Admin>
                </LoginRoute>
              }
            />
            <Route
              path="/Dashboard/JobVacancy"
              element={
                <LoginRoute>
                  <Admin>
                    <JobVacancyTable />
                  </Admin>
                </LoginRoute>
              }
            />
            <Route
              path="/Dashboard/JobVacancy/Form"
              element={
                <LoginRoute>
                  <Admin>
                    <InputJobVacancy />
                  </Admin>
                </LoginRoute>
              }
            />
            <Route
              path="/Dashboard/JobVacancy/Form/:idData"
              element={
                <LoginRoute>
                  <Admin>
                    <InputJobVacancy />
                  </Admin>
                </LoginRoute>
              }
            />

            <Route
              path="/Dashboard/JobVacancy/ChangePassword"
              element={
                <LoginRoute>
                  <Admin>
                    <ChangePassword />
                  </Admin>
                </LoginRoute>
              }
            />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
