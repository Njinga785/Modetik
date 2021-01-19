
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HeaderHome from './components/HeaderHome'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import SignInAdmin from './components/SignInAdmin';
import SignUpAdmin from './components/SignUpAdmin';
import AddCategorie from './components/AddCategorie';
import AddProduct from './components/AddProduct'; 
import ProtectedRoute from './components/ProtectedRoute'
// import HeaderAdmin from './components/HeaderAdmin';
import Home from './components/Home';
import ProductDescription from './components/ProductDescription';
// import ClientProfile from './components/ClientProfile';

function App() {
  return ( 
    <BrowserRouter>
    <div className="App">
      <HeaderHome/> 
      
        <Switch> 
        <Route exact path='/' component={Home}/>
        <Route exact path='/sign-up' component={SignUp}/> 
        <Route exact path='/sign-in' component={SignIn}/> 
        <Route exact path='/sign-upAdmin' component={SignUpAdmin}/> 
        <Route exact path='/sign-inAdmin' component={SignInAdmin}/>
        <Route exact path='/addcategorie' component={AddCategorie}/>
        <ProtectedRoute exact path='/addproduct' component={AddProduct}/>
        <Route exact path='/:id' component={ProductDescription}/>
        {/* <Route exact path='/clientProfile' component={ClientProfile}/> */}
    
      </Switch>
    
    </div> 
    </BrowserRouter>
  );
}

export default App;
