import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import PrivateRoute from "@/routes/PrivateRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import CaseStudies from "@/pages/CaseStudies";
import Pricing from "@/pages/Pricing";
import Testimonials from "@/pages/Testimonials";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import FAQs from "@/pages/FAQs";
import Career from "@/pages/Career";
import Contact from "@/pages/Contact";
import OrderService from "@/pages/OrderService";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminOrders from "@/pages/admin/Orders";
import AdminProjects from "@/pages/admin/Projects";
import AdminServices from "@/pages/admin/Services";
import AdminBlogs from "@/pages/admin/Blogs";
import AdminMessages from "@/pages/admin/Messages";
import AdminTestimonials from "@/pages/admin/Testimonials";
import AdminSettings from "@/pages/admin/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-service" element={<OrderService />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}
