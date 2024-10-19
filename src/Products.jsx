import { useState, useEffect, useContext } from 'react';
import { CartContext } from './context/cart.jsx';
import Cart from './Cart.jsx'


export default function Products() {
  const [showModal, setshowModal] = useState(false);
  const [products, setProducts] = useState([])
  const { cartItems, addToCart } = useContext(CartContext)

  const toggle = () => {
    setshowModal(!showModal);
  };

  async function getProducts() {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    setProducts(data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='flex flex-col justify-center bg-black-100'>
      <div className='rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-between items-center px-20 py-0'>
        <h1 className='text-4xl uppercase font-bold mt-10 text-center mb-10'>CENTRO FASHION</h1>
        {!showModal && <button className='px-4 py-2 bg-orange-400 text-white text-xs font-bold uppercase rounded hover:bg-orange-500 focus:outline-none focus:bg-orange-600'
          onClick={toggle}
        >Cart ({cartItems.length})</button>}
      </div>
      <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
        {
          products.map(product => (
            <div key={product.id} className='bg-white shadow-2xl rounded-lg px-10 py-10'>
              <img src={product.thumbnail} alt={product.title} className='rounded-md h-48' />
              <div className='mt-4'>
                <h1 className='text-lg uppercase font-bold'>{product.title}</h1>
                <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 40)}...</p>
                <p className='mt-2 text-gray-600'>${product.price}</p>
              </div>
              <div className='mt-6 flex justify-between items-center'>
                <button className='m-auto px-4 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-500'
                  onClick={() => {
                    addToCart(product)
                  }
                  }
                >Add to cart</button>
              </div>
            </div>
          ))
        }
      </div>
      <Cart showModal={showModal} toggle={toggle} />
    </div>
  )
}
