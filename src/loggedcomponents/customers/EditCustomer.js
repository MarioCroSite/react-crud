import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getJwt } from '../../helpers';

class EditCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: '',
            Name: '',
            Surname: '',
            Email: '',
            Telephone: '',
            Cities: [],
            CityId: null,
            Customers: []
        }
        
    }

    componentDidMount() {
        const {userId}  = this.props.match.params
        this.getCities();
        this.getCustomers(userId);
    }

    getCities(){
        axios.get('http://www.fulek.com/nks/api/aw/cities')
        .then(response => {
          this.setState({ Cities: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    getCustomers(userId){
        axios.get('http://www.fulek.com/nks/api/aw/customers')
        .then(response => {
            this.setState({ Customers: response.data });
            this.getOurCustomer(userId);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    getOurCustomer(userId){
        const customer = this.state.Customers.find(x=>x.Id == userId);
        this.setState({Name: customer.Name, Surname: customer.Surname, Email: customer.Email, Telephone: customer.Telephone, Id: customer.Id, CityId: customer.CityId});
        console.log(customer);
    }

    changeState(e) {
        console.log(e.target.name);
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const editCustomer = {
            Id: this.state.Id,
            Name: this.state.Name,
            Surname: this.state.Surname,
            Email: this.state.Email,
            Telephone: this.state.Telephone,
            CityId: this.state.CityId
        }
        
        axios.post('http://www.fulek.com/nks/api/aw/editcustomer', editCustomer, { headers: { Authorization: `Bearer ${getJwt()}` } })
            .then(response => {
              alert("Customer edited :)");
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            })
    }

    render(){
        const _this = this.state;
        return(
            <div className="container col-md-9" style={{marginTop: 20}}>
                <h3>Edit Customer</h3>
                <form onSubmit={e => this.onSubmit(e)}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" className="form-control" value={this.state.Name != null ? this.state.Name : ''} name="Name" onChange={e => this.changeState(e)} />
                </div>
                <div className="form-group">
                    <label>Surname: </label>
                    <input type="text" className="form-control" value={this.state.Surname != null ? this.state.Surname : ''} name="Surname" onChange={e => this.changeState(e)} />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" className="form-control" value={this.state.Email != null ? this.state.Email : ''} name="Email" onChange={e => this.changeState(e)} />
                </div>
                <div className="form-group">
                    <label>Telephone: </label>
                    <input type="text" className="form-control" value={this.state.Telephone != null ? this.state.Telephone : ''} name="Telephone" onChange={e => this.changeState(e)} />
                </div>
                <div className="form-group">
                    <Form.Group controlId="CityId">
                        <Form.Label>Select city: </Form.Label>
                        <Form.Control as="select" name="CityId" onChange={e => this.changeState(e)}>
                        <option>Choose...</option>
                        {
                            this.state.Cities.map(function(c, i){
                                return <option key={i} name="CityId" value={c.Id} selected={_this.CityId != null ? _this.CityId == c.Id : 'false'}>{c.Name}</option>
                            })
                        }
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Customer" className="btn btn-primary col-md-5" />
                    <Link className="btn btn-warning col-md-5" style={{float: 'right'}} to={"/logged"}>&#x2190; Back</Link>
                </div>
                </form>
            </div>
        );
    }

}
export default EditCustomer;