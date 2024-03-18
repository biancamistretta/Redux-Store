import { Outlet } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
import { createStore } from 'redux';
import rootReducer from './reducers'; // Import your combined reducers

// Import create store from redux
// Import createStore from redux is unnecessary
import { Provider } from 'react-redux';

// Create store with root reducer
const store = createStore(rootReducer);

// Render App component wrapped in Provider from react-redux
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Define App component
function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Nav />
        <Outlet />
      </StoreProvider>
    </ApolloProvider>
  );
}

// Export App component
export default App;
