import React from "react";
import "./style.css";
import Container from "../Container";
import employees from "../../utils/employees";
import API from "../../utils/API";

let order = false;

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

    sortName = async (event) => {
        event.preventDefault();
        const col = event.target.dataset.value;
        console.log("sorting by \n-----\n", col ,"\n--------\n ");
        // order = !order;
        if (order === false) {
            // order = "asc";
            const sorted = await [].concat(this.state.employees)
                .sort(function (a, b) {
                    let keyToSort;
                    let x;
                    let y;
                    switch (col) {
                        case "name": 
                            keyToSort = [a.name, b.name]; 
                            x = keyToSort[0].toLowerCase();
                            y = keyToSort[1].toLowerCase();
                            break;
                        case "email": 
                            keyToSort = [a.email, b.email]; 
                            x = keyToSort[0].toLowerCase();
                            y = keyToSort[1].toLowerCase();
                            break;
                        case "phone": 
                            keyToSort = [a.phone, b.phone]; 
                            x = keyToSort[0].toLowerCase();
                            y = keyToSort[1].toLowerCase();
                            break;
                        case "birth": 
                            keyToSort = [a.dateOfBirth, b.dateOfBirth]; 
                            x = keyToSort[0];
                            y = keyToSort[1];
                            break;
                        default: keyToSort = [a.name, b.name]; break;
                    }
                    
                    order =!order;
                    console.log(`${x} vs ${y}`);

                    switch (order) {
                        case true: 
                            if(x < y) return -1;
                            else if(x > y) return 1;
                            else return 0;
                        case false:
                            if(x < y) return -1;
                            else if(x > y) return 1;
                            else return 0;
                        default: 
                            if(x < y) return -1;
                            else if(x > y) return 1;
                            else return 0;
                    }
                    
                    
                }
            );
            console.log("---sorted---", sorted);
            this.setState({ 
                ...this.state,
                employees: sorted 
            });
        }
        // else if (order === "")
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
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead key="thead">
                            <tr key="theadTR">
                                <th>Image</th>
                                <th>Name 
                                    <button className="button sortButton" onClick={this.sortName}>
                                        <i className="fas fa-sort" data-value="name"></i>
                                    </button>
                                </th>
                                <th>Phone Number
                                    <button className="button sortButton" onClick={this.sortName}>
                                        <i className="fas fa-sort" data-value="phone"></i>
                                    </button>
                                </th>
                                <th>Email
                                    <button className="button sortButton" onClick={this.sortName}>
                                        <i className="fas fa-sort" data-value="email"></i>
                                    </button>
                                </th>
                                <th>Date of Birth
                                    <button className="button sortButton" onClick={this.sortName}>
                                        <i className="fas fa-sort" data-value="birth"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody key="tbody">
                            { this.renderTableData() }
                        </tbody>
                    </table>
                </div>
            </Container>
        );
    }
}

export default Table;