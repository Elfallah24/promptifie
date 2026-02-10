import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import Home from './pages/Home';
import Inspiration from './pages/Inspiration';
import Tutorials from './pages/Tutorials';
import Tools from './pages/Tools';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import AffiliateProgram from './pages/AffiliateProgram';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import MagicEnhance from './pages/MagicEnhance';
import AIImageGenerator from './pages/AIImageGenerator';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black">
        <Header />
        <main className="flex-grow text-black dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/magic-enhance" element={<MagicEnhance />} />
            <Route path="/ai-image-generator" element={<AIImageGenerator />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/affiliate-program" element={<AffiliateProgram />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            {/* Auth Placeholders */}
            <Route path="/login" element={<div className="pt-32 text-center h-screen font-black text-3xl">Login Page Placeholder</div>} />
            <Route path="/signup" element={<div className="pt-32 text-center h-screen font-black text-3xl">Sign Up Page Placeholder</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;