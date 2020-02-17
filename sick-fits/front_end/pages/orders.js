import Orders from '../components/Orders'
import PleaseSignIn from '../components/PleaseSignIn'

const orders = () => (
  <div>
    <PleaseSignIn>
      <Orders />
    </PleaseSignIn>
  </div>
)

export default orders
