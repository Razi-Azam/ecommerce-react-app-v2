import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ProductList from './components/product-list/ProductList';
import ProductDetails from './components/product-details/ProductDetails';
import Cart from './components/cart/Cart';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
