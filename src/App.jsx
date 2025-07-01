import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Components
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Pages
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailsPage from '@/pages/ProjectDetailsPage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';

// Admin Pages
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminServices from '@/pages/admin/AdminServices';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminContent from '@/pages/admin/AdminContent';
import AdminFAQ from '@/pages/admin/AdminFAQ';
import AdminRequests from '@/pages/admin/AdminRequests';
import AdminUsers from '@/pages/admin/AdminUsers';
import SystemSettings from '@/pages/admin/SystemSettings';

// Client Pages
import ClientLayout from '@/pages/client/ClientLayout';
import ClientDashboard from '@/pages/client/ClientDashboard';
import ClientProjects from '@/pages/client/ClientProjects';
import ClientProfile from '@/pages/client/ClientProfile';
import ClientRequestService from '@/pages/client/ClientRequestService';

const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ClientProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'client') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>منصة مهندز - منصتك المتكاملة للخدمات الهندسية</title>
        <meta name="description" content="منصة مهندز هي منصتك المتكاملة للخدمات الهندسية المتخصصة في المملكة العربية السعودية. نصمم لك المستقبل بدقة وإبداع." />
      </Helmet>
      
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <Router key="main">
            <div className="min-h-screen bg-background flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  
                  <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="requests" element={<AdminRequests />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="faq" element={<AdminFAQ />} />
                    <Route path="content" element={<AdminContent />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="settings" element={<SystemSettings />} />
                  </Route>

                  <Route path="/client-dashboard" element={<ClientProtectedRoute><ClientLayout /></ClientProtectedRoute>}>
                    <Route index element={<ClientDashboard />} />
                    <Route path="projects" element={<ClientProjects />} />
                    <Route path="profile" element={<ClientProfile />} />
                    <Route path="new-request" element={<ClientRequestService />} />
                  </Route>

                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        )}
      </AnimatePresence>
      
      <Toaster />
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;