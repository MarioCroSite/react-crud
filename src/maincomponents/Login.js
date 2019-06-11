import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          error: ''
        };
      }

      change(e) {
          //update email & password
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      submit(e) {
        e.preventDefault();
        axios.post('http://www.fulek.com/nks/api/aw/login', {
          username: this.state.username,
          password: this.state.password
        }).then(res => { 
          localStorage.setItem('token', res.data.token);
          localStorage.setItem("username", res.data.username);
          this.props.history.push('/logged');
          window.location.reload();
        }).catch(err => {
          console.log(err);
          this.setState({error: true});
        });
      }

      render(){
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
                    <input type="submit" value="Login" className="btn btn-primary col-md-12" />
                  </div>
                </form>
                {error && <div class="alert alert-danger" role="alert">Invalid credentials</div>}
            </div>
        );

      }
}
export default Login;