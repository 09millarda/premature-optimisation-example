import React, { PureComponent } from 'react';
import './App.css';
import endpoint from './endpoint';
import EmployeeWidget from './EmployeeWidget';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      employeeWidgets: [],
      isFetchingFull: false,
      isFetchingEmployees: false
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://das.nh.gov/EmployeePortal/graphics/employees-app-icon.png" alt="Banner logo" />
          <button className="btn btn-fetch" onClick={this.fetchEmployees}>Fetch Employees</button>
          <button className="btn btn-fetch-all" onClick={this.fetchAllEmployees}>Fetch All Employees</button>
          <button className="btn btn-reset" onClick={this.resetEmployees}>Reset</button>
        </header>
        <div className="container">
          <div className="employees-container">
            {
              this.state.isFetchingEmployees &&
              <p>Loading...</p>
            }
            {this.state.employeeWidgets}
          </div>
        </div>
      </div>
    );
  }

  resetEmployees = () => {
    this.setState({
      employeeWidgets: [],
      isFetchingFull: false,
      isFetchingEmployees: false
    });
  }

  fetchEmployees = async () => {
    this.setState({
      employeeWidgets: [],
      isFetchingFull: false,
      isFetchingEmployees: true
    });

    const res = await fetch(`${endpoint}/employees`);
    const employees = await res.json();

    const employeeWidgets = employees.map((e, i) => <EmployeeWidget key={i} forename={e.forename} surname={e.surname} job={e.job} employeeId={e.id} />);

    this.setState({
      employeeWidgets,
      isFetchingEmployees: false
    });
  }

  fetchAllEmployees = async () => {
    this.setState({
      employeeWidgets: [],
      isFetchingFull: true,
      isFetchingEmployees: true
    });

    const res = await fetch(`${endpoint}/employees`);
    const employees = await res.json();

    const weeklyRes = await fetch(`${endpoint}/allHours/${employees.map(e => e.id).join(',')}`);
    const weeklySummaries = await weeklyRes.json();

    const employeeWidgets = weeklySummaries.map((e, i) => {
      const employee = employees.find(em => em.id === e.employeeId);

      return <EmployeeWidget key={i} forename={employee.forename} surname={employee.surname} job={employee.job} employeeId={employee.id} weeklySummary={e} />;
    });

    this.setState({
      isFetchingEmployees: false,
      employeeWidgets
    });
  }
}

export default App;
