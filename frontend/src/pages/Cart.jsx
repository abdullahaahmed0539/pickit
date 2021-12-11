import { useParams, withRouter } from "react-router-dom";
import { fetchCart } from "../API calls/products";
import { useState, useEffect} from "react";
import {Button} from 'react-bootstrap';
import { removeFromCart } from "../API calls/products";
import CartItem from "../Components/CartItem";


const Cart = ({ history }) => {

    const { userId } = useParams();
    const [cartItems,setCartItems] = useState([]);
    const [total,setTotal] = useState(0);

    useEffect(() => {
    fetchCart(localStorage.getItem("user_id"))
        .then((response) => {
            setCartItems(response.data.data.cartProducts);
            let sum = 0;
            for (var i = 0 ; i<cartItems.length ; i++){
                sum = sum + cartItems[i].price;
            }
            setTotal(sum);
        })
        .catch(() => console.log("Error while fetching cart products"));
    }, [userId,cartItems, total]);

    const remove = (productId) => {

        const prevCartItems = [...cartItems];
        const newCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(newCartItems);

        removeFromCart(productId)
          .then((response)=> {
            if(response.status !== 200){
              alert('Unable to remove product from the cart !');
              setCartItems(prevCartItems);
            }
            else{
        
            console.log("Successfully removed from cart");
            }
          })
          .catch((response)=>{
          
            alert('Unable to remove product from the cart !');
            setCartItems(prevCartItems);
          })
    }


    return ( 
        <div className="container mt-5 ml-1">
            <div>
                <h1 style={{marginBottom: "30px"}}>
                    You have { cartItems.length} items in your cart.
                </h1>
                {cartItems && cartItems.length ===0 && <h5 >What are you waiting for? Start shopping now!</h5>}
            </div>
            <div>
                {cartItems && cartItems.map((item)=> (
                    <CartItem
                    key={item._id}
                    _id={item._id}
                    image={item.images[0]}
                    name={item.productName}
                    date={item.date}
                    status={item.status}
                    requestsLength={item.requests.length}
                    description={item.description}
                    type={item.transactionType}
                    categoryId={item.categoryId}
                    price={item.price}
                    onRemove={remove}
                  />
                ))}

                {cartItems.length!==0 &&<h2 style={{textAlignLast: "end", color: "gray",marginTop: "20px"}}>
                    Total : {total}
                </h2>}

                {cartItems.length !==0 && 
                    <div style={{display: "flex",justifyContent: "end",marginTop: "10px",marginBottom: "20px"}}>
                        <Button 
                            onClick={() => history.push(`/checkout`)}
                            variant="dark" size="lg" >
                            Proceed To CheckOut
                        </Button> 

                    </div>
                }
        
            </div>

        </div>
     );
}
 
export default withRouter(Cart);