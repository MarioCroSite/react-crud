import React, { Component } from 'react';

class OneItem extends Component{
    constructor(props) {
        super(props);
      }

     render(){
        return(
            <tr>
                <td>{this.props.item.Product.Name}</td>
                <td>{this.props.item.Product.ProductNumber}</td>
                <td>{this.props.item.Quantity}</td>
                <td>{this.props.item.TotalPrice}</td>
                <td>
                    <button className="ml-1 btn btn-danger btn-sm" onClick={() => this.props.deleteItem(this.props.item.Id)}>Delete</button>
                </td>
            </tr>
        );
     } 

}
export default OneItem;