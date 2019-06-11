import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { getJwt } from '../../helpers';

class AddItem extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            BillId: parseInt(this.props.match.params.BillId),
            CustomerId: parseInt(this.props.match.params.CustomerId),
            Quantity: '',
            Products: [],
            ProductId: null,
            TotalPrice: '',
            Categories: [],
            Subcategories: [],
        }

    }

    componentDidMount(){
        this.getCategories();
    }

    getCategories(){
        axios.get('http://www.fulek.com/nks/api/aw/categories')
            .then(response => {
                this.setState({ Categories: response.data });
        }).catch(function (error) {
            console.log(error);
        })
    }

    getSubcategories(category){
        axios.get('http://www.fulek.com/nks/api/aw/subcategories/' + category)
            .then(response => {
                this.setState({ Subcategories: response.data });
        }).catch(function (error) {
        console.log(error);
      })
    }

    getProducts(subcategory){
        axios.get('http://www.fulek.com/nks/api/aw/products/' + subcategory)
            .then(response => {
                this.setState({ Products: response.data });
        }).catch(function (error) {
          console.log(error);
        })
    }

    changeCategoryGetSubcategory(e){
        this.getSubcategories(e.target.value);
    }

    changeSubcategoryGetProduct(e){
        this.getProducts(e.target.value);
    }

    changeProduct(e){
        this.setState({ProductId: e.target.value})
    }

    changeTotalPrice(e){
        this.setState({TotalPrice: e.target.value})
    }

    changeQuantity(e){
        this.setState({Quantity: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const addItem = {
            BillId: this.state.BillId,
            Quantity: this.state.Quantity,
            ProductId: this.state.ProductId,
            TotalPrice: this.state.TotalPrice
        }

        axios.post('http://www.fulek.com/nks/api/aw/additem', addItem, { headers: { Authorization: `Bearer ${getJwt()}` } })
            .then(response => {
              alert("Item added :)");
              console.log(response.data);

              //Reset
              this.setState({Quantity: '', TotalPrice: '', ProductId: null, Products: [], Subcategories: []});
            })
            .catch(function (error) {
              console.log(error);
        })
    }
    
   render(){
       return(
        <div className="container col-md-9" style={{marginTop: 20}}>
            <h3>Add Item</h3>
            <form onSubmit={e => this.onSubmit(e)}>
                <div className="form-group">
                    <Form.Group controlId="Category">
                        <Form.Label>Select category: </Form.Label>
                        <Form.Control as="select" onChange={e => this.changeCategoryGetSubcategory(e)}>
                        <option>Choose...</option>
                        {
                          this.state.Categories.map((c, i) => {
                            return <option key={i} value={c.Id}>{c.Name}</option>
                          })
                        }
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className="form-group">
                    <Form.Group controlId="Subcategory">
                        <Form.Label>Select subcategory: </Form.Label>
                        <Form.Control as="select" onChange={e => this.changeSubcategoryGetProduct(e)}>
                        <option>Choose...</option>
                        {
                          this.state.Subcategories.map((s, i) => {
                            return <option key={i} value={s.Id}>{s.Name}</option>
                          })
                        }
                        </Form.Control>
                    </Form.Group>        
                </div>
                <div className="form-group">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select product: </Form.Label>
                        <Form.Control as="select" onChange={e => this.changeProduct(e)}>
                        <option>Choose...</option>
                        {
                          this.state.Products.map((p, i) => {
                            return <option key={i} value={p.Id}>{p.Name}</option>
                          })
                        }
                        </Form.Control>
                    </Form.Group>        
                </div>
                <div className="form-group">
                    <label>Quantity: </label>
                    <input type="number" className="form-control" value={this.state.Quantity} onChange={e => this.changeQuantity(e)} />    
                </div>
                <div className="form-group">
                    <label>Total Price: </label>
                    <input type="number" className="form-control" value={this.state.TotalPrice} onChange={e => this.changeTotalPrice(e)} />  
                </div>

                <div className="form-group">
                    <input type="submit" value="Add Item" className="btn btn-primary col-md-5" />
                    <Link className="btn btn-warning col-md-5" style={{float: 'right'}} to={"/billitems/"+this.props.match.params.BillId+"/"+this.props.match.params.CustomerId}>&#x2190; Back</Link>
                </div>
            </form>
        </div>
       );
   } 

}
export default AddItem;