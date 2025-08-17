import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Sliders, X } from "lucide-react";

const MENU = [
  { id: 1, category: "Drinks", name: "Cappuccino", price: "$4", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80" },
  { id: 2, category: "Drinks", name: "Latte", price: "$4.5", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80" },
  { id: 3, category: "Breakfast", name: "Avocado Toast", price: "$6", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80" },
  { id: 4, category: "Desserts", name: "Blueberry Muffin", price: "$3", img: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=600&q=80" },
  { id: 5, category: "Lunch", name: "Grilled Panini", price: "$8", img: "https://images.unsplash.com/photo-1543332164-8e3f1d5f3f6f?auto=format&fit=crop&w=600&q=80" },
  { id: 6, category: "Desserts", name: "Chocolate Tart", price: "$5", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80" },
];

const categories = ["All", "Drinks", "Breakfast", "Lunch", "Desserts"];

export default function Menu({ cart, addToCart, removeFromCart }) {
  const [filter, setFilter] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const cartRef = useRef(null);
  const filterRef = useRef(null);

  const filteredMenu = filter === "All" ? MENU : MENU.filter((item) => item.category === filter);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  // Close cart or mobile filter popup on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowMobileFilters(false);
      }
    };
    if (showCart || showMobileFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCart, showMobileFilters]);

  // Close cart automatically if empty
  useEffect(() => {
    if (totalItems === 0) setShowCart(false);
  }, [totalItems]);

  return (
    <div id="menu" className="py-12 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-3xl font-bold text-left mb-6 flex items-center justify-between">
          Our Menu
          {/* Mobile Filter Icon */}
          <button
            className="sm:hidden p-2 bg-gray-200 rounded-full hover:bg-gray-300 relative z-50"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Sliders />
          </button>
        </h2>

        {/* Desktop Filters */}
        <div className="hidden sm:flex justify-left gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl transition ${
                filter === cat ? "bg-gray-800 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown Filter */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              ref={filterRef}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute top-12 right-0 w-40 bg-white shadow-xl rounded-xl p-3 z-50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Filters</span>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                      setShowMobileFilters(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-left transition ${
                      filter === cat ? "bg-gray-800 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenu.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer flex flex-col transition"
            >
              <img src={item.img} alt={item.name} className="h-32 w-full object-cover" />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.price}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  {cart[item.id] ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(item)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm">{cart[item.id]}</span>
                      <button onClick={() => addToCart(item)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <motion.button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-gray-800 text-white p-4 rounded-full shadow-xl flex items-center gap-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <ShoppingCart />
          <span>{totalItems}</span>
        </motion.button>
      )}

      {/* Cart Popup */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            ref={cartRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 bg-white shadow-2xl rounded-2xl p-6 w-80 z-50"
          >
            <button onClick={() => setShowCart(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <Minus size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-4">Your Cart</h3>

            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
              {Object.keys(cart).map((id) => {
                const item = MENU.find((m) => m.id === parseInt(id));
                const totalPerItem = parseFloat(item.price.slice(1)) * cart[id];
                return (
                  <div key={id} className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500">
                        {cart[id]} x {item.price} = ${totalPerItem.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(item)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                        <Minus size={14} />
                      </button>
                      <span>{cart[id]}</span>
                      <button onClick={() => addToCart(item)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-between font-semibold text-gray-800">
              <span>Subtotal:</span>
              <span>
                $
                {Object.keys(cart)
                  .reduce((sum, id) => {
                    const item = MENU.find((m) => m.id === parseInt(id));
                    return sum + parseFloat(item.price.slice(1)) * cart[id];
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>

            <a
              href="#reserve"
              onClick={() => setShowCart(false)}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 text-center block"
            >
              Reserve Table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { MENU };
