import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Article from "./components/Article"
import HomePage from './pages/home';
import TechPage from './pages/tech'
import ReviewsPage from './pages/reviews'
import EntertainmentPage from './pages/entertainment'
import AiPage from './pages/ai'
import ProfilesPage from './pages/profiles';
import SearchPage from './pages/search'
import ContactPage from './pages/contact'
import ThankYouPage from './pages/thank-you'
import NotFoundPage from './pages/notFound'
import ThemeProvider from './utils/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async'


const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <HelmetProvider>
          <div className='main-wrapper'>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:pageNumber" element={<HomePage />} />
              <Route path="/tech" element={<TechPage />} />
              <Route path="/tech/:pageNumber" element={<TechPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/reviews/:pageNumber" element={<ReviewsPage />} />
              <Route path="/entertainment" element={<EntertainmentPage />} />
              <Route path="/entertainment/:pageNumber" element={<EntertainmentPage />} />
              <Route path="/ai" element={<AiPage />} />
              <Route path="/ai/:pageNumber" element={<AiPage />} />
              <Route path="/search/:tag" element={<SearchPage />} />
              <Route path="/search/:tag/:pageNumber" element={<SearchPage />} />
              <Route path="/profiles" element={<ProfilesPage />} />
              <Route path="/contact" element={<ContactPage />} /> 
              <Route path='/thank-you' element={<ThankYouPage />} />
              <Route path="/article/:articleUrl" element={<Article />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </HelmetProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;