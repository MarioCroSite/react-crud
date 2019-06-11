import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OneItem from './OneItem';
import { getJwt } from '../../helpers';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            billId: '',
            customerId: ''
        }
    }

    componentDidMount() {
        const {billId, customerId}  = this.props.match.params
        //console.log(billId);
        this.setState({billId: billId});
        this.setState({customerId: customerId})
        this.getItemFromBill(billId);
    }

    getItemFromBill(billId){
        axios.get('http://www.fulek.com/nks/api/aw/billitems/'+billId)
        .then(response => {
          this.setState({ items: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    itemRender() {
        let prop = this;
        return this.state.items.map(function (item, i) {
          return <OneItem item={item} deleteItem={prop.deleteItem} key={i} />;
        });
    }

    deleteItem = (id) => {
        const token = getJwt();
        if(id && window.confirm('Do you want delete this item ?')) {
          axios.post('http://www.fulek.com/nks/api/aw/deleteItem', { id: id }, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
              alert("Deleted Successfuly :)");
              this.getItemFromBill(this.state.billId);
            })
            .catch(function (error) {
              console.log(error);
            })
        }
      };

    render(){
        console.log(this.state.items);
        //if (this.state.items.length === 0) return <p style={{textAlign: "center", color: "red"}}>We have 0 items for this bill.</p>;  
        return(
            <div className='container col-md-9' style={{ marginTop: 20 }}>
            <Link className="btn btn-success form-control" style={{marginTop: '20px'}} to={"/additem/"+this.state.billId+"/"+this.state.customerId}>&#43; Add Item</Link>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Product number</th>
                        <th>Quantity</th>
                        <th>Total price</th>                
                        <th>Options</th>           
                    </tr>
                </thead>
                <tbody>
                    {this.itemRender()}
                </tbody>
            </table>           
             <Link className="btn btn-warning col-md-12" style={{float: 'right'}} to={"/customerbills/"+this.state.customerId}>&#x2190; Back</Link>
            </div>
        );
    }
}
export default Item;