import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'

import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header />
    <PrimeDealsSection />
    <div className="product-sections">
      <AllProductsSection />
    </div>
  </>
)

export default Products
