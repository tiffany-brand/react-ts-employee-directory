import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Employee from "../../interfaces/Employee";
import { Order } from "../../interfaces/Order";

type Props = {
    employees: Employee[];
    orderBy: string;
    order: Order;
    handleSort: any;

}

const EmployeeTable: React.FC<Props> = ({
    employees,
    orderBy,
    order,
    handleSort
}) => {

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="Employee Table">
                {/* Table headings with sort icons and click handlers */}
                <TableHead>
                    <TableRow>
                        <TableCell>Picture</TableCell>
                        <TableCell>First Name
                            <TableSortLabel active={orderBy === "firstName"} direction={order} onClick={() => handleSort("firstName", order)}></TableSortLabel>
                        </TableCell>
                        <TableCell>Last Name
                        <TableSortLabel active={orderBy === "lastName"} direction={order} onClick={() => handleSort("lastName", order)}></TableSortLabel>
                        </TableCell>
                        <TableCell>Gender
                        <TableSortLabel active={orderBy === "gender"} direction={order} onClick={() => handleSort("gender", order)}></TableSortLabel>
                        </TableCell>
                        <TableCell>Email
                        <TableSortLabel active={orderBy === "email"} direction={order} onClick={() => handleSort("email", order)}></TableSortLabel>
                        </TableCell>
                        <TableCell>Phone Number
                        <TableSortLabel active={orderBy === "phone"} direction={order} onClick={() => handleSort("phone", order)}></TableSortLabel>
                        </TableCell>
                        <TableCell>City
                        <TableSortLabel active={orderBy === "city"} direction={order} onClick={() => handleSort("city", order)}></TableSortLabel>
                        </TableCell>
                        <TableCell>State
                        <TableSortLabel active={orderBy === "state"} direction={order} onClick={() => handleSort("state", order)}></TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* Create table rows from employees array */}
                <TableBody>
                    {
                        employees.map(emp => {
                            return <TableRow hover key={emp.id}>
                                <TableCell align="left"><img alt={`${emp.firstName} ${emp.lastName}`} src={emp.picture}></img></TableCell>
                                <TableCell align="left">{emp.firstName}</TableCell>
                                <TableCell align="left">{emp.lastName}</TableCell>
                                <TableCell align="left">{emp.gender}</TableCell>
                                <TableCell align="left">{emp.email}</TableCell>
                                <TableCell align="left">{emp.phone}</TableCell>
                                <TableCell align="left">{emp.city}</TableCell>
                                <TableCell align="left">{emp.state}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EmployeeTable;