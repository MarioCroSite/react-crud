import React, { Component } from 'react';
import axios from 'axios';
import Customer from '../loggedcomponents/customers/Customer';
import Pagination from './Pagination'
import _ from 'lodash';
import Select from 'react-select'
import { getJwt } from '../helpers';
import { Link } from 'react-router-dom';

const selectItems = [
  {label: "Prikaži 10", value: 10},
  {label: "Prikaži 20", value: 20},
  {label: "Prikaži 50", value: 50}   
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      currentCustomers: [],
      pageSize: 10,
      currentPage: 1,

      selectedOption: selectItems[0],
      cities: [],
      states: []
    };

    this.sortAsc = this.sortAsc.bind(this);
    this.sortDesc = this.sortDesc.bind(this);
  }

  componentDidMount() {
    this.getCities()
    this.getStates()
    this.getCustomers()
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSelectChange = selectedOption => {
    this.setState({selectedOption});
    this.setState({pageSize: selectedOption.value})
    //console.log(selectedOption);
  };

  getCustomers() {
    axios.get('http://www.fulek.com/nks/api/aw/customers')
      .then(response => {
        this.setState({ customers: response.data });
        this.setState({ currentCustomers: response.data });
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getCities(){
    axios.get('http://www.fulek.com/nks/api/aw/cities')
        .then(response => {
            this.setState({ cities: response.data });
            //console.log(response.data);
        }).catch(function (error) {
            console.log(error);
    })
  }

  getStates(){
    axios.get('http://www.fulek.com/nks/api/aw/states')
        .then(response => {
            this.setState({ states: response.data });
            //console.log(response.data);
        }).catch(function (error) {
            console.log(error);
    })
  }

  customerRender(customers) {
    let prop = this;
    return customers.map(function (customer, i) {
      return <Customer customer={customer} deleteCustomer={prop.deleteCustomer}  key={i} />;
    });
  }

  paginationEffect = (customers, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(customers).slice(startIndex).take(pageSize).value();
  }

  search(e) {
    const value = e.target.value

    //console.log(this.state.customers);
    const filtered = this.state.customers.filter(function(data){
      //console.log(value);
      return data.Name.startsWith(value);
    })
    
    //console.log(filtered);

    this.setState({currentCustomers: filtered});
  }

  mappingCustomerCitiesStates(customers, cities, states){
    const mappingCustomer = []
    customers.map(function (customer, i){
      cities.map(function(city, i){
        states.map(function(state, i){
          const newCustomer = customer;
          if(newCustomer.CityId == city.Id && city.StateId == state.Id){
            newCustomer.CityName = city.Name;
            newCustomer.StateName = state.Name
            mappingCustomer.push(newCustomer);
          }
        })
      })
    })
    return mappingCustomer;
  }

  sortAsc(value){
    const customer = this.state.currentCustomers.filter(x => x.CityName !== undefined).filter(x => x.StateName !== undefined);
    //console.log(customer);
    switch(value) {
      case "Name":
          customer.sort((a, b) => a.Name.localeCompare(b.Name));
      break;
      case "Surname":
          customer.sort((a, b) => a.Surname.localeCompare(b.Surname));
      break; 
      case "Email":
          customer.sort((a, b) => a.Email.localeCompare(b.Email));
      break;
      case "Telephone":    
        customer.sort((a, b) => a.Telephone.localeCompare(b.Telephone));
      break;
      case "CityName":
        customer.sort((a, b) => a.CityName.localeCompare(b.CityName));
      break;
      case "StateName":
          customer.sort((a, b) => a.StateName.localeCompare(b.StateName));
      break;
    }
    //console.log(customer)
    this.setState({currentCustomers: customer});
  }

  sortDesc(value){
    const customer = this.state.currentCustomers.filter(x => x.CityName !== undefined).filter(x => x.StateName !== undefined);
    //console.log(customer);
    switch(value) {
      case "Name":
          customer.sort((a, b) => a.Name.localeCompare(b.Name)).reverse();
      break;
      case "Surname":
          customer.sort((a, b) => a.Surname.localeCompare(b.Surname)).reverse();
      break; 
      case "Email":
          customer.sort((a, b) => a.Email.localeCompare(b.Email)).reverse();
      break;
      case "Telephone":    
        customer.sort((a, b) => a.Telephone.localeCompare(b.Telephone)).reverse();
      break;
      case "CityName":
        customer.sort((a, b) => a.CityName.localeCompare(b.CityName)).reverse()
      break;
      case "StateName":
          customer.sort((a, b) => a.StateName.localeCompare(b.StateName)).reverse();
      break;
    }
    //console.log(customer)
    this.setState({currentCustomers: customer});
  }

  deleteCustomer = (id) => {
    const token = getJwt();
    if(id && window.confirm('Do you want delete this customer?')) {
      axios.post('http://www.fulek.com/nks/api/aw/deletecustomer', { Id: id }, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          alert("Deleted Successfuly :)");
          this.getCustomers();
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  };

  render() {
    const { currentCustomers, pageSize, currentPage, selectedOption, cities, states} = this.state;
    const paging = this.paginationEffect(this.mappingCustomerCitiesStates(currentCustomers, cities, states), currentPage, pageSize);
    return (
      <div className="container col-md-9" style={{ marginTop: 20 }} >
        <div className="row">
          <div className="col-md-6">
            <span>Odaberi koliko kupaca želiš:</span>
            <Select options={ selectItems } value={selectedOption} onChange={this.handleSelectChange}/> 
          </div>
          <div className="col-md-6">
            <span>Pretraži kupce: </span>
            <input type="text" name="search" className="form-control" onChange={e => this.search(e)} />
          </div>
        </div>
        {getJwt() != null ? <Link className="btn btn-success form-control" style={{marginTop: '20px'}} to={"addcustomer"}>&#43; Add Customer</Link> : <span></span>}

        <table className="table table-striped" style={{ marginTop: 20 }} >
          <thead>
            <tr>
              <th>Name <div className="btn-group"><button type="button" className="btn btn-success" onClick={() => this.sortAsc('Name')}>&#8593;</button> <button type="button" className="btn btn-danger" onClick={() => this.sortDesc('Name')}>&#8595;</button></div></th>
              <th>Surname <div className="btn-group"><button type="button" className="btn btn-success" onClick={() => this.sortAsc('Surname')}>&#8593;</button> <button type="button" className="btn btn-danger" onClick={() => this.sortDesc('Surname')}>&#8595;</button></div></th>
              <th>Email address <div className="btn-group"><button type="button" className="btn btn-success" onClick={() => this.sortAsc('Email')}>&#8593;</button> <button type="button" className="btn btn-danger" onClick={() => this.sortDesc('Email')}>&#8595;</button></div></th>
              <th>Telephone <div className="btn-group"><button type="button" className="btn btn-success" onClick={() => this.sortAsc('Telephone')}>&#8593;</button> <button type="button" className="btn btn-danger" onClick={() => this.sortDesc('Telephone')}>&#8595;</button></div></th>
              <th>City <div className="btn-group"><button type="button" className="btn btn-success" onClick={() => this.sortAsc('CityName')}>&#8593;</button> <button type="button" className="btn btn-danger" onClick={() => this.sortDesc('CityName')}>&#8595;</button></div></th>
              <th>State <div className="btn-group"><button type="button" className="btn btn-success" onClick={() => this.sortAsc('StateName')}>&#8593;</button> <button type="button" className="btn btn-danger" onClick={() => this.sortDesc('StateName')}>&#8595;</button></div></th>
              {getJwt() != null ? <th>Options</th> : <th></th>}
            </tr>
          </thead>
          <tbody>
            {this.customerRender(paging)}
          </tbody>
        </table>
        {paging.length === 0 && <div className="alert alert-warning" role="alert">We have 0 customers.</div>}  
        <Pagination
          itemsCount={this.state.currentCustomers.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />

      </div>

    );
  }

}

export default Home;