import React from "react";
import "./App.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  sumOfWeight = () => {
    const arr = this.props.statisticArray;
    console.log(arr, "sum of arr");
    const cal = [];
    arr.forEach((obj) => {
      cal.push(obj.cal);
    });
    console.log(cal);
    return cal.reduce((a, b) => a + b, 0);
  };

  OnChangeData = (date) => {
    this.setState({
      date: this.state.date,
    });
  };
  render() {
    return (
      <div className="calendar">
        <Calendar onChange={this.OnChangeData} value={this.state.data} />

        <div className="statistic-table">
          TOTAL CALORIES FOR A DAY: {this.sumOfWeight()}
        </div>
      </div>
    );
  }
}

export default Statistic;
