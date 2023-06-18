import { useNavigate } from "react-router-dom";

function Products(props: any) {
  let navigate = useNavigate();
  let id = props.id;
  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={props.imageUrl} alt="products pic" />
      <div className="product-desc">
        <p className="font-semibold">
          {props.ProductName.length > 20
            ? props.ProductName.substring(0, 20) + "..."
            : props.ProductName}
        </p>
        <p className="short-desc">Stock Left: {props.stock}</p>
        <p className="text-red-500 font-normal">$ {props.Price}</p>
        <div className="flex items-center">
          {Math.round(props.AvgRating * 100) / 100}
          <div className="fa fa-star text-yellow-300 pl-2"></div>
        </div>
      </div>
      <button>Add To Cart</button>
    </div>
  );
}

export default Products;
