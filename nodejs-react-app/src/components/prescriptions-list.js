import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Prescription = props => (
  <tr>
    <td>{props.prescription.username}</td>
    <td>{props.prescription.description}</td>
    <td>{props.prescription.duration}</td>
    <td>{props.prescription.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.prescription._id}>edit</Link> | <a href="#" onClick={() => { props.deletePrescription(props.prescription._id) }}>delete</a>
    </td>
  </tr>
)

export default class PrescriptionsList extends Component {
  constructor(props) {
    super(props);
    this.deletePrescription = this.deletePrescription.bind(this)

    this.state = {prescriptions: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/prescriptions/')
      .then(response => {
        this.setState({ prescriptions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePrescription(id) {
    axios.delete('http://localhost:5000/prescriptions/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      prescriptions: this.state.prescriptions.filter(el => el._id !== id)
    })
  }

  prescriptionList() {
    return this.state.prescriptions.map(currentprescription => {
      return <Prescription prescription={currentprescription} deletePrescription={this.deletePrescription} key={currentprescription._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Prescriptions</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.prescriptionList() }
          </tbody>
        </table>
      </div>
    )
  }
}