import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Header from "../Header";
import Search from "../Search";
import { API } from "../../utils/API";
import { util } from "../../utils/utils";
import Employee from "../../interfaces/Employee";
import EmployeeTable from "../EmployeeTable";
import { Order } from '../../interfaces/Order';
import "./style.css";




class Directory extends Component<{}, {
    employees: Employee[];
    loadedEmployees: Employee[];
    search: string;
    orderBy: string;
    order: Order;
}> {

    state = {
        employees: [],
        loadedEmployees: [],
        search: "",
        orderBy: "",
        order: Order.ASC
    }

    // Get employees from API and store required fields in employees state
    componentDidMount() {
        API.getEmployees()
            .then(response => {
                let empData: Employee[] = response.data.results.map((emp: any) => {
                    return ({
                        id: emp.id.value,
                        picture: emp.picture.medium,
                        firstName: emp.name.first,
                        lastName: emp.name.last,
                        gender: emp.gender,
                        email: emp.email,
                        phone: emp.phone,
                        city: emp.location.city,
                        state: emp.location.state
                    });
                })
                this.setState({
                    employees: empData,
                    loadedEmployees: empData
                })

            })
            .catch(err => console.log(err));
    };

    // function to sort table by a given column
    handleSort = (column: keyof Employee, order: Order) => {
        let sorted = [...this.state.employees].sort(util.compareValues(column, order));
        let newOrder = order === Order.ASC ? Order.DESC : Order.ASC
        this.setState({
            employees: sorted,
            orderBy: column,
            order: newOrder
        });
    }

    // handle search input - filter table when user inputs characters into search
    handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        // Getting the value of the search input which triggered the change
        const { value } = event.currentTarget;

        // Updating the search input's state
        this.setState({
            search: value
        }, () => {
            // filter the employee list
            if (this.state.search) {
                let filteredEmps = util.searchEmp(this.state.search, this.state.loadedEmployees);
                this.setState({
                    employees: filteredEmps,
                    orderBy: ""
                })
            } else {
                this.setState({
                    employees: this.state.loadedEmployees,
                    orderBy: ""
                })
            }
        });
    };

    render() {
        return (
            <div className="Directory-container">
                <Header />
                <Grid className="Directory-search" container justify="center">
                    <Search handleInputChange={this.handleInputChange} />
                </Grid>
                <Grid className="Directory-table">
                    <EmployeeTable employees={this.state.employees} handleSort={this.handleSort} orderBy={this.state.orderBy} order={this.state.order} />
                </Grid>
            </div>
        )
    }

}

export default Directory;