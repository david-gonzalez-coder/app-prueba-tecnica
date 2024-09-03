import { productType } from "../types";
import { Link } from "react-router-dom";

const Pruduct: React.FC<productType> = ({ id, title, description, price, category, image}) => {
 
    const truncate = (str: string, n: number) => {
      return str?.length > n ? str.slice(0,n) + '...' : str;
    }
    
    return (
      <Link to={`/products/${id}`} className='bg-white rounded-xl flex flex-col gap-4 shadow-md p-4' >
        <div className='aspect-[9/12]'>
          <img src={image} alt={title} className='w-full object-cover' />
        </div>
        
        <h2 className='font-bold text-xl text-center'>{title}</h2>
        <p>{truncate(description,100)}</p>
        
  
      </Link>
    )
  }

export default Pruduct;