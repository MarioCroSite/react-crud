import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getJwt } from '../../helpers';

class AddCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Surname: '',
            Email: '',
            Telephone: '',
            Cities: [],
            CityId: null
        }
    }

    componentDidMount() {
        this.getCities();
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

    changeState(e) {
        console.log(e.target.name);
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const addCustomer = {
            Name: this.state.Name,
            Surname: this.state.Surname,
            Email: this.state.Email,
            Telephone: this.state.Telephone,
            CityId: this.state.CityId
        }
        
        axios.post('http://www.fulek.com/nks/api/aw/addcustomer', addCustomer, { headers: { Authorization: `Bearer ${getJwt()}` } })
            .then(response => {
              alert("Customer added :)");
              console.log(response.data);

              //Reset
              this.setState({Name: '', Surname: '', Email: '', Telephone: '', CityId: null })
            })
            .catch(function (error) {
              console.log(error);
        })

    }

    render(){
        return(
            <div className="container col-md-9" style={{marginTop: 20}}>
                <h3>Add Customer</h3>
                <form onSubmit={e => this.onSubmit(e)}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" className="form-control" value={this.state.Name} name="Name" onChange={e => this.changeState(e)} />
                </div>
                <div className="form-group">
                    <label>Surname: </label>
                    <input type="text" className="form-control" value={this.state.Surname} name="Surname" onChange={e => this.changeState(e)} />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" className="form-control" value={this.state.Email} name="Email" onChange={e => this.changeState(e)} />
                </div>
                <div className="form-group">
                    <label>Telephone: </label>
                    <input type="text" className="form-control" value={this.state.Telephone} name="Telephone" onChange={e => this.changeState(e)} />
                </div>
                <div className="form-group">
                    <Form.Group controlId="CityId">
                        <Form.Label>Select city: </Form.Label>
                        <Form.Control as="select" name="CityId" onChange={e => this.changeState(e)}>
                        <option>Choose...</option>
                        {
                            this.state.Cities.map(function(c, i){
                                return <option key={i} name="CityId" value={c.Id}>{c.Name}</option>
                            })
                        }
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Customer" className="btn btn-primary col-md-5" />
                    <Link className="btn btn-warning col-md-5" style={{float: 'right'}} to={"/logged"}>&#x2190; Back</Link>
                </div>
                </form>
            </div>
        );
    }

}
export default AddCustomer;