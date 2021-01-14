
import './App.css';
import SignInClients from './components/SignInClients';
import SignUp from './components/SignUp';
import HeaderHome from './components/HeaderHome'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import SignInAdmin from './components/SignInAdmin';
import SignUpAdmin from './components/SignUpAdmin';
import AddCategorie from './components/AddCategorie';
import AddProduct from './components/AddProduct'; 
// import HeaderAdmin from './components/HeaderAdmin';
import Home from './components/Home';
import ProductDescription from './components/ProductDescription';

function App() {
  return ( 
    <BrowserRouter>
    <div className="App">
      <HeaderHome/> 
      
        <Switch> 
        <Route exact path='/' component={Home}/>
        <Route exact path='/sign-up' component={SignUp}/> 
        <Route exact path='/sign-inClients' component={SignInClients}/> 
        <Route exact path='/sign-upAdmin' component={SignUpAdmin}/> 
        <Route exact path='/sign-inAdmin' component={SignInAdmin}/>
        <Route exact path='/addcategorie' component={AddCategorie}/>
        <Route exact path='/addproduct' component={AddProduct}/>
        <Route path='/:id' component={ProductDescription}/>
    
      </Switch>
    
    </div> 
    </BrowserRouter>
  );
}

export default App;
