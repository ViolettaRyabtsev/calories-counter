import React from "react";
import "./App";
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.tableResult, "here ");
    return (
      <>
        <div className="table-content">
          <table>
            <tr className="top-table">
              <th>TYPE</th>
              <th>WEIGHT</th>
              <th>CALORIES</th>
            </tr>
            {this.props.tableResult.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.gram}</td>
                <td>{item.cal}</td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  }
}

export default Table;
