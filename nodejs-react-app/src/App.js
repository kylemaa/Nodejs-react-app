import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "boostrap/css"
import Navbar from "./components/navbar"
import PrescriptionsList from "./components/prescriptions-list";
import EditPrescription from "./components/update-prescription";
import CreatePrescription from "./components/create-prescription";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={PrescriptionsList} />
      <Route path="/edit/:id" component={EditPrescription} />
      <Route path="/create" component={CreatePrescription} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
