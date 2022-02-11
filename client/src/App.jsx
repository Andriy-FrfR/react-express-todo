import Layout from './hoc/Layout/Layout';
import Router from './components/Router/Router';

function App() {
  return (
    <div className="App">
      <Layout>
        <Router />
      </Layout>
    </div>
  );
}

export default App;
