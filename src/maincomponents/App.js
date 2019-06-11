import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Auth from './Auth';
import Home from './Home';
import Register from './Register';
import Nav from './Nav'
import Logout from './Logout'
import Bill from '../loggedcomponents/bills/Bill';
import Item from '../loggedcomponents/items/Item';
import AddCustomer from '../loggedcomponents/customers/AddCustomer';
import EditCustomer from '../loggedcomponents/customers/EditCustomer';
import AddBill from '../loggedcomponents/bills/AddBill';
import AddItem from '../loggedcomponents/items/AddItem';


class App extends Component {
  //constructor(props){
  //  super(props);
  //}

    render() {
      return (
        <BrowserRouter>
          <Nav />
          <Switch>
              <Route path={'/'} exact component={Home} />
              <Route path={'/login'} component={Login} />} /> 
              <Route path={'/register'} component={Register} />

            <Auth>
              <Route path={'/logged'} component={Home} />
              <Route path={'/logout'} component={Logout} />
              <Route path={'/customerbills/:userId'} component={Bill} />
              <Route path={'/billitems/:billId/:customerId'} component={Item} />

              <Route path={'/addcustomer'} component={AddCustomer} />
              <Route path={'/editcustomer/:userId'} component={EditCustomer} />

              <Route path={'/addbill/:CustomerId'} component={AddBill} />
              <Route path={'/additem/:BillId/:CustomerId'} component={AddItem} />
            </Auth>

          </Switch>
        </BrowserRouter>
      );
    }
}

export default App;
