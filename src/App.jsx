import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import CV from './pages/CV.jsx';
import Cursor from './components/Cursor.jsx';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  return (
    <>
      <Cursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/projects/:slug" element={<PageTransition><ProjectPage /></PageTransition>} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
