
import './App.css';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ConnexionAdmin from './components/ConnexionAdmin';
import InscriptionAdmin from './components/InscriptionAdmin';
import AjoutCategorie from './components/AjoutCategorie';
import AjoutProduit from './components/AjoutProduit';
import Panier from './components/Panier'
import ProduitsAdmin from './components/ProduitsAdmin';
import Home from './components/Home';
import ProductDescription from './components/ProductDescription';
import Header from './components/Header'
import ClientProfile from './components/ClientProfile';
import Filter from './components/Filter'
import ClientsAdmin from './components/ClientsAdmin';
import MesPaniers from './components/MesPaniers';
import Footer from './components/Footer';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import ProtectedRouteClient from './components/ProtectedRouteClient';







function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-up' component={Inscription} />
          <Route exact path='/sign-in' component={Connexion} />
          <Route exact path='/admin/sign-up' component={InscriptionAdmin} />
          <Route exact path='/admin/sign-in' component={ConnexionAdmin} />
          
          <ProtectedRouteAdmin exact path='/admin/addcategorie' component={AjoutCategorie} />
          <ProtectedRouteClient exact path='/mespaniers' component={MesPaniers} />
          <ProtectedRouteAdmin exact path='/admin/produistadmin' component={ProduitsAdmin} />
          <Route exact path='/filter' component={Filter} />
          <ProtectedRouteAdmin exact path='/admin/editclient/:id' component={ClientsAdmin} />
          <ProtectedRouteClient exact path='/profile/' component={ClientProfile} />
          <ProtectedRouteAdmin exact path='/admin/addproduct' component={AjoutProduit} />
          <ProtectedRouteClient exact path='/panier' component={Panier} />
          <Route exact path='/:id' component={ProductDescription} />
        </Switch>
        <Footer /> 
       
         
      </div>
    </BrowserRouter>
  );
}

export default App;
