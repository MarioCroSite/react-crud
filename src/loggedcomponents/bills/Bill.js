import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OneBill from './OneBill';
import { getJwt } from '../../helpers';

class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            userId: parseInt(this.props.match.params.userId)
        }
    }
    componentDidMount() {
        this.getBillsFromCustomer();
    }

    getBillsFromCustomer(){
        axios.get('http://www.fulek.com/nks/api/aw/customerbills/'+this.state.userId)
        .then(response => {
          this.setState({ bills: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    billRender() {
        let prop = this;
        return this.state.bills.map(function (bill, i) {
          return <OneBill bill={bill} customerId={prop.state.userId} deleteBill={prop.deleteBill} key={i} />
        });
      }

      deleteBill = (id) => {
        const token = getJwt();
        if(id && window.confirm('Do you want delete this bill ?')) {
          axios.post('http://www.fulek.com/nks/api/aw/deleteBill', { id: id }, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
              alert("Deleted Successfuly :)");
              this.getBillsFromCustomer(this.state.userId);
            })
            .catch(function (error) {
              console.log(error);
            })
        }
      };

    render(){
        //console.log(this.state.bills);
        //if (this.state.bills.length === 0) return <p style={{textAlign: "center", color: "red"}}>We have 0 Bills for this customer.</p>;  
        return(
            <div className='container col-md-9' style={{ marginTop: 20 }}>
            <Link className="btn btn-success form-control" style={{marginTop: '20px'}} to={"/addbill/"+this.state.userId}>&#43; Add Bill</Link>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>BillNumber</th>
                        <th>CreditCard</th>
                        <th>Date</th>
                        <th>Seller</th>
                        <th>Options</th>           
                    </tr>
                </thead>
                <tbody>
                    {this.billRender()}
                </tbody>
            </table>
            <Link className="btn btn-warning col-md-12" style={{float: 'right'}} to={"/logged"}>&#x2190; Back</Link>
            </div>
        );
    }
}
export default Bill;
