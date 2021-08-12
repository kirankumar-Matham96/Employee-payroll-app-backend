import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="*" component={() => '404 PAGE NOT FOUND'} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
