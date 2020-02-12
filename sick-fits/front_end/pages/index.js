import Items from '../components/Items'

const Home = ({query}) => (
  <Items page={parseFloat(query.page) || 1} />
)

export default Home
