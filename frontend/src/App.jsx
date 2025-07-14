import React from 'react'
import ReactDOM from 'react-dom';
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order';
import Navbar from './components/Navbar'
import Product from "./pages/Product"
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      {/* Toast Container with custom styling */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-lg shadow-lg"
      />
      
      {/* Navigation */}
      <div className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm'>
        <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Navbar />
        </div>
      </div>
      
      {/* Search Bar */}
      <SearchBar />
      
      {/* Main Content */}
      <main className='min-h-screen'>
        <Routes>
          <Route path='/' element={
            <div className='w-full'>
              <Home/>
            </div>
          } />
          <Route path='/collection' element={
            <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
              <Collection/>
            </div>
          } />
          <Route path='/about' element={
            <div className='w-full'>
              <About/>
            </div>
          } />
          <Route path='/contact' element={
            <div className='w-full'>
              <Contact/>
            </div>
          } />
          <Route path='/product/:productId' element={
            <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
              <Product/>
            </div>
          } />
          <Route path='/cart' element={
            <div className='w-full'>
              <Cart/>
            </div>
          } />
          <Route path='/login' element={
            <div className='w-full'>
              <Login/>
            </div>
          } />
          <Route path='/place-Order' element={
            <div className='w-full'>
              <PlaceOrder/>
            </div>
          } />
          <Route path='/Orders' element={
            <div className='w-full'>
              <Order/>
            </div>
          } />
          <Route path="/order" element={
            <div className='w-full'>
              <Order />
            </div>
          } />
          <Route path="/verify" element={
            <div className='w-full'>
              <Verify />
            </div>
          } />
          <Route path="/profile" element={
            <div className='w-full'>
              <Profile />
            </div>
          } />
        </Routes>
      </main>
      
      {/* Footer */}
      <Footer/>
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  )
}

// Scroll to top component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

export default App

