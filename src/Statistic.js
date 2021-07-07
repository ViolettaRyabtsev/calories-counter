import React from "react";
import "./App.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
const serverUrl = "http://localhost:5000/addItem";

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calories: this.props.sum,
      data: new Date(),
      dayAndMonthDate: [],
    };
  }
  //send data to server
  // data and calories
  saveFoodItemToDatabase = async () => {
    console.log(
      { ...this.state, calories: this.props.sum },
      "result of statistic from save button with axios"
    );
    await axios
      .post(serverUrl, { ...this.state, calories: this.props.sum })

      .catch((err) => console.log("error : ", err));
  };

  // get
  OnChangeData = (date) => {
    this.setState({
      data: date,
    });
  };

  handleClick = (value, event) => {
    axios
      .get(serverUrl)
      .then(function (response) {
        console.log(
          response.data[response.data.length - 1].calories,
          "request-response from get saveStatistic"
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    const date2 = value;
    console.log(date2, " after click");
    const arr = [date2.getMonth() + 1, date2.getDate(), date2.getFullYear()];
    this.setState({
      dayAndMonthDate: arr,
    });
  };

  render() {
    console.log(this.state.data, "date from calendar");
    console.log(this.state.dayAndMonthDate, "date");

    return (
      <div className="calendar">
        <Calendar
          onChange={this.OnChangeData}
          value={this.state.data}
          onClickDay={this.handleClick}
        />
        <button onClick={this.saveFoodItemToDatabase}>post</button>

        <div className="statistic-table">
          TOTAL CALORIES FOR A DAY: {this.props.sum}
        </div>
      </div>
    );
  }
}

export default Statistic;
