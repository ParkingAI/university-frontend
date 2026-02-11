import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserAuthorization } from "./hooks/UserAuthorization.jsx";
import SecureRoute from "./hooks/SecureRoute.jsx";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CityParkingsPage from "./pages/CityParkingsPage.jsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserAuthorization>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/:city/:id/parkiralista/"
                element={<CityParkingsPage />}
              />

              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard/*"
                element={
                  <SecureRoute userLevel={"admin"} element={<Dashboard />} />
                }
              />
            </Routes>
          </UserAuthorization>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
