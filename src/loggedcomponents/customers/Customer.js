import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getJwt } from '../../helpers';


class Customer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <tr>
                <td>{this.props.customer.Name}</td>
                <td>{this.props.customer.Surname}</td>
                <td>{this.props.customer.Email}</td>
                <td>{this.props.customer.Telephone}</td>
                <td>{this.props.customer.CityName}</td>
                <td>{this.props.customer.StateName}</td>
                {getJwt() != null ?
                <td>
                    <div className="btn-group">
                        <Link className="btn btn-primary btn-sm" to={"/customerbills/" + this.props.customer.Id}>Bills</Link>
                        <Link className="btn btn-warning btn-sm" to={"/editcustomer/" + this.props.customer.Id}>Edit</Link>
                        <button className="btn btn-danger btn-sm" onClick={() => this.props.deleteCustomer(this.props.customer.Id)}>Delete</button>
                    </div>
                </td>
                :
                <td></td>
                }
            </tr>
        );
    }
}
export default Customer;