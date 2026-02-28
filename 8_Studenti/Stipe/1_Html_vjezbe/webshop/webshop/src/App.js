import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Proizvod 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Proizvod 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Proizvod 3", image: "https://via.placeholder.com/150" },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const addNewProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', display: 'flex', gap: '1rem' }}>
        <Link style={{ color: 'white' }} to="/">Naslovnica</Link>
        <Link style={{ color: 'white' }} to="/proizvodi">Proizvodi</Link>
        <Link style={{ color: 'white' }} to="/kontakt">Kontakt</Link>
        <Link style={{ color: 'white' }} to="/admin">Dodaj proizvod</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proizvodi" element={<Products products={products} addToCart={addToCart} />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/admin" element={<Admin addNewProduct={addNewProduct} />} />
      </Routes>
    </Router>
  );
};

const Home = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Dobrodošli u naš web shop!</h1>
    <p>Ovdje ide proizvoljni tekst koji ćete kasnije promijeniti.</p>
  </div>
);

const Products = ({ products, addToCart }) => (
  <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
    {products.map((product) => (
      <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h2>
        <button onClick={() => addToCart(product)} style={{ backgroundColor: '#007BFF', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
          Dodaj u košaricu
        </button>
      </div>
    ))}
    {products.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Nema dostupnih proizvoda.</p>}
  </div>
);

const Contact = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Kontakt</h2>
    <p>Email: primjer@email.com</p>
  </div>
);

const Admin = ({ addNewProduct }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name,
      image,
    };
    addNewProduct(newProduct);
    setName("");
    setImage("");
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Dodaj novi proizvod</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Naziv proizvoda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="url"
          placeholder="URL slike"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '4px' }}>
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default App;