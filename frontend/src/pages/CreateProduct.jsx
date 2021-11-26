import { useState, useEffect, useRef } from "react";
import ProductForm from "../Components/ProductForm";
import Spinner from "../Components/Spinner";



const CreateProduct = () => {
  const fileInputRef = useRef();
  const [img, setImg] = useState('');
  const initial =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU";
  const [prev, setPrev] = useState(initial);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrev(reader.result);
      };
      reader.readAsDataURL(img);
    }
  }, [img]);

  

  return (

    <div className="container">
      {loading && <Spinner />}
      {!loading &&
        <div className="row mt-5">
          <div className="col-md-3">
            <form>
              <img src={prev} alt="..." style={{ width: "150%" }} />
              <div className="row mt-2">
                <input
                  type="file"
                  className=" col-md-9"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={e => {
                    setImg(e.target.files[0]);
                  }}
                />
                <button
                  className="btn btn-danger col-md-3"
                  onClick={e => {
                    e.preventDefault();
                    setPrev(initial);
                  }}
                  disabled={prev === initial ? true : false}
                >
                  reset
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <ProductForm
              productName=""
              file={img}
              price=""
              description=""
              type="sell"
              categoryName="sports"
            categoryId="617301e3d53945aab87a00de"
            setLoading= {() => setLoading(true)}
            />
          </div>
        </div>
      }
      </div>

  );
};
export default CreateProduct;
