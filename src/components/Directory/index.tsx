import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { API } from "../../utils/API";
import Employee from "../../interfaces/Employee";
import EmployeeTable from "../EmployeeTable";



class Directory extends Component<{}, {
    employees: Employee[];
    loadedEmployees: Employee[];
    search: string;
    orderBy: string;
    order: string;
}> {

    state = {
        employees: [],
        loadedEmployees: [],
        search: "",
        orderBy: "",
        order: "asc"
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

    render() {
        return (
            <Grid>
                <EmployeeTable employees={this.state.employees} />
            </Grid>
        )
    }

}

export default Directory;