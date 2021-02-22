
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
// import HeaderHome from './components/HeaderHome'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import SignInAdmin from './components/SignInAdmin';
import SignUpAdmin from './components/SignUpAdmin';
import AddCategorie from './components/AddCategorie';
import AddProduct from './components/AddProduct'; 
// import ProtectedRoute from './components/ProtectedRoute'
import Panier from './components/Panier'
import ProductsAdmin from './components/ProductsAdmin';
import Home from './components/Home';
import ProductDescription from './components/ProductDescription';
import Header from './components/Header'
import ClientProfile from './components/ClientProfile';
import Filter from './components/Filter'
import DashboardAdmin from './components/DashboardAdmin';
import ClientsAdmin from './components/ClientsAdmin';
import  MesPaniers  from './components/MesPaniers';
import Footer from './components/Footer';
// import HeaderHome from './components/HeaderHome';


function App() {
  return ( 
    <BrowserRouter>
    <div className="App">
       <Header/>  
      {/* <HeaderHome/> */}
      
        <Switch> 
        <Route exact path='/' component={Home}/>
        <Route exact path='/sign-up' component={SignUp}/> 
        <Route exact path='/sign-in' component={SignIn}/> 
        <Route exact path='/admin/sign-up' component={SignUpAdmin}/> 
        <Route exact path='/admin/sign-in' component={SignInAdmin}/>
        <Route exact path='/admin/addcategorie' component={AddCategorie}/>
        
        <Route exact path='/mespaniers' component={MesPaniers}/>
        {/* <Route exact path='/editclients' component={EditClients}/> */}
        <Route exact path='/admin/produistadmin' component={ProductsAdmin}/>
        <Route exact path='/admin/dashboard' component={DashboardAdmin}/>
        <Route exact path='/filter' component={Filter}/> 
      
        <Route exact path='/admin/editclient/:id' component={ClientsAdmin}/>
        <Route exact path='/profile/' component={ClientProfile}/> 
        <Route exact path='/admin/addproduct' component={AddProduct}/> 
        <Route exact path='/panier' component={Panier}/>
        <Route exact path='/:id' component={ProductDescription}/>
        
    
      </Switch>
      <Footer/>
    </div> 
    </BrowserRouter>
  );
}

export default App;
