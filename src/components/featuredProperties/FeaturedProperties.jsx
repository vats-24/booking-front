import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {


  const {data,loading,error} = useFetch("http://localhost:8080/api/hotels?featured=true")

  //"https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"

  return (
    <div className="fp">
      {loading ? "Loading" : (
        <>
        {data.map((item)=>(
                <div className="fpItem" key={item._id}>
                <img
                  src={item.photos[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Exceptional</span>
                </div>
              </div>
        ))
        }
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
