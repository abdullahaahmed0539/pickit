import { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams } from 'react-router';
import { fetchProductRequests } from './../API calls/requests';
import {useLocation} from 'react-router-dom';
import { performAction } from './../API calls/requests';
import {Button,Table} from 'react-bootstrap';

const RecievedRequests = ({ history}) => {

    const {productId} = useParams();
    const location = useLocation();
    const [requests,setRequests] = useState([]);

    useEffect(() => {
        fetchProductRequests(productId)
            
          .then((response) => setRequests(response.data.data.requestsOfThisProduct))
          .catch(() => console.log("Error while fetching products"));
    }, [productId]);

    const doAction = (requestId,action) => {
        if(action === "reject"){
            let prevRequests = [...requests];
            let newRequests = prevRequests.filter(item=> item._id !== requestId);
            setRequests(newRequests);

            performAction(requestId,action)
            .then((response)=> {
                if(response.status !== 200){
                    alert('Unable to reject the product');
                    setRequests(prevRequests);
                }
            })
            .catch(err=>{
                alert('caught in exception');
                setRequests(prevRequests);
            })
        }
        else if(action==="accept"){
            let prevRequests = [...requests];
            let indexReq = "";
            for(var i = 0 ; i < prevRequests.length; i++){
                if(prevRequests[i]._id === requestId){
                    prevRequests[i].status = "accepted";
                    indexReq = i;
                }else{
                    prevRequests[i].status = "rejected";
                }
            }
            setRequests(prevRequests);

            performAction(requestId,action)
            .then((response)=> {
                if(response.status !== 200){
                    alert('Unable to reject the product');
                    let newRequests = [...prevRequests];
                    newRequests[indexReq].status="accepted";
                    setRequests(newRequests);
                }
            })
            .catch(err=>{
                alert('caught in exception');
                let newRequests = [...prevRequests];
                newRequests[indexReq].status="pending";
                setRequests(newRequests);
            })
        }
      }


    return ( 
        <Fragment>
            <div className= "container mt-5 ml-1">
                <div style={{color: "gray"}}>
                    <h1>
                        Requests for <span style={{color: "black"}}>{location.state.name}</span>
                    </h1>
                </div>
                {
                    requests && requests.length>0 && 
                    requests.map(request => <h4 style={{marginTop: "20px"}}>{request.senderName}</h4>)
                }
                {
                    requests && requests.length === 0 && 
                    <h6 style={{marginTop: "20px", color: "red"}}>
                        No Requests for this product yet!
                    </h6>
                }

          
                {
                requests && requests.length!==0 &&     
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Sender Name</th>
                    <th>Exchange Value</th>
                    <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {requests.map(request=> 
                        <tr key={request._id}>
                            <td>{request.senderName}</td>
                            <td style={request.offer.cash > 0 ? {color: "green"} : {color: "red "}}>{request.offer.cash}</td>
                            {request.status==="pending" ? <td><Button onClick={()=>history.push(`/products/${request.offer.productId}`)} className="requestcardbutton me-1">View Product</Button> 
                            <Button variant="danger" onClick={()=>doAction(request._id,"reject")} className="requestcardbutton me-1">Reject</Button> 
                            <Button onClick={()=>doAction(request._id,"accept")} variant="success" className="requestcardbutton">Accept</Button></td> : <td><b>{request.status}</b></td>}
                        </tr>)}
                </tbody>
                </Table>
                }


            </div>
        </Fragment>
     );
}
 
export default withRouter(RecievedRequests);