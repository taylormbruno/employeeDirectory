import React from "react";
import "./style.css";
import Container from "../Container";
import employees from "../../utils/employees";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class Table extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            search: "",
            employees: employees,
            results: [],
            error: ""
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ 
            ...this.state,
            search: event.target.value 
        }, () => {
            const searchEmp = API.getSearch(this.state.search);
            console.log("---searchEmp---", searchEmp);
            if (searchEmp === ["no results"]) {
                this.setState({ 
                    ...this.state,
                    employees: employees 
                });
                console.log("---this.state.employees---", this.state.employees, "---this.state.search---", this.state.search);
            }
            else {
                this.setState({ 
                    ...this.state,
                    employees: searchEmp 
                }, () => console.log("---this.state.employees---", this.state.employees, "---this.state.search---", this.state.search));
            }
        }); 

        
    };

    renderTableData() {
        return this.state.employees.map(employee => (
            <tr key={employee.id}>
                <td><img src={employee.image} alt={employee.name} className="emplImage" /></td>
                <td>{employee.name}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>{employee.dateOfBirth}</td>
            </tr>
        ));
    }

    render() {
        return(
            <Container>
                <div className="input-group">
                    <input type="text" className="form-control searchBar" placeholder="Search" onChange={this.handleChange} /> 
                    <button type="button" className="btn btn-warning" id="refresh">
                        <Link to="" refresh="true">
                            <i className="fas fa-sync" />
                        </Link>
                    </button>
                </div>
                <table className="table">
                    <thead key="thead">
                        <tr key="theadTR">
                            <th>Image</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody key="tbody">
                        { this.renderTableData() }
                    </tbody>
                </table>
            </Container>
        );
    }
}

export default Table;