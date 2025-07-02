
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/Auth';
import { LanguageProvider } from '@/contexts/LanguageContext';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
import UpdatePasswordPage from '@/pages/UpdatePasswordPage';

import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminServices from '@/pages/admin/AdminServices';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminContent from '@/pages/admin/AdminContent';
import AdminFAQ from '@/pages/admin/AdminFAQ';
import AdminRequests from '@/pages/admin/AdminRequests';
import AdminUsers from '@/pages/admin/AdminUsers';
import SystemSettings from '@/pages/admin/SystemSettings';

import ClientLayout from '@/pages/client/ClientLayout';
import ClientDashboard from '@/pages/client/ClientDashboard';
import ClientProjects from '@/pages/client/ClientProjects';
import ClientProfile from '@/pages/client/ClientProfile';
import ClientRequestService from '@/pages/client/ClientRequestService';
import { useToast } from './components/ui/use-toast';

const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <div className="flex justify-center items-center space-x-2 space-x-reverse">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 bg-accent rounded-full"
              />
            ))}
          </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
     toast({
      title: "غير مصرح",
      description: "يجب أن تكون مسؤولاً للوصول لهذه الصفحة.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ClientProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <div className="flex justify-center items-center space-x-2 space-x-reverse">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 bg-accent rounded-full"
              />
            ))}
          </div>
      </div>
    );
  }

  if (!user) {
    toast({
      title: "مطلوب تسجيل الدخول",
      description: "الرجاء تسجيل الدخول للوصول لهذه الصفحة.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Helmet>
          <title>منصة مهندز - منصتك المتكاملة للخدمات الهندسية</title>
          <meta name="description" content="منصة مهندز هي منصتك المتكاملة للخدمات الهندسية المتخصصة في المملكة العربية السعودية. نصمم لك المستقبل بدقة وإبداع." />
        </Helmet>
        
        <Router>
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
                  <Route path="/update-password" element={<UpdatePasswordPage />} />
                  
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
        <Toaster />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
