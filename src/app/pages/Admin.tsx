import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  LogOut,
  FolderKanban,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Inbox,
  Image,
  Send,
  X,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { toast } from "sonner";

import { useAuth, useAsync } from "../hooks";
import { supabase } from "../lib/supabase";

// TODO: Import types once Supabase is integrated
// import { Project, Message, WorkspaceImage, Album, SiteSettings } from "../types";

export function Admin() {
  const { session, loading: authLoading, signIn, signOut } = useAuth();
  const isAuthenticated = !!session;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  // ============================================
  // UI STATE
  // ============================================
  const [activeTab, setActiveTab] = useState("projects");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isWorkspaceUploading, setIsWorkspaceUploading] = useState(false);
  const [albumUploadingId, setAlbumUploadingId] = useState<number | null>(null);

  // ============================================
  // PROJECTS STATE
  // ============================================
  const { data: projectsData, loading: projectsLoading, refetch: refetchProjects } = useAsync(async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    // Map db fields to match UI expectations
    return (data || []).map((p: any) => ({
      ...p,
      lastUpdated: new Date(p.updated_at || p.created_at).toISOString().split('T')[0],
      technologies: p.technologies || [],
      imageUrl: p.image_url,
      projectUrl: p.project_url,
      githubUrl: p.github_url,
    }));
  }, [], { skip: !isAuthenticated });
  
  const projects = projectsData || [];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    imageUrl: "",
    demoVideoUrl: "",
    projectUrl: "",
    githubUrl: "",
    category: "Web App",
    status: "Draft",
    completionDate: "",
    featuredOnHomepage: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        setLoginLoading(true);
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success("Successfully logged in");
      } catch (error: any) {
        toast.error("Authentication failed", { description: error.message });
      } finally {
        setLoginLoading(false);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type. Please select an image.');
      return;
    }

    try {
      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, imageUrl: publicUrl }));
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      toast.error('Failed to upload image', { description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const projectPayload = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        technologies: formData.technologies.split(",").map((tech) => tech.trim()).filter(Boolean),
        image_url: formData.imageUrl,
        demo_video_url: formData.demoVideoUrl,
        project_url: formData.projectUrl,
        github_url: formData.githubUrl,
        category: formData.category,
        completion_date: formData.completionDate || null,
        featured_on_homepage: formData.featuredOnHomepage,
      };

      if (editingProjectId) {
        // Update existing project
        const { error } = await supabase.from('projects').update(projectPayload).eq('id', editingProjectId);
        if (error) throw error;
        toast.success("Project updated successfully!", {
          description: `${formData.title} has been updated.`,
        });
      } else {
        // Create new project
        const { error } = await supabase.from('projects').insert([projectPayload]);
        if (error) throw error;
        toast.success("Project created successfully!", {
          description: `${formData.title} has been added to your portfolio.`,
        });
      }
      
      await refetchProjects();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error("Failed to save project", { description: error.message });
    }
  };

  const handleEdit = (project: any) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies ? project.technologies.join(", ") : "",
      imageUrl: project.image_url || "",
      demoVideoUrl: project.demo_video_url || "",
      projectUrl: project.project_url || "",
      githubUrl: project.github_url || "",
      category: project.category || "Web App",
      status: project.status || "Draft",
      completionDate: project.completion_date || "",
      featuredOnHomepage: project.featured_on_homepage || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw error;
      toast.success("Project deleted successfully!");
      await refetchProjects();
    } catch(error: any) {
      toast.error("Failed to delete project", { description: error.message });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      imageUrl: "",
      demoVideoUrl: "",
      projectUrl: "",
      githubUrl: "",
      category: "Web App",
      status: "Draft",
      completionDate: "",
      featuredOnHomepage: false,
    });
    setEditingProjectId(null);
  };

  const stats = [
    { label: "Total Projects", value: projects.length.toString(), change: "+2 this month" },
    { label: "Total Views", value: "45.2K", change: "+12.5%" },
    { label: "Avg. View Time", value: "3m 24s", change: "+8.2%" },
  ];

  const { data: messagesData, refetch: refetchMessages } = useAsync(async () => {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map((m: any) => ({
      ...m,
      date: new Date(m.created_at).toISOString().split('T')[0],
    }));
  }, [], { skip: !isAuthenticated });
  const messages = messagesData || [];
  const unreadCount = messages.filter((m: any) => m.unread).length;

  // Settings state
  const [settings, setSettings] = useState({
    name: "Samir Mahmoud",
    tagline: "Full-Stack Developer & Designer",
    bio: "I build elegant solutions that blend functionality with beautiful design. Specializing in React, TypeScript, and modern web technologies.",
    email: "hello@samirmahmoud.dev",
    githubUrl: "https://github.com/samirmahmoud",
    linkedinUrl: "https://linkedin.com/in/samirmahmoud",
    twitterUrl: "https://twitter.com/samirmahmoud",
  });

  const { data: settingsData } = useAsync(async () => {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }, [], { skip: !isAuthenticated });

  useEffect(() => {
    if (settingsData) {
      setSettings({
        name: settingsData.name || "",
        tagline: settingsData.tagline || "",
        bio: settingsData.bio || "",
        email: settingsData.email || "",
        githubUrl: settingsData.github_url || "",
        linkedinUrl: settingsData.linkedin_url || "",
        twitterUrl: settingsData.twitter_url || "",
      });
    }
  }, [settingsData]);

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: settings.name,
        tagline: settings.tagline,
        bio: settings.bio,
        email: settings.email,
        github_url: settings.githubUrl,
        linkedin_url: settings.linkedinUrl,
        twitter_url: settings.twitterUrl,
      };
      const { data } = await supabase.from('site_settings').select('id').limit(1).single();
      if (data) {
        await supabase.from('site_settings').update(payload).eq('id', data.id);
      } else {
        await supabase.from('site_settings').insert([payload]);
      }
      toast.success("Settings saved successfully!");
    } catch(err: any) {
      toast.error("Failed to save settings", { description: err.message });
    }
  };

  // Projects filter and sort state
  const [projectsFilter, setProjectsFilter] = useState<"all" | "published" | "draft">("all");
  const [projectsSort, setProjectsSort] = useState<"recent" | "views" | "title">("recent");
  const [projectsSearch, setProjectsSearch] = useState("");

  const { data: workspaceImagesData, refetch: refetchWorkspaceImages } = useAsync(async () => {
    const { data, error } = await supabase.from('workspace_images').select('*').order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  });
  const workspaceImages = workspaceImagesData || [];

  const { data: albumsData, refetch: refetchAlbums } = useAsync(async () => {
    const { data, error } = await supabase.from('albums').select('*').order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  });
  const albumUrls = albumsData || [];

  const handleMessageClick = async (messageId: string) => {
    setSelectedMessage(messageId);
    await supabase.from('messages').update({ unread: false }).eq('id', messageId);
    await refetchMessages();
  };

  const handleWorkspaceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type'); return;
    }

    try {
      setIsWorkspaceUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('workspace-images').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('workspace-images').getPublicUrl(fileName);

      await supabase.from('workspace_images').insert([{ url: publicUrl, order_index: workspaceImages.length, alt: '' }]);
      toast.success("Workspace image uploaded!");
      await refetchWorkspaceImages();
    } catch(err: any) {
      toast.error("Failed to upload image", { description: err.message });
    } finally {
      setIsWorkspaceUploading(false);
    }
  };

  const handleAlbumUpload = async (e: React.ChangeEvent<HTMLInputElement>, albumId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setAlbumUploadingId(albumId);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('album-covers').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('album-covers').getPublicUrl(fileName);
      await supabase.from('albums').update({ url: publicUrl }).eq('id', albumId);
      toast.success("Album cover uploaded!");
      await refetchAlbums();
    } catch(err: any) {
      toast.error("Failed to upload album cover", { description: err.message });
    } finally {
      setAlbumUploadingId(null);
    }
  };

  // Filter and sort projects
  const getFilteredAndSortedProjects = () => {
    let filtered = projects;

    // Apply status filter
    if (projectsFilter !== "all") {
      filtered = filtered.filter(
        (p) => p.status.toLowerCase() === projectsFilter
      );
    }

    // Apply search filter
    if (projectsSearch) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(projectsSearch.toLowerCase()) ||
          p.description.toLowerCase().includes(projectsSearch.toLowerCase())
      );
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      if (projectsSort === "recent") {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      } else if (projectsSort === "views") {
        return b.views - a.views;
      } else if (projectsSort === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return sorted;
  };

  const filteredProjects = getFilteredAndSortedProjects();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-6">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            {/* Logo matching the site */}
            <motion.div 
              className="inline-flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <span className="text-5xl font-bold font-mono text-primary">
                &gt;_SaMo
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="inline-block w-[3px] h-[2.5rem] bg-primary ml-[2px] translate-y-[3px]"
              />
            </motion.div>
            <h1 className="text-3xl tracking-tight mb-2 font-bold">Admin Portal</h1>
            <p className="text-muted-foreground">
              Where I manage my content and settings
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-mono text-primary">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-primary outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-mono text-primary">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-primary outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-mono disabled:opacity-50"
            >
              {loginLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-accent/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl tracking-tight mb-1">
                <span className="text-primary/60 font-mono text-lg mr-3">&lt;AdminPanel /&gt;</span>
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your portfolio content and settings
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl border border-border/50 bg-card"
              >
                <div className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-3xl tracking-tight mb-1">{stat.value}</div>
                <div className="text-sm text-purple-400">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-6">
            {[
              { id: "projects", label: "Projects", icon: FolderKanban },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "inbox", label: "Inbox", icon: Inbox, badge: unreadCount },
              { id: "media", label: "Media", icon: Image },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors relative ${
                  activeTab === tab.id
                    ? "border-purple-400 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {activeTab === "projects" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl tracking-tight">Manage Projects</h2>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  <Plus size={18} />
                  Add Project
                </button>
              </div>

              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={projectsSearch}
                  onChange={(e) => setProjectsSearch(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                />
                <select
                  value={projectsFilter}
                  onChange={(e) => setProjectsFilter(e.target.value as "all" | "published" | "draft")}
                  className="px-4 py-2 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <select
                  value={projectsSort}
                  onChange={(e) => setProjectsSort(e.target.value as "recent" | "views" | "title")}
                  className="px-4 py-2 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                >
                  <option value="recent">Most Recent</option>
                  <option value="views">Most Views</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>

              {/* Results Count */}
              {(projectsSearch || projectsFilter !== "all") && (
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredProjects.length} of {projects.length} projects
                </div>
              )}

              {filteredProjects.length === 0 ? (
                <div className="text-center py-12 border border-border/50 rounded-lg">
                  <FolderKanban className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    {projectsSearch ? "Try adjusting your search or filters" : "Get started by adding your first project"}
                  </p>
                  {projectsSearch || projectsFilter !== "all" ? (
                    <button
                      onClick={() => {
                        setProjectsSearch("");
                        setProjectsFilter("all");
                      }}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      Clear filters
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsDialogOpen(true)}
                      className="px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
                    >
                      Add your first project
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-xl border border-border/50 hover:border-border transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg">{project.title}</h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                project.status === "Published"
                                  ? "bg-emerald-500/20 text-purple-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye size={14} />
                              {project.views.toLocaleString()} views
                            </span>
                            <span>Last updated: {project.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="text-center py-12">
              <BarChart3
                className="mx-auto mb-4 text-muted-foreground"
                size={48}
              />
              <h2 className="text-2xl tracking-tight mb-2">
                Analytics Dashboard
              </h2>
              <p className="text-muted-foreground">
                Detailed analytics and insights coming soon
              </p>
            </div>
          )}

          {activeTab === "inbox" && (
            <div>
              <h2 className="text-2xl tracking-tight mb-6">Contact Form Inbox</h2>
              
              {/* Split Pane Email Client */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
                {/* Left Pane - Message List */}
                <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
                  <div className="border-b border-border/50 p-4 bg-accent/30">
                    <h3 className="font-mono text-sm">Messages ({messages.length})</h3>
                  </div>
                  <div className="overflow-y-auto h-[calc(600px-57px)]">
                    {messages.map((message) => (
                      <button
                        key={message.id}
                        onClick={() => handleMessageClick(message.id)}
                        className={`w-full p-4 border-b border-border/50 text-left hover:bg-accent/50 transition-colors ${
                          selectedMessage === message.id ? "bg-accent" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className={`font-medium ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                            {message.name}
                          </span>
                          {message.unread && (
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">{message.subject}</div>
                        <div className="text-xs text-muted-foreground">{message.date}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Pane - Message Content */}
                <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
                  {selectedMessage ? (
                    <>
                      {messages.filter((m) => m.id === selectedMessage).map((message) => (
                        <div key={message.id} className="h-full flex flex-col">
                          {/* Message Header */}
                          <div className="border-b border-border/50 p-4 bg-accent/30">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium mb-1">{message.subject}</h3>
                                <p className="text-sm text-muted-foreground">From: {message.name}</p>
                                <p className="text-xs text-muted-foreground">{message.email}</p>
                              </div>
                              <button
                                onClick={() => setSelectedMessage(null)}
                                className="p-1 hover:bg-accent rounded transition-colors"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </div>

                          {/* Message Body */}
                          <div className="flex-1 p-6 overflow-y-auto">
                            <p className="text-foreground leading-relaxed">{message.message}</p>
                          </div>

                          {/* Actions */}
                          <div className="border-t border-border/50 p-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity">
                              <Send size={18} />
                              Reply via Email
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Inbox className="mx-auto mb-4" size={48} />
                        <p>Select a message to view</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div>
              <h2 className="text-2xl tracking-tight mb-6">About Page Media</h2>
              
              {/* Workspace Gallery Section */}
              <div className="mb-12">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <span className="text-primary/60 font-mono text-sm">&lt;WorkspaceGallery /&gt;</span>
                  Workspace Evolution
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {workspaceImages.map((img: any, index: number) => (
                    <div key={img.id || index} className="relative group aspect-square rounded-lg overflow-hidden border border-border/50 bg-accent">
                      <img src={img.url} alt={`Workspace ${index + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col p-3">
                        <div className="flex justify-end">
                          <button
                            onClick={async () => {
                              try {
                                await supabase.from('workspace_images').delete().eq('id', img.id);
                                toast.success("Image removed");
                                await refetchWorkspaceImages();
                              } catch (err: any) {
                                toast.error("Failed to remove image", { description: err.message });
                              }
                            }}
                            className="p-1.5 rounded-lg bg-destructive text-white hover:bg-destructive/90 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex-1 flex items-end">
                          <textarea
                            defaultValue={img.alt || ''}
                            placeholder="Add a one-sentence description..."
                            onBlur={async (e) => {
                              if (e.target.value !== img.alt) {
                                await supabase.from('workspace_images').update({ alt: e.target.value }).eq('id', img.id);
                                toast.success("Description updated");
                                refetchWorkspaceImages();
                              }
                            }}
                            className="w-full bg-transparent text-white text-sm outline-none resize-none placeholder:text-white/50 border-b border-transparent focus:border-white/30 transition-colors bg-black/20 p-2 rounded"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Upload New Photo Dropzone */}
                  <label className="relative aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center cursor-pointer bg-accent/30 overflow-hidden">
                    <input type="file" accept="image/*" className="hidden" disabled={isWorkspaceUploading} onChange={handleWorkspaceUpload} />
                    {isWorkspaceUploading ? (
                      <>
                        <Loader2 className="animate-spin text-primary mb-2" size={32} />
                        <span className="text-xs text-muted-foreground text-center px-2">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="mb-2 text-muted-foreground" size={32} />
                        <span className="text-xs text-muted-foreground text-center px-2">Upload New Photo</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Heavy Rotation Section */}
              <div>
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <span className="text-primary/60 font-mono text-sm">&lt;HeavyRotation /&gt;</span>
                  Album Covers
                </h3>
                
                <div className="space-y-3">
                  {albumUrls.map((album: any) => (
                    <div key={album.id} className="p-4 rounded-lg border border-border/50 bg-card flex items-center gap-4">
                      <img src={album.url} alt={album.title} className="w-16 h-16 rounded object-cover" />
                      <div className="flex-1">
                        <input
                          type="text"
                          defaultValue={album.title}
                          onBlur={async (e) => {
                            if (e.target.value !== album.title) {
                              await supabase.from('albums').update({ title: e.target.value }).eq('id', album.id);
                              refetchAlbums();
                            }
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors text-sm mb-2"
                          placeholder="Album Title"
                        />
                        <div className="flex flex-col gap-2 relative">
                          <label className="relative inline-flex items-center justify-center cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg px-3 py-2 transition-colors text-sm font-medium w-full lg:w-1/2 mt-1">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAlbumUpload(e, album.id)} disabled={albumUploadingId === album.id} />
                            {albumUploadingId === album.id ? (
                              <><Loader2 className="animate-spin text-primary mr-2" size={14}/> Uploading...</>
                            ) : (
                              <><Upload size={14} className="mr-2"/> Upload Cover Art</>
                            )}
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await supabase.from('albums').delete().eq('id', album.id);
                            toast.success("Album removed");
                            await refetchAlbums();
                          } catch (err: any) {
                            toast.error("Failed to remove album", { description: err.message });
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={async () => {
                      try {
                        const newTitle = "New Album";
                        await supabase.from('albums').insert([{ url: "", title: newTitle, order_index: albumUrls.length }]);
                        toast.success("Album added");
                        await refetchAlbums();
                      } catch (err: any) {
                        toast.error("Failed to add album", { description: err.message });
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <Plus size={18} />
                    Add Album
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl">
              <h2 className="text-2xl tracking-tight mb-6">
                Portfolio Settings
              </h2>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block mb-2">Portfolio Title</label>
                  <input
                    type="text"
                    name="name"
                    value={settings.name}
                    onChange={handleSettingChange}
                    className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block mb-2">Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    value={settings.tagline}
                    onChange={handleSettingChange}
                    className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block mb-2">Bio</label>
                  <textarea
                    rows={4}
                    name="bio"
                    value={settings.bio}
                    onChange={handleSettingChange}
                    className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block mb-2">Contact Email</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleSettingChange}
                    className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block mb-2">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={settings.githubUrl}
                    onChange={handleSettingChange}
                    className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={settings.linkedinUrl}
                    onChange={handleSettingChange}
                    className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block mb-2">Twitter URL</label>
                  <input
                    type="url"
                    name="twitterUrl"
                    value={settings.twitterUrl}
                    onChange={handleSettingChange}
                    className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                  />
                </div>
                <button className="px-6 py-3 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Add Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProjectId ? "Edit Project" : "Create New Project"}</DialogTitle>
            <DialogDescription>
              {editingProjectId 
                ? "Update the project details below." 
                : "Add a new project to your portfolio. Fill in the details below."
              }
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm">
                  Project Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="E.g., E-Commerce Platform"
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                  required
                  maxLength={100}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of your project..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors resize-none"
                  required
                  maxLength={1000}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm">
                  Technologies <span className="text-muted-foreground text-xs">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  placeholder="React, TypeScript, Node.js"
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                >
                  <option value="Web App">Web App</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Design">Design</option>
                  <option value="Productivity">Productivity</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm">Completion Date</label>
                <input
                  type="month"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                  placeholder="MM/YYYY"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div>
                <label className="flex items-center justify-between mb-2 text-sm">
                  <span>Feature on Homepage</span>
                </label>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, featuredOnHomepage: !prev.featuredOnHomepage }))}
                  className={`relative inline-flex h-11 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-background ${
                    formData.featuredOnHomepage ? "bg-purple-500" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-lg transition-transform ${
                      formData.featuredOnHomepage ? "translate-x-12" : "translate-x-1"
                    }`}
                  />
                </button>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.featuredOnHomepage ? "Featured" : "Not featured"}
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm">
                  Image Upload
                </label>
                <div className="flex flex-col gap-3">
                  {formData.imageUrl && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-accent border border-border">
                      <img 
                        src={formData.imageUrl} 
                        alt="Project preview" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                        className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-background rounded-md text-foreground transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    />
                    <div className={`w-full px-4 py-8 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 ${isUploading ? 'bg-accent/50 text-muted-foreground' : 'bg-transparent hover:bg-accent hover:border-primary/50 text-foreground'} transition-colors`}>
                      {isUploading ? (
                        <>
                          <Loader2 className="animate-spin text-primary" size={28} />
                          <span className="font-mono text-sm">Uploading to Supabase...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={28} className="text-muted-foreground" />
                          <span className="font-mono text-sm">Click or drag an image to upload</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm">
                  Demo Video URL
                </label>
                <input
                  type="url"
                  name="demoVideoUrl"
                  value={formData.demoVideoUrl}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optional: Link to a video demo or walkthrough
                </p>
              </div>

              <div>
                <label className="block mb-2 text-sm">Project URL</label>
                <input
                  type="url"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">GitHub URL</label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-3 rounded-lg bg-accent border border-border focus:border-purple-400 outline-none transition-colors"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                {editingProjectId ? "Update Project" : "Create Project"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}