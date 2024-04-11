import { useGetProductsQuery } from '../../app/api/productApiSlice';
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'

const Home = () => {

  const {
    data: responseData,
    isSuccess: isProductsSuccess,
    isLoading: isProductsLoading,
    isError: isProductsError
  } = useGetProductsQuery();
  // @ts-ignore
  let responseProductsData = responseData?.products
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center p-10">
      <div className='w-full  p-5 grid grid-flow-row place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
        { 
          responseProductsData?.map((product: any) => {
            return (
              <Link id="linkForCard" to={`/product/${product._id}`} >
                <Card id={product._id} name={product.name} price={product.price} description={product.description} quantity={product.quantity} category={product.category} />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home