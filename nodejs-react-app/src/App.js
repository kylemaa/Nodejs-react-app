import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "boostrap/css"
import Navbar from "./components/navbar"
import ExercisesList from "./components/prescriptions-list";
import EditExercise from "./components/update-prescription";
import CreateExercise from "./components/create-prescription";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
