import React from "react";
import "./App.css";
import Modal from "react-modal";
import ModalPopUp from "./Modal";
import Table from "./Table";
import { AiOutlineClose } from "react-icons/ai";
import Statistic from "./Statistic";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  content: {
    position: "absolute",
    top: "150px",
    left: "400px",
    right: "400px",
    bottom: "300px",
    border: "1px solid #ccc 0.8",
    background: "white",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    backgroundColor: "white",
    opacity: 0.9,
  },
};

const YOUR_APP_ID = "1822cb4f";
const YOUR_APP_KEY = "c86d2692b0f8b1ec8e54686f75bab2df";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "small",
      type: "",
      calories: [],
      openModal: false,
      gramms: [],
      addResultTable: [],
    };
  }

  closeModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  handleAddClick = (calories, weight) => {
    console.log("inside search bar: ", calories, weight);
    const res = {
      cal: calories,
      gram: weight,
      name: this.state.type,
    };

    this.setState({
      addResultTable: this.state.addResultTable.concat([res]),
    });
  };

  getCalories = () => {
    let response = fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=1%20${
        this.state.size
      }%20${this.state.type.toLowerCase()}
      `
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "< data");
        const obj = {
          calories: data.calories,
          weight: data.totalWeight,
        };
        return obj;
      });
    return response;
  };

  handleChange = (event) => {
    console.log(event.target.value, "input");

    this.setState({
      type: event.target.value,
    });
  };

  handleClick = async () => {
    if (this.state.type) {
      var result = await this.getCalories();
      console.log(result);

      this.setState({
        type: this.state.type,
        calories: [result],
        openModal: !this.state.openModal,
      });
    }
  };

  saveStatistic = () => {
    this.setState({
      addResultTable: this.state.addResultTable,
    });
  };
  // componentWillUnmount = () => {};

  render() {
    console.log(this.state.addResultTable, "table results ");
    return (
      <div className="grid-containers">
        <div>
          <h2>reklama</h2>
        </div>
        <div className="search-bar" id="search">
          <input
            value={this.state.type}
            placeholder={"search food"}
            onChange={this.handleChange}
            className="input"
          />
          <button onClick={this.handleClick}> search </button>
          <Modal
            isOpen={this.state.openModal}
            style={customStyles}
            contentLabel="example"
            className="Modal-content"
          >
            <ModalPopUp
              createTable={this.handleAddClick}
              resultOfCalories={this.state.calories}
              name={this.state.type}
            />
            <AiOutlineClose
              onClick={this.closeModal}
              className="close-modal-button"
            />
          </Modal>
          <Table tableResult={this.state.addResultTable} />
          <button onClick={this.state.saveStatistic}>save my statistic</button>
        </div>
        <Statistic statisticArray={this.state.addResultTable} />
      </div>
    );
  }
}

export default SearchBar;
