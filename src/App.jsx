import { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound'; 
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories')
        ]);
        setProducts(productsRes.data);
        setAllProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const inCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return inCategory && matchesSearch;
    });

    setProducts(filtered);
  }, [selectedCategory, searchTerm, allProducts]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          suggestions={allProducts.map(p => p.title)}
        />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <div>
                  <h1>QuamStore Best Sellers</h1>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="category-select" style={{ marginRight: '0.5rem' }}>
                      Filter by category:
                    </label>
                    <select
                      id="category-select"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="all">All</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isLoading ? (
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                      <div className="spinner" />
                      <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#999' }}>Loading products...</p>
                    </div>
                  ) : products.length === 0 ? (
                    <p style={{ fontStyle: 'italic', color: '#888' }}>
                      No products found matching "{searchTerm}"
                    </p>
                  ) : (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1.5rem',
                      }}
                    >
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
