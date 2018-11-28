import React, { PureComponent } from 'react';
import WithLoading from './LoadingHOC';
import WorkGraph from './WorkGraph';
import endpoint from './endpoint';

const WorkGraphWithLoading = WithLoading(WorkGraph);

class EmployeeWidget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingHours: true,
      weeklySummary: {}
    };
  }

  async componentDidMount() {
    if (this.props.weeklySummary == null) {
      const res = await fetch(`${endpoint}/hours/${this.props.employeeId}`);
      const weeklySummary = await res.json();

      this.setState({
        isLoadingHours: false,
        weeklySummary
      });
    } else {      
      this.setState({
        isLoadingHours: false,
        weeklySummary: this.props.weeklySummary
      });
    }
  }

  render() {
    return (
      <div className="widget-container">
        <h4 className="employee-name">{this.props.forename} {this.props.surname}</h4>
        <p className="employee-job"><i>{this.props.job}</i></p>
        <WorkGraphWithLoading isLoading={this.state.isLoadingHours} dailyHours={this.state.weeklySummary.dailyHours} />
      </div>
    );
  }
}

export default EmployeeWidget;