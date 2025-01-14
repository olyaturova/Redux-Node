
import { useSelector } from "react-redux";
import { getCartItems, getTotalPrice } from "../../redux/cartSlice";
import CartItem from "./CartItem";
import {
    Link
  } from "react-router-dom";


const Cart = () => {
    const cartItems = useSelector(getCartItems);
    const totalPrice = useSelector(getTotalPrice);

    return (<div className="center">



        <img className="cartIcon" alt="cartIcon" src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-shopping-cart-cyber-monday-xnimrodx-lineal-color-xnimrodx.png"/> 
        <h3>TOTAL $ {totalPrice}</h3>
      
        {cartItems.map(cartItem => <CartItem cartItem={cartItem}/>)}

<Link to={"/StripeContainer"}><button>Pay total</button></Link> 
        </div>)
 
}


export default Cart;