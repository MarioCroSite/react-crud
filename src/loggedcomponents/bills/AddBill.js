import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { getJwt } from '../../helpers';
import './css/CustomDataPickerWidth.css';

class AddBill extends Component{
    constructor(props){
        super(props);

        this.state = {
            BillNumber: '',
            CustomerId: parseInt(this.props.match.params.CustomerId),
            Sellers: [],
            CreditCards: [],
            SellerId: null,
            CreditCardId: null,
            Comment: '',
            Date: null
        }
    }

    componentDidMount(){
        this.getSellers();
        this.getCreditCards();
    }

    getSellers(){
        axios.get('http://www.fulek.com/nks/api/aw/sellers')
        .then(response => {
          this.setState({ Sellers: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getCreditCards(){
        axios.get('http://www.fulek.com/nks/api/aw/creditcards')
        .then(response => {
          this.setState({ CreditCards: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    changeState(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    changeDate(date) {
        this.setState({
          Date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const addBill = {
            BillNumber: this.state.BillNumber,
            CustomerId: this.state.CustomerId,
            SellerId: this.state.SellerId,
            CreditCardId: this.state.CreditCardId,
            Comment: this.state.Comment,
            Date: moment(this.state.Date).format('YYYY-MM-DD')
        }

        axios.post('http://www.fulek.com/nks/api/aw/addbill', addBill, { headers: { Authorization: `Bearer ${getJwt()}` } })
        .then(response => {
          alert("Bill added :)");
          console.log(response.data);

          //Rest
          this.setState({BillNumber: '', SellerId: null, CreditCardId: null, Comment: '', Date: null })
        })
        .catch(function (error) {
          console.log(error);
        })

    }

    render(){
        return(
            <div className="container col-md-9" style={{marginTop: 20}}>
                <h3>Add Bill</h3>
                <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <label>Bill number: </label>
                        <input type="text" className="form-control" value={this.state.BillNumber} name="BillNumber" onChange={e => this.changeState(e)} />
                    </div>
                    <div className="form-group">
                        <Form.Group controlId="SellerId">
                            <Form.Label>Select Seller: </Form.Label>
                            <Form.Control as="select" name="SellerId" onChange={e => this.changeState(e)}>
                            <option>Choose...</option>
                            {
                            this.state.Sellers.map((s,i) => {
                                return <option key={i} name="SellerId" value={s.Id}>{s.Name} {s.Surname}</option>
                            })
                            }
                            </Form.Control>
                        </Form.Group>
                    </div>
                   <div className="form-group">
                        <Form.Group controlId="CreditCardId">
                            <Form.Label>Select Credit Card: </Form.Label>
                            <Form.Control as="select" name="CreditCardId" onChange={e => this.changeState(e)}>
                            <option>Choose...</option>
                            {
                            this.state.CreditCards.slice(0, 30).map((c,i) => {
                                return <option key={i} name="CreditCardId" value={c.Id}>{c.CardNumber}</option>
                            })
                            }
                            </Form.Control>
                        </Form.Group>     
                   </div>
                   <div className="form-group">
                        <label>Comment: </label>
                        <input type="text" className="form-control" value={this.state.Comment} name="Comment" onChange={e => this.changeState(e)} />      
                   </div>
                   <div className="form-group">
                        <label>Date bill: </label>
                        <div className="customDatePickerWidth">
                            <DatePicker className="form-control" selected={this.state.Date} name="Date" onChange={e => this.changeDate(e)} dateFormat="yyyy-MM-dd" strictParsing />
                        </div>    
                   </div>
                   <div className="form-group">
                        <input type="submit" value="Add Bill" className="btn btn-primary col-md-5" />
                        <Link className="btn btn-warning col-md-5" style={{float: 'right'}} to={"/customerbills/"+this.state.CustomerId}>&#x2190; Back</Link>
                    </div>            
                </form>        
            </div>
        );
    }

}
export default AddBill;