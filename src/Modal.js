import "./App.css";
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

class ModalPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gramms: [100],
      result: this.getSum(),
      calculateArr: [],
      showTable: false,
      tableResult: {
        calories: 0,
        weight: 0,
        name: "",
      },
    };
  }

  getSum = () => {
    const result = Math.floor(
      (this.props.resultOfCalories[0].calories /
        this.props.resultOfCalories[0].weight) *
        100
    );
    console.log(result, "result");
    return result;
  };

  calculateCalories = () => {
    const oneGramm = this.state.result / 100;
    console.log(" are we here ?");
    const res = Math.floor(oneGramm * this.state.gramms);
    this.setState({
      calculateArr: res,
      gramms: this.state.gramms,
    });
  };

  handleChageOfGramms = (e) => {
    this.setState({
      gramms: e.target.value,
    });
  };

  handleClickAdd = (props) => {
    this.props.createTable(
      this.state.calculateArr,
      this.state.gramms,
      this.state.name
    );

    // this.setState({
    //   showTable: true,
    //   tableResault: {
    //     calories: this.state.calculateArr,
    //     weight: this.state.gramms,
    //     name: this.prosp.name,
    //   },
    // });
  };

  render() {
    return (
      <>
        <h2>
          {this.state.result} calories in 100 gramms of {this.props.name}
        </h2>
        <div className="form-weight">
          SERVING SIZE:{" "}
          <input
            type="text"
            className="Quantity"
            onChange={this.handleChageOfGramms}
            placeholder={"how many did you eat?"}
          ></input>
          <button className="add-button" onClick={this.calculateCalories}>
            Calculate
          </button>
        </div>
        <div>
          <div className="calories-result">{this.state.calculateArr} </div>
          <button onClick={this.handleClickAdd}>ADD</button>
        </div>
      </>
    );
  }
}

export default ModalPopUp;
