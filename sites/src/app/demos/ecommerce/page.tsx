"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Input } from "@/components/ui";
import { generateMockProducts, formatCurrency } from "@/lib/utils";

const demo = DEMOS.find((d) => d.id === "ecommerce")!;
const products = generateMockProducts(12);

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function ECommerceDemo() {
  const [view, setView] = useState<"store" | "cart" | "checkout" | "admin">("store");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState("all");

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const cartTotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category);

  return (
    <DemoLayout demo={demo}>
      {/* Store Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🛍️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">StyleVault</h1>
            <p className="text-gray-600">Premium lifestyle products</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={view === "store" ? "primary" : "secondary"} size="sm" onClick={() => setView("store")}>
            Store
          </Button>
          <Button variant={view === "cart" ? "primary" : "secondary"} size="sm" onClick={() => setView("cart")}>
            Cart ({cartCount})
          </Button>
          <Button variant={view === "admin" ? "primary" : "secondary"} size="sm" onClick={() => setView("admin")}>
            Admin
          </Button>
        </div>
      </div>

      {view === "store" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["all", "Electronics", "Accessories", "Clothing", "Home"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat ? "bg-emerald-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat === "all" ? "All Products" : cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} padding="none" hover>
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                    {product.category === "Electronics" ? "🎧" : product.category === "Clothing" ? "👕" : product.category === "Home" ? "🏠" : "👜"}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="success">{product.category}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-400 text-sm">
                      {"★".repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</span>
                    <Button size="sm" onClick={() => addToCart(product)}>Add</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {view === "cart" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500">Your cart is empty</p>
                  <Button className="mt-4" onClick={() => setView("store")}>Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                        🛍️
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600 hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div>
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatCurrency(cartTotal * 0.08)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal * 1.08)}</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => setView("checkout")} disabled={cart.length === 0}>
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      )}

      {view === "checkout" && (
        <div className="max-w-2xl mx-auto">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Checkout</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First name" />
                  <Input placeholder="Last name" />
                  <div className="col-span-2">
                    <Input placeholder="Address" />
                  </div>
                  <Input placeholder="City" />
                  <Input placeholder="ZIP code" />
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Payment</h3>
                <div className="space-y-4">
                  <Input placeholder="Card number" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVC" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal * 1.08)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={() => { setCart([]); setView("store"); alert("Order placed! (Demo)"); }}>
                  Place Order
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {view === "admin" && (
        <>
          <DemoSection title="Inventory Management">
            <Card padding="none">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.slice(0, 6).map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">🛍️</div>
                            <span className="font-medium text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{product.category}</td>
                        <td className="px-6 py-4 font-medium">{formatCurrency(product.price)}</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4">
                          <Badge variant={product.stock > 20 ? "success" : product.stock > 5 ? "warning" : "danger"}>
                            {product.stock > 20 ? "In Stock" : product.stock > 5 ? "Low Stock" : "Critical"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </DemoSection>
        </>
      )}
    </DemoLayout>
  );
}
