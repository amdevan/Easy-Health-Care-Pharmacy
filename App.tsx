import React, { useState } from 'react';
import { ShoppingCart, Pill, Stethoscope, Truck, Heart, Phone, Store, ShieldCheck } from 'lucide-react';
import { APP_NAME, CURRENCY } from './constants';
import { Product, CartItem, ViewState } from './types';
import { PharmacistChat } from './components/PharmacistChat';
import { PrescriptionUpload } from './components/PrescriptionUpload';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const scrollToUpload = () => {
    const element = document.getElementById('upload-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView('UPLOAD');
    }
  };

  const ComingSoonSection = ({ isPage = false }: { isPage?: boolean }) => (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center ${isPage ? 'py-16' : 'py-24'}`}>
      {isPage && (
        <div className="absolute top-4 left-4">
          <button onClick={() => setView('HOME')} className="text-slate-500 hover:text-primary-600 font-semibold flex items-center gap-2">
             ← Back to Home
          </button>
        </div>
      )}
      <div className="bg-primary-50 p-8 rounded-full mb-8 ring-8 ring-primary-50/50">
        <Store className="w-20 h-20 text-primary-600" />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Pharmacy Store <span className="text-primary-600">Coming Soon</span>
      </h2>
      
      <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
        We are building a comprehensive digital pharmacy experience. Soon you will be able to browse thousands of OTC medicines, wellness products, and medical devices directly from our app.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 mx-auto text-blue-600">
            <Pill size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Complete Range</h3>
          <p className="text-slate-500">Access to a full inventory of prescription and OTC medications.</p>
        </div>
        
        <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 mx-auto text-green-600">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">100% Authentic</h3>
          <p className="text-slate-500">Directly sourced from authorized distributors with quality assurance.</p>
        </div>

        <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 mx-auto text-orange-600">
            <Truck size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Express Delivery</h3>
          <p className="text-slate-500">Fast doorstep delivery with real-time tracking integration.</p>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-8 max-w-3xl w-full flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="text-left">
          <h4 className="text-xl font-bold mb-1">Need Medicine Urgently?</h4>
          <p className="text-slate-300">You can still upload your prescription for immediate processing.</p>
        </div>
        <button 
          onClick={isPage ? () => setView('UPLOAD') : scrollToUpload}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-semibold transition-colors whitespace-nowrap shadow-lg hover:shadow-primary-500/25"
        >
          Upload Prescription
        </button>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-primary-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-primary-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-6">
                   <div className="bg-primary-500 p-2 rounded-lg mr-2">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <span className="font-bold text-2xl text-slate-800 tracking-tight">Easy<span className="text-primary-600">Health</span></span>
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Medicines, delivered</span>{' '}
                  <span className="block text-primary-600 xl:inline">safely to your doorstep.</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Easy Health Care connects you to licensed pharmacies for fast, verified, and safe medicine delivery. Upload your prescription or shop OTC essentials today.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button onClick={scrollToUpload} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-all">
                      Upload Prescription
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button onClick={() => setView('SHOP')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg transition-all">
                      Shop Medicines
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://picsum.photos/seed/medical/1600/900"
            alt="Doctor holding tablet"
          />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why Choose Us</p>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A better way to get your healthcare
            </h3>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <dt className="mt-4 text-lg leading-6 font-medium text-slate-900">Pharmacist Verified</dt>
                <dd className="mt-2 text-base text-slate-500">
                  Every order is reviewed by a licensed pharmacist for safety and interactions.
                </dd>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Truck className="h-6 w-6" />
                </div>
                <dt className="mt-4 text-lg leading-6 font-medium text-slate-900">Fast Delivery</dt>
                <dd className="mt-2 text-base text-slate-500">
                  Quick home delivery within Kathmandu Valley and express options for nearby districts.
                </dd>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Pill className="h-6 w-6" />
                </div>
                <dt className="mt-4 text-lg leading-6 font-medium text-slate-900">EasyCare 365</dt>
                <dd className="mt-2 text-base text-slate-500">
                  Automated refills for chronic conditions so you never run out of medicine.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      {/* Coming Soon Section on Home */}
      <div className="bg-slate-50 border-t border-slate-200">
        <ComingSoonSection />
      </div>

      {/* Prescription Upload Section on Home */}
      <div id="upload-section" className="bg-slate-50 pb-24 px-4">
        <PrescriptionUpload />
      </div>
    </div>
  );

  const ShopView = () => (
    <div className="animate-fade-in relative min-h-[60vh] flex items-center justify-center">
       <ComingSoonSection isPage={true} />
    </div>
  );

  const CartView = () => (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
        <div className="mb-6">
        <button onClick={() => setView('HOME')} className="text-slate-500 hover:text-primary-600 font-semibold flex items-center gap-2">
           ← Back to Home
        </button>
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <ShoppingCart className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">No items</h3>
          <p className="mt-1 text-sm text-slate-500">Get started by adding some items to your cart.</p>
          <div className="mt-6">
            <button onClick={() => setView('SHOP')} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-slate-200">
            {cart.map((item) => (
              <li key={item.id} className="p-6 flex items-center">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-slate-900">{item.name}</h3>
                    <p className="text-lg font-medium text-slate-900">{CURRENCY} {item.price * item.quantity}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-slate-500">Qty: {item.quantity}</div>
                    <button onClick={() => removeFromCart(item.id)} className="text-sm font-medium text-red-600 hover:text-red-500">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-200 p-6 bg-slate-50">
            <div className="flex justify-between text-base font-medium text-slate-900 mb-4">
              <p>Subtotal</p>
              <p>{CURRENCY} {cartTotal}</p>
            </div>
            <p className="mt-0.5 text-sm text-slate-500 mb-6">Shipping and taxes calculated at checkout.</p>
            <button className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="flex-grow">
        {view === 'HOME' && <HomeView />}
        {view === 'SHOP' && <ShopView />}
        {view === 'UPLOAD' && (
            <div className="relative">
                 <div className="absolute top-4 left-4 z-10">
                    <button onClick={() => setView('HOME')} className="text-slate-500 hover:text-primary-600 font-semibold flex items-center gap-2">
                    ← Back to Home
                    </button>
                </div>
                <PrescriptionUpload />
            </div>
        )}
        {view === 'CART_PAGE' && <CartView />}
      </div>
      <PharmacistChat />
    </div>
  );
};

export default App;