import PleaseSignIn from '../components/PleaseSignIn'
import Order from '../components/Order'

const order = ({query}) => (
  <div>
    <PleaseSignIn>
      <Order id={query.id} />
    </PleaseSignIn>
  </div>
)

export default order
