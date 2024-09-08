import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home"
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Employees from "./components/employees/Employee";
import Compatibility from "./components/compatibility/Compatibility";
import Statistics from "./components/statistics/Statistic";
import Tips from "./components/tips/Tips";
import Events from "./components/event/Event";
import Clothes from "./components/clothes/Clothes";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container">
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/events" element={<Events />} />
          <Route path="/clothes" element={<Clothes />} />
          {/* TODO: En réalité pour toutes les routes "protected" (besoin de s'authentifier)
          il faudra faire comme ça : */}
          {/* <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
              }
            /> */}

            {/* TODO : du coup pour toutes les routes en dessous faut aussi les mettre en protected */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/compatibility" element={<Compatibility />} />
          {/*
          <Route path="/employees/login" element={ } />
          <Route path="/employees/me" element={ } />
          <Route path="/employees/:id" element={ } />
          <Route path="/employees/:id/image" element={ } />
          <Route path="/customers" element={ } />
          <Route path="/customers/:id" element={ } />
          <Route path="/customers/:id/image" element={ } />
          <Route path="/customers/:id/payments_history" element={ } />
          <Route path="/customers/:id/clothes" element={ } />
          <Route path="/encounters" element={ } />
          <Route path="/encounters/:id" element={ } />
          <Route path="/encounters/customers/:id" element={ } />
          <Route path="/tips" element={ } />
          <Route path="/events" element={ } />
          <Route path="/events/:id" element={ } />
          <Route path="/clothes" element={ } />
          <Route path="/clothes/:id/image" element={ } /> */}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
