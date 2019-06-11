import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          name: '',
          error: ''
        };
    }

    change(e) {
        //update username, password, name
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    submit(e) {
        e.preventDefault();
        axios.post('http://www.fulek.com/nks/api/aw/registeruser', {
          username: this.state.username,
          password: this.state.password,
          name: this.state.name
        }).then(res => { 
          console.log(res);         
          this.props.history.push('/login')
        }).catch(err => {
            console.log(err);
            this.setState({ error: true})      
        });
      }

    render() {
        const { error } = this.state;

        return(
            <div className="container col-md-3" style={{marginTop: 20}}>
                <form onSubmit={e => this.submit(e)}>
                  <div className="form-group">
                    <label>username</label>
                    <input type="text" name="username" className="form-control" onChange={e => this.change(e)} />
                  </div>
                  <div className="form-group">
                    <label>password</label>
                    <input type="password" name="password" className="form-control" onChange={e => this.change(e)} />
                  </div>
                  <div className="form-group">
                    <label>name</label>
                    <input type="text" name="name" className="form-control" onChange={e => this.change(e)} />
                  </div>  
                  <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary col-md-12" />
                  </div> 
                </form>
                {error && <div class="alert alert-danger" role="alert">This user exist...</div>}
            </div>
        );
    }  

}
export default Register;