import Permissions from '../components/Permissions'
import PleaseSignIn from '../components/PleaseSignIn'

const permissions = () => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
)

export default permissions
