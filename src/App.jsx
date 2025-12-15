import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import Category from './pages/Category';
import WorksByYear from './pages/WorksByYear';
import ProductsNew from './pages/ProductsNew';
import ProductsPopular from './pages/ProductsPopular';
import ProductsSale from './pages/ProductsSale';
import Cart from "./pages/Cart";
import CheckoutReview from "./pages/CheckoutReview";
import CheckoutDetails from "./pages/CheckoutDetails";
import { CartProvider } from './context/CartContext';

import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export default function App(){
  return (
    <CartProvider>
      <Header />
      <Routes>
        {/* Pagrindas */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        {/* Krepšelis ir apmokėjimas */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/review" element={<CheckoutReview />} />
        <Route path="/checkout/details" element={<CheckoutDetails />} />

        {/* Produktų sub-puslapiai */}
        <Route path="/produktai/nauji" element={<ProductsNew />} />
        <Route path="/produktai/populiariausi" element={<ProductsPopular />} />
        <Route path="/produktai/nuolaidos" element={<ProductsSale />} />

        {/* Kategorijos (derink su nuorodomis: /kategorija/:slug) */}
        <Route path="/kategorija/:slug" element={<Category />} />

        {/* Atlikti darbai */}
        <Route path="/darbai/:year" element={<WorksByYear />} />

        {/* Informaciniai puslapiai */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}
