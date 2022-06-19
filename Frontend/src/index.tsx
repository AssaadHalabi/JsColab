import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {createStoreAndPersistor} from "./state";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotebookPage } from "./pages/Notebook";
import { Navbar } from "./components/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import Dashboard from "./components/auth/Dashboard";
import { Notebooks } from "./pages/Notebooks";
import { CreateNotebook } from "./pages/CreateNotebook";
import { PersistGate } from "redux-persist/integration/react";


const App = () => {
  const {store, persistor} = createStoreAndPersistor()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:referrer" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register/:referrer" element={<Register />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/notebook/:notebook_id" element={<NotebookPage />} />
          <Route path="/createNotebook" element={<CreateNotebook />} />
          <Route path="/notebooks" element={<Notebooks />} />
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
