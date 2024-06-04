import "./App.css";
import Login from "./components/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Color from "./components/Color";
import ReqiureAuth from "./components/RequireAuth";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ReqiureAuth />}>
          <Route path="color" element={<Color />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
