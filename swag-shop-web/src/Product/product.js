import React ,{Component} from 'react';
import './product.css';
import DataServices from '../Services/data-service'
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../Services/notifications'

let ds = new DataServices();
let ns = new NotificationService();
class Product extends Component{
    
    constructor(props){
        super(props);
        this.state={onWishList: ds.itemOnWishList()}
//        Bind Functions
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }
    //    React Lifecycle Functions
    componentDidMount(){
//        When the component mounts- add ourself as an observer
        ns.addObserver(NOTIF_WIAHLIST_CHANGED,this,this.onWishListChanged);
    }
    componentWillUnmount(){
//        When the component unmounts- remove ourself as an observer
//        If we dont do this we might have a memory leak in the app
        ns.removeObserver(this, NOTIF_WIAHLIST_CHANGED);
    }
    onWishListChanged(newWishList){
        this.setState({onWishList:ds.itemOnWishList(this.props.product)});
    }
    
    onButtonClicked= () => {
        if(!this.state.onWishList){
            ds.addWishListItem(this.props.product);
        }
        else{
            ds.removeWishListItem(this.props.product);
        }
        
    }
    
    var btnClass;
    if(this.state.onWishList){
        btnClass="btn btn-danger";
    }
    else{
        btnClass="btn btn-primary";
    }
//    Render is particular to Component
    render(){
        return(
        <div className='card'>
            <img className='card-img-top' alt='Product' src={this.props.product.url}></img>
            <div className='card-block'>
                <h4 classnName='card-title'></h4>
                <p className='card-text'> Price: $</p>
                <a href='#' onClick={()=> this.onButtonClicked()} className={btnClass}>{this.state.onWishList?"Remove From WishList":"Add to Cart"}</a>
            </div>
        </div>);
    }
}

export default Product;