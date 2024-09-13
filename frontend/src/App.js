import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"

import './App.css'
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Employees from "./components/employees/Employee";
import Tips from "./components/tips/Tips";
import Dashboard from "./components/dashboard/Dashboard"
import Events from "./components/event/Event"
import Clothes from "./components/clothes/Clothes"
import Compatibility from "./components/compatibility/Compatibility"
import Customers from "./components/customers/Customers"
import CustomerPage from "./components/customers/CustomerPage"
import ProfilePage from "./components/user/ProfilePage"
import CoachPage from "./components/employees/CoachPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />

        <Header />

        <div className="pages">
          <Routes>

          <Route path="/" element={
            <PrivateRoute>*
              <Dashboard />
            </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
            }
          />

          <Route path="/tips" element={
            <PrivateRoute>
              <Tips />
            </PrivateRoute>
            }
          />

          <Route path="/events" element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
            }
          />

          <Route path="/clothes" element={
            <PrivateRoute>
              <Clothes />
            </PrivateRoute>
            }
          />

          <Route path="/employees" element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
            }
          />

          <Route path="/compatibility" element={
            <PrivateRoute>
              <Compatibility />
            </PrivateRoute>
            }
          />

          <Route path="/customers" element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
            }
          />

          <Route path="/customers/:id" element={
            <PrivateRoute>
            <CustomerPage />
            </PrivateRoute>
            }
            />

          <Route path="/employees/me" element={
            <PrivateRoute>
            <ProfilePage />
            </PrivateRoute>
            }
            />

            <Route path="/employees/:id" element={
              <PrivateRoute>
                <CoachPage />
              </PrivateRoute>
            }
            />

          {/*
          <Route path="/employees/login" element={ } />
          <Route path="/employees/me" element={ } />
          <Route path="/employees/:id" element={ } />
          <Route path="/employees/:id/image" element={ } />
          <Route path="/customers/:id" element={ } />
          <Route path="/customers/:id/image" element={ } />
          <Route path="/customers/:id/payments_history" element={ } />
          <Route path="/customers/:id/clothes" element={ } />
          <Route path="/encounters" element={ } />
          <Route path="/encounters/:id" element={ } />
          <Route path="/encounters/customers/:id" element={ } />
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
