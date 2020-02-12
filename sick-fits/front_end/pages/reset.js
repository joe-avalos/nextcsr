import Reset from '../components/Reset'

const reset = ({query}) => (
  <div>
    <Reset resetToken={query.resetToken} />
  </div>
)

export default reset
