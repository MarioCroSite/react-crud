import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OneBill extends Component{
    constructor(props) {
        super(props);
      }

     render(){
        return(
            <tr>
                <td>{this.props.bill.BillNumber}</td>
                <td>{this.props.bill.CreditCard != null ? this.props.bill.CreditCard.Type : '---'}</td>
                <td>{this.props.bill.Date}</td>
                <td>{this.props.bill.Seller != null ? this.props.bill.Seller.Name : '---'} {this.props.bill.Seller != null ? this.props.bill.Seller.Surname : '---'}</td>
                <td>
                    <Link className="btn btn-warning btn-sm" to={"/billitems/" + this.props.bill.Id+"/"+this.props.customerId}>Items</Link>
                    <button className="ml-1 btn btn-danger btn-sm" onClick={() => this.props.deleteBill(this.props.bill.Id)}>Delete</button>
                </td>
            </tr>
        );
     } 

}
export default OneBill;