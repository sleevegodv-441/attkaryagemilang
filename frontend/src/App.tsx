import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Kalkulator from './pages/Kalkulator';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin
import AdminGuard from './admin/components/AdminGuard';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProjects from './admin/pages/AdminProjects';
import AdminProjectForm from './admin/pages/AdminProjectForm';
import AdminBlog from './admin/pages/AdminBlog';
import AdminBlogForm from './admin/pages/AdminBlogForm';
import AdminServices from './admin/pages/AdminServices';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import AdminFAQ from './admin/pages/AdminFAQ';
import AdminContent from './admin/pages/AdminContent';
import AdminSettings from './admin/pages/AdminSettings';
import AdminMedia from './admin/pages/AdminMedia';
import AdminMessages from './admin/pages/AdminMessages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Website */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="portfolio/:slug" element={<ProjectDetail />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:slug" element={<BlogDetail />} />
                    <Route path="kalkulator" element={<Kalkulator />} />
                    <Route path="contact" element={<Contact />} />
                </Route>

                {/* Admin Panel */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="projects/new" element={<AdminProjectForm />} />
                    <Route path="projects/:id" element={<AdminProjectForm />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="blog/new" element={<AdminBlogForm />} />
                    <Route path="blog/:id" element={<AdminBlogForm />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="testimonials" element={<AdminTestimonials />} />
                    <Route path="faq" element={<AdminFAQ />} />
                    <Route path="content" element={<AdminContent />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="media" element={<AdminMedia />} />
                    <Route path="messages" element={<AdminMessages />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
