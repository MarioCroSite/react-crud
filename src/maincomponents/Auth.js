import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../helpers';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token: undefined
        };
      }

     componentDidMount() {
        const token = getJwt();
        if (!token) {
          this.setState({ token: null });
          return;
        }else{
            this.setState({token});
        }
    }

    render() {
        const { token } = this.state;

        if (token === null) {
          this.props.history.push('/login');
        }
        
        return this.props.children;
    }

}
export default withRouter(Auth);