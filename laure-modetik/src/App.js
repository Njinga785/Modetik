
import './App.css';
import SignInClients from './components/SignInClients';
import SignUp from './components/SignUp';
import HeaderHome from './components/HeaderHome'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import SignInAdmin from './components/SignInAdmin';
import SignUpAdmin from './components/SignUpAdmin';
import AddCategorie from './components/AddCategorie';
import AddProduct from './components/AddProduct';

function App() {
  return ( 
    <BrowserRouter>
    <div className="App">
      <HeaderHome/> 
        <Switch> 
        <Route exact path='/sign-up' component={SignUp}/> 
        <Route exact path='/sign-in' component={SignInClients}/> 
        <Route exact path='/sign-upAdmin' component={SignUpAdmin}/> 
        <Route exact path='/sign-inAdmin' component={SignInAdmin}/>
        <Route exact path='/addcategorie' component={AddCategorie}/>
        <Route exact path='/addproduct' component={AddProduct}/>
    
    
        </Switch>
    
    </div> 
    </BrowserRouter>
  );
}

export default App;
