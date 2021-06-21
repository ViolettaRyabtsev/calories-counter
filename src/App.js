import "./App.css";
import React from "react";
import SearchBar from "./SearchBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.state.calories);
    return (
      <div className="App">
        <div className="header">
          <h3>DIET and WEIGHT MANAGEMENT</h3>
          <h1>FOOD COLCULATOR</h1>
        </div>
        <SearchBar />
      </div>
    );
  }
}

export default App;
