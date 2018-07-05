import React ,{Component} from 'react';
import ProductCondensed from '../Product-Condensed/product-condensed';
import  DataService from '../Services/data-service'
import NotificationService,{NOTIF_WIAHLIST_CHANGED} from '../Services/notifications'

let ns = new NotificationService();
class WishList extends Component{
//    Render is particular to Component
    
    constructor(props){
        super(props);
//        BindFunctions
        this.state = { wishList:[]}
        this.createWistList = this.createWistList.bind(this);
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
        this.setState={wishList:newWishList}
    }
        
    createWistList()= ()=>{
        const list = this.state.wishList.map(product =>
            <ProductCondensed product={product} key={product._id}/>
        );
        return (list);
    };
    render(){
        return(
            <div className='card'>
                <div className='card-block'>
                    <h4 className='card-title'> WishList </h4>
                    <ul className='list-group'>
                        {this.createWistList()}
                    </ul>
                </div>    
        );
    }
}

export default WishList;