import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../service/http-service';
import Product from '../Product/product'
import WishList from '../Wishlist/wishlist'
imp
const http= new HttpService();

class App extends Component {
    
    constructor(props){
        super(props);
        this.state={
            products:[]
        };
//        Bind the functions
//        has to be done to the functions if you want to bind to them
        this.loadData = this.loadData.bind(this);
        this.productList= this.productList.bind(this);
        this.loadData();
    }
    
    loadData= ()=>{
//        When working with a promise we need to hold a reference to a this
        var self = this;
        http.getProducts().then(data=>{
//            Everytime setState is called react will reload that component
            self.setState({products:data})
        },err=> {
            
        });
    }
    
    productList = () => {
        const list = this.state.products.map((product)=> 
//            Given the product we wan to create a object
            <div className='col-sm-2' key={product._id}>
                <Product product={product}></Product>
            </div>
//            Need to return inside parenthesis- REACT feature
        return (list);)
        }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className='container-fluid App-main'>
            <div className='row'>
                <div className='col-sm-8'>
                    <div className='row'>
                        {this.productList()}
                    </div>
                    
                </div>
                <div className='col-sm-4'>
                    <WishList/>
                </div>
            </div>
            
        </div> 
        
      </div>
    );
  }
}

export default App;
