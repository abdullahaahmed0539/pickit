import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { fetchMyProducts, deleteProduct } from "../API calls/products";
import { Button, Pagination } from "react-bootstrap";
import Card from "../Components/Card";
import { RemoveModal } from "../Components/Modal";
import DropdownSelector from "../Components/UI/Dropdown";

const MyAds = (props) => {
  const { userId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [productIdToBeDeleted, setProductIdToBeDeleted] = useState("");
  const [productNameToBeDeleted, setProductNameToBeDeleted] = useState("");
  const [listedProducts, setListedProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [pageId,setPageId]  = useState(1);
  const [pages,setPages] = useState([]);
  const limit = 4;



  useEffect(() => {
    fetchMyProducts(userId,pageId,filter)
      .then((response) => {
        setListedProducts(response.data.data.paginatedProducts);
        let arrpages = [];
        for(let number = 1; number<= Math.ceil(response.data.data.totalProducts/limit);number++){
          // console.log(number);
          arrpages.push(number);
        }
        setPages(arrpages);
      })
      .catch(() => console.log("Error while fetching products"));
  }, [userId,pageId,filter]);

  const displayModal = (id, name) => {
    setModalOpen(true);
    setProductIdToBeDeleted(id);
    setProductNameToBeDeleted(name);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProductIdToBeDeleted("");
    setProductNameToBeDeleted("");
  };

  const removeProduct = async () => {
    deleteProduct(productIdToBeDeleted)
      .then(() => {
        setProductIdToBeDeleted("");
        window.location.reload(true);
      })
      .catch(() => console.log("Error while deleting product"));
  };

  // const allFilter = listedProducts
  //   .map((item) => (
  //     <Card
  //       key={item._id}
  //       _id={item._id}
  //       image={item.images[0]}
  //       name={item.productName}
  //       date={item.date}
  //       status={item.status}
  //       requestsLength={item.requests.length}
  //       description={item.description}
  //       type={item.transactionType}
  //       categoryId={item.categoryId}
  //       price={item.price}
  //       onRemove={displayModal}
  //     />
  //   ))
  //   .reverse();

  // const activeFilter = listedProducts
  //   .filter((item) => item.status === "active")
  //   .map((item) => (
  //     <Card
  //       key={item._id}
  //       _id={item._id}
  //       image={item.images[0]}
  //       name={item.productName}
  //       date={item.date}
  //       status={item.status}
  //       requestsLength={item.requests.length}
  //       description={item.description}
  //       type={item.transactionType}
  //       categoryId={item.categoryId}
  //       price={item.price}
  //       onRemove={displayModal}
  //     />
  //   )).reverse();

  // const pendingFilter = listedProducts
  //   .filter((item) => item.status === "pending")
  //   .map((item) => (
  //     <Card
  //       key={item._id}
  //       _id={item._id}
  //       image={item.images[0]}
  //       name={item.productName}
  //       date={item.date}
  //       status={item.status}
  //       requestsLength={item.requests.length}
  //       description={item.description}
  //       type={item.transactionType}
  //       categoryId={item.categoryId}
  //       price={item.price}
  //       onRemove={displayModal}
  //     />
  //   )).reverse();

  // const rejectedFilter = listedProducts
  //   .filter((item) => item.status === "rejected")
  //   .map((item) => (
  //     <Card
  //       key={item._id}
  //       _id={item._id}
  //       image={item.images[0]}
  //       name={item.productName}
  //       date={item.date}
  //       status={item.status}
  //       requestsLength={item.requests.length}
  //       description={item.description}
  //       type={item.transactionType}
  //       categoryId={item.categoryId}
  //       price={item.price}
  //       onRemove={displayModal}
  //     />
  //   ));

  // const soldFilter = listedProducts
  //   .filter(item => item.status === "sold")
  //   .map(item => (
  //     <Card
  //       key={item._id}
  //       _id={item._id}
  //       image={item.images[0]}
  //       name={item.productName}
  //       date={item.date}
  //       status={item.status}
  //       requestsLength={item.requests.length}
  //       description={item.description}
  //       type={item.transactionType}
  //       categoryId={item.categoryId}
  //       price={item.price}
  //       onRemove={displayModal}
  //     />
  //   ))
  //   .reverse();

  if (listedProducts.length === 0) {
    return (
      <>
        <div className="row mt-5">
          <h2 className="col-md-6 offset-md-4">You have no products listed.</h2>
        </div>
        <div className="row">
            <div style={{marginLeft: "160px"}}>
              <DropdownSelector
                className="col-md-3 offset-md-4"
                variant="light"
                label=""
                labelRequired={false}
                chosen={filter}
                options={["all", "active", "rejected", "pending", "sold"]}
                onSelect={(filter) => setFilter(filter)}
                dropdownOff="filter"
              />
            </div>
          <div className="col-md-5 offset-5 mt-3 mb-4 ">
            <Button
              onClick={() => props.history.push(`/products/create_new`)}
              variant="primary"
              className="btn btn-lg"
            >
              Add product
            </Button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Fragment>
        {modalOpen && (
          <RemoveModal
            close={closeModal}
            remove={removeProduct}
            productName={productNameToBeDeleted}
          />
        )}
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-3 mb-4 ">
              <Button
                onClick={() => props.history.push(`/products/create_new`)}
                variant="primary"
                className="btn btn-lg mb-3"
              >
                Add product
              </Button>
            </div>
          </div>
          <div className="row">
            <h2 className="col-md-5">Your products</h2>

            
            <DropdownSelector
              className="col-md-3 offset-md-4"
              variant="light"
              label=""
              labelRequired={false}
              chosen={filter}
              options={["all", "active", "rejected", "pending", "sold"]}
              onSelect={(filter) => setFilter(filter)}
              dropdownOff="filter"
            />
          </div>
          {/* {filter === "all" && allFilter}
          {filter === "active" && activeFilter}
          {filter === "rejected" && rejectedFilter}
          {filter === "pending" && pendingFilter}
          {filter === "sold" && soldFilter} */}

          {listedProducts && listedProducts.length>0 ? listedProducts
            .map((item) => (
              <Card
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
                onRemove={displayModal}
              />
            ))
            // .reverse();
            : <h4>No listed products for </h4>
          }

        { pages && pages.length>1 && <div style = {{marginTop: "10px", display: "flex", justifyContent: "center"}}>
            <Pagination>
                {
                pages.map(number=><Pagination.Item key={number} onClick={()=>setPageId(number)} active={number === pageId}>{number}</Pagination.Item>)
                }
            </Pagination>
        </div>}

        </div>
      </Fragment>
    );
  }
};

export default withRouter(MyAds);
