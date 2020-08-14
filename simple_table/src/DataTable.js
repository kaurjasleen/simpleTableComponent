import React, { Component } from "react";
import "./DataTable.css";
import { table } from "bootstrap-table";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { GoStar } from "react-icons/go";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      pageIndex: 0,
      students: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/students")
      .then((res) => {
        console.log(res, "hello this is response");
        return res.json();
      })
      .then((data) => {
        this.setState({ students: data.students, origStudents: data.students });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePrevPageClick(event) {
    this.setState((prevState) => ({
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  }

  handleNextPageClick(event) {
    this.setState((prevState) => ({
      pageIndex:
        prevState.pageIndex <
        Math.floor(prevState.students.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  }

  setPS10(event) {
    this.setState({ pageSize: 10 });
  }
  setPS20(event) {
    this.setState({ pageSize: 20 });
  }
  setPS30(event) {
    this.setState({ pageSize: 30 });
  }

  sortStudents(event, key) {
      const students = this.state.students;
      students.sort((a, b) =>
         a[key].localeCompare(b[key]));
         this.setState({students});
 };

  printStars(amount) {
    var stars = [];
    var i;
    for (i = 0; i < amount; i++) {
      stars.push(<GoStar key={i} />);
    }
    return stars;
  }

  render() {
    return (
      <div className="body">
        <DropdownButton
          id="dropdown-basic-button"
          title="Choose Number of Items"
        >
          <Dropdown.Item onClick={(event) => this.setPS10(event)}>
            10
          </Dropdown.Item>
          <Dropdown.Item onClick={(event) => this.setPS20(event)}>
            20
          </Dropdown.Item>
          <Dropdown.Item onClick={(event) => this.setPS30(event)}>
            30
          </Dropdown.Item>
        </DropdownButton>

        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={(event) => this.handlePrevPageClick(event)}
        >
          Prev
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={(event) => this.handleNextPageClick(event)}
        >
          Next
        </button>

        <button
          type="button"
          class="btn btn-primary sortBtn"
          onClick={(event) => this.sortStudents(event, 'name')}
        >
          Alphabetize
        </button>

        <table class="table border">
          <thead>
            <tr>
              <th>Behavior</th>
              <th>Student Name</th>
              <th>Gender</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students
              .slice(
                this.state.pageIndex * this.state.pageSize,
                this.state.pageIndex * this.state.pageSize + this.state.pageSize
              )
              .map((student, index) => {
                return (
                  <tr key={student.id}>
                    <td>
                      <span>{this.printStars(student.star)}</span>
                    </td>
                    <td>{student.name}</td>
                    <td>{student.gender}</td>
                    <td>{student.letterGrade}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
