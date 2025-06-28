import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Atom, Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";
import { HeroSection } from "@/components/hero-section";
import { ControlsFilters } from "@/components/controls-filters";
import { EnhancedLayoutCard } from "@/components/enhanced-layout-card";
import { LayoutModal } from "@/components/layout-modal";
import { StatsSection } from "@/components/stats-section";
import { categories } from "@/lib/layouts-data";
import { debounce, generateSessionId, trackInteraction } from "@/lib/theme-utils";
import type { Layout } from "@shared/schema";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Layouts");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDevice, setSelectedDevice] = useState("desktop");
  const [selectedLayout, setSelectedLayout] = useState<Layout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sessionId] = useState(() => generateSessionId());

  // Queries
  const { data: layouts = [], isLoading } = useQuery<Layout[]>({
    queryKey: ['/api/layouts'],
  });

  const { data: searchResults = [] } = useQuery<Layout[]>({
    queryKey: ['/api/layouts/search', searchQuery],
    enabled: searchQuery.length > 2,
  });

  const { data: categoryLayouts = [] } = useQuery<Layout[]>({
    queryKey: ['/api/layouts/category', activeCategory],
    enabled: activeCategory !== "All Layouts",
  });

  // Mutations
  const trackInteractionMutation = useMutation({
    mutationFn: async ({ layoutId, interactionType }: { layoutId: number | null; interactionType: string }) => {
      await trackInteraction(layoutId, interactionType as any, sessionId);
    },
  });

  // Memoized filtered and sorted layouts
  const displayLayouts = useMemo(() => {
    let filtered = layouts;

    // Apply search filter
    if (searchQuery.length > 2 && searchResults.length > 0) {
      filtered = searchResults;
    } else if (activeCategory !== "All Layouts" && categoryLayouts.length > 0) {
      filtered = categoryLayouts;
    }

    // Apply local search if query is short
    if (searchQuery.length > 0 && searchQuery.length <= 2) {
      const normalizedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(layout => 
        layout.name.toLowerCase().includes(normalizedQuery) ||
        layout.description.toLowerCase().includes(normalizedQuery) ||
        layout.category.toLowerCase().includes(normalizedQuery)
      );
    }

    // Sort layouts
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'complexity':
          const complexityOrder = { 'Medium': 1, 'Advanced': 2, 'Expert': 3 };
          return (complexityOrder[a.complexity as keyof typeof complexityOrder] || 0) - 
                 (complexityOrder[b.complexity as keyof typeof complexityOrder] || 0);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        default:
          return 0;
      }
    });
  }, [layouts, searchResults, categoryLayouts, searchQuery, activeCategory, sortBy]);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  // Event handlers
  const handleExploreLayouts = () => {
    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewDocs = () => {
    window.open('https://github.com/rajshah9305/SciViz-Design-System', '_blank');
  };

  const handleLayoutPreview = (layout: Layout) => {
    trackInteractionMutation.mutate({ layoutId: layout.id, interactionType: 'view' });
    setSelectedLayout(layout);
    setIsModalOpen(true);
  };

  const handleLayoutFullscreen = (layout: Layout) => {
    trackInteractionMutation.mutate({ layoutId: layout.id, interactionType: 'preview' });
    // TODO: Implement fullscreen preview
    toast({
      title: "Fullscreen Preview",
      description: `Opening ${layout.name} in fullscreen mode.`,
    });
  };

  const handleLayoutInfo = (layout: Layout) => {
    handleLayoutPreview(layout);
  };

  const handleLayoutUse = (layout: Layout) => {
    trackInteractionMutation.mutate({ layoutId: layout.id, interactionType: 'download' });
    queryClient.invalidateQueries({ queryKey: ['/api/layouts'] });
    toast({
      title: "Layout Downloaded",
      description: `${layout.name} layout has been downloaded successfully.`,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLayout(null);
  };

  // Effects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[hsl(25,100%,50%)] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading SciViz Design System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[hsl(0,0%,18%)]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] rounded-xl flex items-center justify-center">
                <Atom className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">SciViz Design System</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Professional Scientific Portal Navigation</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 text-[hsl(25,100%,50%)]" />
                ) : (
                  <Sun className="h-4 w-4 text-[hsl(25,100%,50%)]" />
                )}
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="justify-start"
                  >
                    {theme === 'light' ? (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Light Mode
                      </>
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection 
        onExploreLayouts={handleExploreLayouts}
        onViewDocs={handleViewDocs}
      />

      {/* Controls and Filters */}
      <ControlsFilters
        searchQuery={searchQuery}
        onSearchChange={debouncedSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode as any}
        selectedDevice={selectedDevice}
        onDeviceChange={setSelectedDevice}
      />

      {/* Main Layout Gallery */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {displayLayouts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No layouts found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
              : "space-y-6"
          }>
            {displayLayouts.map((layout) => (
              <EnhancedLayoutCard
                key={layout.id}
                layout={layout}
                onPreview={handleLayoutPreview}
                onFullscreen={handleLayoutFullscreen}
                onInfo={handleLayoutInfo}
                onUse={handleLayoutUse}
                viewMode={viewMode}
                priority={layout.id <= 2 ? 'featured' : 'standard'}
              />
            ))}
          </div>
        )}
      </main>

      {/* Statistics Section */}
      <StatsSection />

      {/* Footer */}
      <footer className="bg-[hsl(0,0%,10%)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] rounded-xl flex items-center justify-center">
                  <Atom className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">SciViz Design System</h3>
                  <p className="text-gray-400">Scientific Interface Innovation</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Transforming scientific visualization through cutting-edge design principles. 
                Creating the future of professional scientific interfaces.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/rajshah9305/SciViz-Design-System" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[hsl(25,100%,50%)] transition-colors duration-300"
                >
                  <span className="text-sm">📂</span>
                </a>
                <a 
                  href="https://sci-viz-design-system.vercel.app" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[hsl(25,100%,50%)] transition-colors duration-300"
                >
                  <span className="text-sm">🌐</span>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[hsl(25,100%,50%)]">Categories</h4>
              <ul className="space-y-2 text-gray-300">
                {categories.slice(1, 6).map((category) => (
                  <li key={category}>
                    <button 
                      onClick={() => setActiveCategory(category)}
                      className="hover:text-[hsl(25,100%,50%)] transition-colors duration-300"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[hsl(25,100%,50%)]">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-[hsl(25,100%,50%)] transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="hover:text-[hsl(25,100%,50%)] transition-colors duration-300">API Reference</a></li>
                <li><a href="#" className="hover:text-[hsl(25,100%,50%)] transition-colors duration-300">Component Library</a></li>
                <li><a href="#" className="hover:text-[hsl(25,100%,50%)] transition-colors duration-300">Design Guidelines</a></li>
                <li><a href="#" className="hover:text-[hsl(25,100%,50%)] transition-colors duration-300">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 SciViz Design System. Crafted with precision for scientific excellence.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">Production Ready • TypeScript • Responsive</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Layout Information Modal */}
      <LayoutModal
        layout={selectedLayout}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDownload={handleLayoutUse}
        onFullscreen={handleLayoutFullscreen}
      />
    </div>
  );
}
