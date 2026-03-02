/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate 
} from "react-router-dom";
import { 
  Stethoscope, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail,
  Smartphone,
  Monitor,
  Plus,
  Trash2,
  Settings,
  LayoutDashboard,
  LogOut,
  Save,
  Lock,
  User,
  AlertCircle,
  Send,
  CheckCircle2,
  Inbox,
  Calendar
} from "lucide-react";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link to="/" className="font-serif italic text-xl">MA.</Link>
      <div className="flex gap-8 text-sm font-medium text-brand-text-dim">
        <a href="#about" className="hover:text-brand-accent transition-colors">About</a>
        <a href="#projects" className="hover:text-brand-accent transition-colors">Projects</a>
        <a href="#skills" className="hover:text-brand-accent transition-colors">Skills</a>
        <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
        <Link to="/admin" className="text-brand-accent/50 hover:text-brand-accent transition-colors flex items-center gap-1">
          <Settings className="w-3 h-3" /> Admin
        </Link>
      </div>
    </div>
  </nav>
);

const PortfolioView = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/projects").then(res => res.json()).then(setProjects);
    fetch("/api/skills").then(res => res.json()).then(setSkills);
    fetch("/api/stats").then(res => res.json()).then(setStats);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setSubmitStatus("success");
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 pt-32">
        {/* Hero Section */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mono-label mb-4">Personal Brand Strategist & Medical Student</div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-8">
                Menjembatani <span className="text-brand-accent">Kedokteran Gigi</span> & Teknologi.
              </h1>
              <p className="text-xl text-brand-text-dim leading-relaxed mb-10 max-w-lg">
                Mengakselerasi literasi kesehatan digital melalui analisis kritis dan strategi komunikasi yang berdampak nyata.
              </p>
              <div className="flex gap-4">
                <button className="bg-brand-accent text-brand-bg px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                  Hubungi Saya <ArrowUpRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4 px-4">
                  <Linkedin className="w-6 h-6 text-brand-text-dim hover:text-white cursor-pointer" />
                  <Github className="w-6 h-6 text-brand-text-dim hover:text-white cursor-pointer" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden glass-card relative z-10">
                <img 
                  src="https://www.pexels.com/id-id/foto/pemeriksaan-gigi-3845745/" 
                  alt="Muamar Azriel - Dentistry Aesthetic" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-8 text-center">
              <div className="text-4xl font-bold text-brand-accent mb-2">{stat.value}</div>
              <div className="mono-label opacity-60">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* About Narrative */}
        <section id="about" className="mb-32">
          <div className="max-w-3xl">
            <div className="mono-label mb-4">The Narrative</div>
            <h2 className="text-3xl font-bold mb-8 italic font-serif">"Presisi Medis, Pola Pikir Analitis."</h2>
            <div className="space-y-6 text-lg text-brand-text-dim leading-relaxed">
              <p>
                Sebagai mahasiswa Kedokteran Gigi di Universitas Jenderal Soedirman, saya tidak hanya melihat kesehatan dari sisi klinis. Latar belakang saya di Assyifa Boarding School membentuk disiplin dan loyalitas tinggi, yang kini saya transformasikan menjadi pendekatan problem-solving yang sistematis.
              </p>
              <p>
                Saya percaya bahwa tantangan kesehatan gigi di Indonesia bukan hanya soal teknis medis, melainkan soal <span className="text-white font-medium">kesenjangan informasi</span>. Dengan keahlian analitik dan komunikasi, saya menjembatani data medis yang kompleks menjadi strategi edukasi digital yang kredibel dan mudah dicerna oleh masyarakat luas.
              </p>
            </div>
          </div>
        </section>

        {/* Project Showcases */}
        <section id="projects" className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="mono-label mb-4">Selected Work</div>
              <h2 className="text-4xl font-bold">Project Showcases</h2>
            </div>
          </div>

          <div className="grid gap-8">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass-card overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={project.image_url || "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800"} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent md:hidden" />
                  </div>
                  <div className="p-8 md:p-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-brand-accent/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-8">{project.title}</h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="star-grid">
                        <span className="mono-label opacity-40">Situation</span>
                        <p className="text-brand-text-dim">{project.situation}</p>
                      </div>
                      <div className="star-grid">
                        <span className="mono-label opacity-40">Result</span>
                        <p className="text-white font-semibold">{project.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Taxonomy */}
        <section id="skills" className="mb-32">
          <div className="mono-label mb-4">Capabilities</div>
          <h2 className="text-4xl font-bold mb-12">Skills Taxonomy</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <div key={i} className="glass-card p-8">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                  {skill.category === "Communicative" ? <MessageSquare className="w-5 h-5" /> : 
                   skill.category === "Critical & Analytic" ? <Search className="w-5 h-5" /> : 
                   <ShieldCheck className="w-5 h-5" />}
                </div>
                <h3 className="text-xl font-bold mb-6">{skill.category}</h3>
                <ul className="space-y-4">
                  {skill.items.map((item: string) => (
                    <li key={item} className="flex items-center gap-3 text-brand-text-dim">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-32">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="mono-label mb-4">Get In Touch</div>
              <h2 className="text-4xl font-bold mb-8 italic font-serif">Ayo Berkolaborasi.</h2>
              <p className="text-lg text-brand-text-dim leading-relaxed mb-12">
                Apakah Anda seorang recruiter, calon klien, atau rekan profesional yang ingin mendiskusikan inovasi kesehatan digital? Saya selalu terbuka untuk peluang baru.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm mono-label opacity-60">Email</div>
                    <div className="text-white font-medium">muamar.azriel@example.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm mono-label opacity-60">LinkedIn</div>
                    <div className="text-white font-medium">linkedin.com/in/muamarazriel</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 md:p-10">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs mono-label opacity-60">Nama Lengkap</label>
                    <input 
                      type="text"
                      className="w-full bg-brand-bg border border-white/10 rounded-xl p-4 focus:border-brand-accent outline-none transition-all"
                      placeholder="John Doe"
                      value={contactForm.name}
                      onChange={e => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs mono-label opacity-60">Email Address</label>
                    <input 
                      type="email"
                      className="w-full bg-brand-bg border border-white/10 rounded-xl p-4 focus:border-brand-accent outline-none transition-all"
                      placeholder="john@example.com"
                      value={contactForm.email}
                      onChange={e => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs mono-label opacity-60">Subject</label>
                  <input 
                    type="text"
                    className="w-full bg-brand-bg border border-white/10 rounded-xl p-4 focus:border-brand-accent outline-none transition-all"
                    placeholder="Peluang Kolaborasi"
                    value={contactForm.subject}
                    onChange={e => setContactForm({...contactForm, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs mono-label opacity-60">Pesan</label>
                  <textarea 
                    className="w-full bg-brand-bg border border-white/10 rounded-xl p-4 focus:border-brand-accent outline-none transition-all h-32 resize-none"
                    placeholder="Tuliskan pesan Anda di sini..."
                    value={contactForm.message}
                    onChange={e => setContactForm({...contactForm, message: e.target.value})}
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    submitStatus === "success" ? "bg-green-500 text-white" : 
                    submitStatus === "error" ? "bg-red-500 text-white" : 
                    "bg-brand-accent text-brand-bg hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? "Mengirim..." : 
                   submitStatus === "success" ? <><CheckCircle2 className="w-5 h-5" /> Terkirim!</> : 
                   submitStatus === "error" ? "Gagal Mengirim" : 
                   <><Send className="w-5 h-5" /> Kirim Pesan</>}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Tech Stack Footer */}
        <section className="border-t border-white/5 pt-20 text-center">
          <div className="mono-label mb-8">Powered By</div>
          <div className="flex justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center gap-2">
              <Monitor className="w-8 h-8" />
              <span className="text-[10px] font-mono">Workstation</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Smartphone className="w-8 h-8" />
              <span className="text-[10px] font-mono">Mobile Ops</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Stethoscope className="w-8 h-8" />
              <span className="text-[10px] font-mono">Clinical Tech</span>
            </div>
          </div>
          
          <div className="mt-20 text-brand-text-dim text-sm">
            © {new Date().getFullYear()} Muamar Azriel. Crafted for Impact.
          </div>
        </section>
      </main>
    </div>
  );
};

const AdminView = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("projects");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [newProject, setNewProject] = useState({
    title: "", situation: "", task: "", action: "", result: "", tags: "", image_url: ""
  });
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch("/api/projects").then(res => res.json()).then(setProjects);
    fetch("/api/stats").then(res => res.json()).then(setStats);
    fetch("/api/messages").then(res => res.json()).then(setMessages);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("admin-token");
    if (token === "admin-session-token") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      
      const data = await res.json();

      if (!res.ok) {
        // Clear password on failure
        setLoginForm(prev => ({ ...prev, password: "" }));
        
        if (res.status === 401) {
          setLoginError(data.message || "Username atau password salah.");
        } else if (res.status === 500) {
          setLoginError("Server sedang mengalami gangguan internal (Error 500). Mohon hubungi administrator.");
        } else if (res.status === 400) {
          setLoginError(data.message || "Data login tidak lengkap.");
        } else {
          setLoginError(data.message || "Terjadi kesalahan pada server. Silakan coba lagi.");
        }
        return;
      }

      if (data.success) {
        sessionStorage.setItem("admin-token", data.token);
        setIsAuthenticated(true);
        fetchData();
      }
    } catch (err) {
      setLoginForm(prev => ({ ...prev, password: "" }));
      setLoginError("Gagal terhubung ke server. Pastikan koneksi internet stabil.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-token");
    setIsAuthenticated(false);
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-card p-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-brand-accent" />
            </div>
            <h2 className="text-2xl font-bold">Admin Login</h2>
            <p className="text-brand-text-dim text-sm mt-2">Restricted Area - Please Authenticate</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="mono-label opacity-60">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim" />
                <input 
                  type="text"
                  className="w-full bg-brand-bg border border-white/10 rounded-xl p-3 pl-10 focus:border-brand-accent outline-none transition-all"
                  value={loginForm.username}
                  onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="mono-label opacity-60">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim" />
                <input 
                  type="password"
                  className="w-full bg-brand-bg border border-white/10 rounded-xl p-3 pl-10 focus:border-brand-accent outline-none transition-all"
                  value={loginForm.password}
                  onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" /> {loginError}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-brand-accent text-brand-bg font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Authenticate
            </button>
          </form>

          <button 
            onClick={() => navigate("/")}
            className="w-full mt-6 text-brand-text-dim hover:text-white text-sm transition-colors"
          >
            Back to Portfolio
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = { ...newProject, tags: newProject.tags.split(",").map(t => t.trim()) };
    
    if (editingProjectId) {
      await fetch(`/api/projects/${editingProjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
      });
      setEditingProjectId(null);
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
      });
    }
    
    setNewProject({ title: "", situation: "", task: "", action: "", result: "", tags: "", image_url: "" });
    fetchData();
  };

  const handleEditProject = (project: any) => {
    setEditingProjectId(project.id);
    setNewProject({
      title: project.title,
      situation: project.situation,
      task: project.task,
      action: project.action,
      result: project.result,
      tags: project.tags.join(", "),
      image_url: project.image_url || ""
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingProjectId(null);
    setNewProject({ title: "", situation: "", task: "", action: "", result: "", tags: "", image_url: "" });
  };

  const handleDeleteProject = async (id: number) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleDeleteMessage = async (id: number) => {
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleUpdateStat = async (id: number, value: string) => {
    await fetch(`/api/stats/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value })
    });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col">
        <div className="font-serif italic text-2xl mb-12">MA. Admin</div>
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'projects' ? 'bg-brand-accent text-brand-bg font-bold' : 'text-brand-text-dim hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Projects
          </button>
          <button 
            onClick={() => setActiveTab("stats")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'stats' ? 'bg-brand-accent text-brand-bg font-bold' : 'text-brand-text-dim hover:text-white hover:bg-white/5'}`}
          >
            <Search className="w-5 h-5" /> Stats
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'messages' ? 'bg-brand-accent text-brand-bg font-bold' : 'text-brand-text-dim hover:text-white hover:bg-white/5'}`}
          >
            <Inbox className="w-5 h-5" /> Messages
          </button>
        </nav>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-brand-text-dim hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        {activeTab === "projects" && (
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Manage Projects</h2>
            
            {/* Add/Edit Project Form */}
            <form onSubmit={handleAddProject} className="glass-card p-8 mb-12 space-y-4 border-brand-accent/20 border">
              <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {editingProjectId ? <Settings className="w-5 h-5 text-brand-accent" /> : <Plus className="w-5 h-5" />}
                  {editingProjectId ? "Edit Project" : "Add New Project"}
                </span>
                {editingProjectId && (
                  <button 
                    type="button" 
                    onClick={cancelEdit}
                    className="text-xs mono-label text-red-400 hover:text-red-300"
                  >
                    Cancel Edit
                  </button>
                )}
              </h3>
              <input 
                placeholder="Project Title"
                className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 focus:border-brand-accent outline-none"
                value={newProject.title}
                onChange={e => setNewProject({...newProject, title: e.target.value})}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <textarea 
                  placeholder="Situation"
                  className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 focus:border-brand-accent outline-none h-24"
                  value={newProject.situation}
                  onChange={e => setNewProject({...newProject, situation: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Task"
                  className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 focus:border-brand-accent outline-none h-24"
                  value={newProject.task}
                  onChange={e => setNewProject({...newProject, task: e.target.value})}
                  required
                />
              </div>
              <textarea 
                placeholder="Action (Technical Details)"
                className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 focus:border-brand-accent outline-none h-24"
                value={newProject.action}
                onChange={e => setNewProject({...newProject, action: e.target.value})}
                required
              />
              <input 
                placeholder="Result (Quantitative Metrics)"
                className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 focus:border-brand-accent outline-none"
                value={newProject.result}
                onChange={e => setNewProject({...newProject, result: e.target.value})}
                required
              />
              <input 
                placeholder="Image URL (Unsplash/Pexels link)"
                className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 focus:border-brand-accent outline-none"
                value={newProject.image_url}
                onChange={e => setNewProject({...newProject, image_url: e.target.value})}
              />
              <input 
                placeholder="Tags (comma separated)"
                className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 focus:border-brand-accent outline-none"
                value={newProject.tags}
                onChange={e => setNewProject({...newProject, tags: e.target.value})}
                required
              />
              <button type="submit" className="bg-brand-accent text-brand-bg px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                {editingProjectId ? "Update Project" : "Save Project"}
              </button>
            </form>

            {/* Project List */}
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="glass-card p-6 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">{project.title}</h4>
                    <p className="text-brand-text-dim text-sm">{project.tags.join(", ")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditProject(project)}
                      className="text-brand-accent hover:text-white p-2 transition-colors"
                      title="Edit Project"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-400 hover:text-red-300 p-2 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-8">Update Statistics</h2>
            <div className="space-y-6">
              {stats.map(stat => (
                <div key={stat.id} className="glass-card p-8 flex items-center justify-between">
                  <div>
                    <div className="mono-label opacity-60 mb-1">{stat.label}</div>
                    <input 
                      className="text-2xl font-bold bg-transparent border-b border-white/10 focus:border-brand-accent outline-none"
                      defaultValue={stat.value}
                      onBlur={(e) => handleUpdateStat(stat.id, e.target.value)}
                    />
                  </div>
                  <Save className="w-5 h-5 text-brand-text-dim" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Inbound Messages</h2>
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="glass-card p-12 text-center text-brand-text-dim">
                  <Inbox className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  Belum ada pesan masuk.
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="glass-card p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">{msg.subject}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-brand-text-dim">
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {msg.name}</span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(msg.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="bg-brand-bg/50 p-6 rounded-xl border border-white/5 text-brand-text-dim leading-relaxed">
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioView />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

