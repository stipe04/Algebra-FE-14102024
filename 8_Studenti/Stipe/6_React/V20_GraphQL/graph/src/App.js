import {ApolloClient, ApolloProvider, gql, useQuery, InMemoryCache} from '@apollo/client';
import './App.css';

const GRAPHQL_API = "https://countries.trevorblades.com";

const client = new ApolloClient({
  uri: GRAPHQL_API,
  cache: new InMemoryCache()
});

function ShowCountries (){

  const CTRY_QUERY = gql`
  {
  country{
    name
    capital
    code
    currency
  }
}`;
}
const {loading, error, data} = useQuery(CTRY_QUERY);

if(loading){
  
}

function App() {
  return (
    <div className="App">
      <h1>GraphQL</h1>
      <h3>Upit serveru: https://countries.trevorblades.com</h3>

    </div>
  );
}

export default App;
