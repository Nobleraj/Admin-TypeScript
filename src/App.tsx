import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import AddUser from './pages/AddUser';
import UserList from './pages/UserList';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/add-new-user" component={AddUser} />
        <Route path="/update-user/:id" component={AddUser} />
      </Switch>
    </Router>
  );
}

export default App;
