import './App.css'

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home"

function App() {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <Home />
      </div>

      <Footer />
    </div>
  );
}

export default App;
