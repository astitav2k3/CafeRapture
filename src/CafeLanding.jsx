import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu, { MENU } from "./components/Menu"; // export MENU from Menu.jsx
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import ReservationForm from "./components/ReservationForm";

export default function CafeLanding() {
  const [cart, setCart] = useState({}); // { id: quantity }

  const addToCart = (item) => {
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      if (!prev[item.id]) return prev;
      const updated = { ...prev };
      if (updated[item.id] === 1) delete updated[item.id];
      else updated[item.id] -= 1;
      return updated;
    });
  };

  // Convert cart object to selectedItems array for ReservationForm
  const selectedItems = Object.keys(cart).map((id) => {
    const item = MENU.find((m) => m.id === parseInt(id));
    return { ...item, quantity: cart[id] };
  });

  // Handler for updating quantity from Pre-Order list
  const updateItemQuantity = (item, qty) => {
    if (qty <= 0) removeFromCart(item);
    else setCart((prev) => ({ ...prev, [item.id]: qty }));
  };

  return (
    <div className="font-sans">
      <Hero />
      <About />
      <Menu cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
      <Gallery />
      <Reviews />
      <ReservationForm
        selectedItems={selectedItems}
        onUpdateItem={updateItemQuantity}
      />
    </div>
  );
}
