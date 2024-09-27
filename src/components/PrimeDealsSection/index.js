import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SICCESS',
  fail: 'FAIL',
  process: 'PRECESS',
}
class PrimeDealsSection extends Component {
  state = {list: [], apiStatusIs: apiStatus.initial}

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({apiStatusIs: apiStatus.process})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {Authorization: `Beare ${token}`},
      methode: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateList = data.prime_deals.map(eachItem => ({
        title: eachItem.title,
        brand: eachItem.brand,
        price: eachItem.price,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
      }))
      this.setState({list: updateList, apiStatusIs: apiStatus.success})
    } else if (response.status === 401) {
      this.setState({apiStatusIs: apiStatus.fail})
    }
  }

  onSuccess = () => {
    const {list} = this.state
    return (
      <ul>
        {list.map(eachItem => (
          <ProductCard productData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onFail = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  onLoding = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderIs = () => {
    const {apiStatusIs} = this.state

    switch (apiStatusIs) {
      case apiStatus.success:
        return this.onSuccess()
      case apiStatus.fail:
        return this.onFail()
      case apiStatus.process:
        return this.onLoding()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="PrimeDealsSection-container">{this.onRenderIs()}</div>
    )
  }
}
export default PrimeDealsSection
