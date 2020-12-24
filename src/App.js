import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import AddressBookForm from './components/address-book-form/address-book-form';
import Home from './components/home/home';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/add-contact/:id" component={AddressBookForm}>
            <AddressBookForm/>
          </Route>
          <Route path="/home" component={Home}>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
