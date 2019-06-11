import React, { Component } from 'react';
import { logout } from '../helpers';

class Logout extends Component{
    //constructor(props){
    //    super(props);
    //}

    componentDidMount(){
        logout()
        window.location.href='/';
    }

    render(){
        return (<div></div>);
    }
}
export default Logout;