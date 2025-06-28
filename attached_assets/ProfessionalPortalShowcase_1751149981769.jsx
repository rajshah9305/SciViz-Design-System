import React, { useState, useEffect } from ‘react’;
import {
Grid3X3,
List,
Layers,
LayoutGrid,
Tablet,
Smartphone,
Monitor,
ChevronRight,
Search,
Settings,
BarChart3,
Users,
FileText,
MessageSquare,
Calendar,
Database,
Clock,
Waves,
Box,
Circle,
Download,
Eye,
Moon,
Sun,
Menu,
X,
ArrowRight,
Maximize2,
Info,
CheckCircle,
Brain,
Atom,
Dna,
Telescope,
Infinity,
Microscope,
Layers3
} from ‘lucide-react’;

const ProfessionalPortalShowcase = () => {
const [darkMode, setDarkMode] = useState(false);
const [selectedLayout, setSelectedLayout] = useState(‘neural-network’);
const [selectedDevice, setSelectedDevice] = useState(‘desktop’);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [activeCategory, setActiveCategory] = useState(‘all’);
const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
const [showLayoutInfo, setShowLayoutInfo] = useState(false);
const [searchQuery, setSearchQuery] = useState(’’);
const [sortBy, setSortBy] = useState(‘name’);
const [viewMode, setViewMode] = useState(‘grid’);
const [userInteractions, setUserInteractions] = useState(0);
const [layoutTransition, setLayoutTransition] = useState(false);

// Professional layout definitions
const layouts = {
‘neural-network’: {
name: ‘Neural Network’,
category: ‘AI & Machine Learning’,
description: ‘Interconnected nodes representing AI neural pathways with dynamic data flow visualization.’,
icon: Brain,
complexity: ‘Advanced’,
useCases: [‘AI Dashboards’, ‘Data Science Platforms’, ‘Machine Learning Tools’],
features: [‘Dynamic Connections’, ‘Real-time Data Flow’, ‘Interactive Nodes’, ‘Scalable Architecture’],
performance: { speed: 92, accessibility: 96, responsive: 98 },
lastUpdated: ‘2025-01-15’
},
‘quantum-grid’: {
name: ‘Quantum Grid’,
category: ‘Scientific Computing’,
description: ‘Quantum computing visualization with probability states and superposition effects.’,
icon: Atom,
complexity: ‘Expert’,
useCases: [‘Quantum Computing’, ‘Scientific Research’, ‘Advanced Analytics’],
features: [‘Quantum States’, ‘Probability Visualization’, ‘Superposition Effects’, ‘Research-Grade UI’],
performance: { speed: 89, accessibility: 94, responsive: 96 },
lastUpdated: ‘2025-01-12’
},
‘bio-helix’: {
name: ‘Bio Helix’,
category: ‘Life Sciences’,
description: ‘DNA-inspired double helix structure for biological data and research applications.’,
icon: Dna,
complexity: ‘Medium’,
useCases: [‘Biotechnology’, ‘Medical Research’, ‘Genetic Analysis’],
features: [‘Helix Structure’, ‘Genetic Patterns’, ‘Biological Data’, ‘Research Tools’],
performance: { speed: 94, accessibility: 97, responsive: 99 },
lastUpdated: ‘2025-01-10’
},
‘cosmic-web’: {
name: ‘Cosmic Web’,
category: ‘Astrophysics’,
description: ‘Large-scale universe structure visualization for astronomical and space research.’,
icon: Telescope,
complexity: ‘Advanced’,
useCases: [‘Space Research’, ‘Astronomy’, ‘Data Visualization’],
features: [‘Cosmic Scale’, ‘Astronomical Data’, ‘Space Visualization’, ‘Research Interface’],
performance: { speed: 88, accessibility: 93, responsive: 95 },
lastUpdated: ‘2025-01-08’
},
‘fluid-dynamics’: {
name: ‘Fluid Dynamics’,
category: ‘Engineering’,
description: ‘Real-time fluid simulation interface for engineering and scientific modeling.’,
icon: Waves,
complexity: ‘Advanced’,
useCases: [‘Engineering Software’, ‘Simulation Tools’, ‘Scientific Modeling’],
features: [‘Fluid Simulation’, ‘Real-time Physics’, ‘Engineering Tools’, ‘Technical Interface’],
performance: { speed: 85, accessibility: 95, responsive: 97 },
lastUpdated: ‘2025-01-05’
},
‘fractal-geometry’: {
name: ‘Fractal Geometry’,
category: ‘Mathematics’,
description: ‘Self-similar recursive patterns for mathematical and analytical applications.’,
icon: Infinity,
complexity: ‘Expert’,
useCases: [‘Mathematical Modeling’, ‘Pattern Analysis’, ‘Research Tools’],
features: [‘Fractal Patterns’, ‘Mathematical Precision’, ‘Infinite Zoom’, ‘Pattern Recognition’],
performance: { speed: 87, accessibility: 92, responsive: 94 },
lastUpdated: ‘2025-01-03’
},
‘crystal-lattice’: {
name: ‘Crystal Lattice’,
category: ‘Materials Science’,
description: ‘Atomic structure visualization for chemistry and materials research.’,
icon: Microscope,
complexity: ‘Medium’,
useCases: [‘Chemistry Research’, ‘Materials Science’, ‘Molecular Modeling’],
features: [‘Atomic Structure’, ‘Molecular Bonds’, ‘Crystal Patterns’, ‘Scientific Accuracy’],
performance: { speed: 93, accessibility: 96, responsive: 98 },
lastUpdated: ‘2025-01-01’
},
‘holographic-interface’: {
name: ‘Holographic Interface’,
category: ‘Spatial Computing’,
description: ‘Multi-dimensional interface design for AR/VR and spatial computing platforms.’,
icon: Layers3,
complexity: ‘Expert’,
useCases: [‘AR/VR Applications’, ‘Spatial Computing’, ‘3D Interfaces’],
features: [‘3D Layers’, ‘Spatial Navigation’, ‘Immersive Design’, ‘Future Interface’],
performance: { speed: 86, accessibility: 89, responsive: 91 },
lastUpdated: ‘2024-12-28’
}
};

// Sample data for demonstrations
const sampleData = [
{ id: 1, title: ‘Analytics Hub’, subtitle: ‘Data Intelligence’, icon: BarChart3, category: ‘analytics’, users: ‘12.4K’, growth: ‘+24%’, status: ‘active’ },
{ id: 2, title: ‘User Management’, subtitle: ‘Access Control’, icon: Users, category: ‘users’, users: ‘8.7K’, growth: ‘+18%’, status: ‘stable’ },
{ id: 3, title: ‘Content System’, subtitle: ‘Digital Assets’, icon: FileText, category: ‘content’, users: ‘15.2K’, growth: ‘+31%’, status: ‘growing’ },
{ id: 4, title: ‘Communications’, subtitle: ‘Messaging Hub’, icon: MessageSquare, category: ‘communication’, users: ‘6.8K’, growth: ‘+42%’, status: ‘active’ },
{ id: 5, title: ‘Scheduling’, subtitle: ‘Time Management’, icon: Calendar, category: ‘productivity’, users: ‘9.1K’, growth: ‘+15%’, status: ‘stable’ },
{ id: 6, title: ‘Data Storage’, subtitle: ‘Information Repository’, icon: Database, category: ‘data’, users: ‘11.3K’, growth: ‘+28%’, status: ‘optimized’ }
];

const categories = [‘all’, ‘AI & Machine Learning’, ‘Scientific Computing’, ‘Life Sciences’, ‘Astrophysics’, ‘Engineering’, ‘Mathematics’, ‘Materials Science’, ‘Spatial Computing’];

// Theme system
const theme = {
light: {
bg: ‘bg-gray-50’,
surface: ‘bg-white’,
surfaceHover: ‘hover:bg-gray-50’,
border: ‘border-gray-200’,
borderHover: ‘hover:border-gray-300’,
text: ‘text-gray-900’,
textSecondary: ‘text-gray-600’,
textMuted: ‘text-gray-500’,
accent: ‘text-blue-600’,
accentBg: ‘bg-blue-50’,
shadow: ‘shadow-sm’,
shadowHover: ‘hover:shadow-md’,
input: ‘bg-white border-gray-300 focus:border-blue-500’,
button: ‘bg-blue-600 hover:bg-blue-700 text-white’,
buttonSecondary: ‘bg-gray-100 hover:bg-gray-200 text-gray-900’,
},
dark: {
bg: ‘bg-gray-900’,
surface: ‘bg-gray-800’,
surfaceHover: ‘hover:bg-gray-750’,
border: ‘border-gray-700’,
borderHover: ‘hover:border-gray-600’,
text: ‘text-white’,
textSecondary: ‘text-gray-300’,
textMuted: ‘text-gray-400’,
accent: ‘text-blue-400’,
accentBg: ‘bg-blue-900/20’,
shadow: ‘shadow-lg shadow-black/25’,
shadowHover: ‘hover:shadow-xl hover:shadow-black/25’,
input: ‘bg-gray-700 border-gray-600 focus:border-blue-400 text-white’,
button: ‘bg-blue-600 hover:bg-blue-500 text-white’,
buttonSecondary: ‘bg-gray-700 hover:bg-gray-600 text-white’,
}
};

const currentTheme = darkMode ? theme.dark : theme.light;

// Utility functions
const handleInteraction = () => {
setUserInteractions(prev => prev + 1);
};

const filteredLayouts = Object.entries(layouts).filter(([key, layout]) => {
const matchesCategory = activeCategory === ‘all’ || layout.category === activeCategory;
const matchesSearch =
layout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
layout.description.toLowerCase().includes(searchQuery.toLowerCase());
return matchesCategory && matchesSearch;
});

const sortedLayouts = filteredLayouts.sort((a, b) => {
const [, layoutA] = a;
const [, layoutB] = b;

```
switch (sortBy) {
  case 'name':
    return layoutA.name.localeCompare(layoutB.name);
  case 'complexity':
    const complexityOrder = { 'Medium': 1, 'Advanced': 2, 'Expert': 3 };
    return complexityOrder[layoutA.complexity] - complexityOrder[layoutB.complexity];
  case 'category':
    return layoutA.category.localeCompare(layoutB.category);
  case 'updated':
    return new Date(layoutB.lastUpdated).getTime() - new Date(layoutA.lastUpdated).getTime();
  default:
    return 0;
}
```

});

// Effects
useEffect(() => {
const handleKeyDown = (e) => {
if (e.key === ‘Escape’) {
setIsPreviewFullscreen(false);
setShowLayoutInfo(false);
setIsMobileMenuOpen(false);
}
};
window.addEventListener(‘keydown’, handleKeyDown);
return () => window.removeEventListener(‘keydown’, handleKeyDown);
}, []);

// Layout renderers
const renderNeuralNetwork = () => (
<div className={`relative h-full w-full ${currentTheme.bg} rounded-xl overflow-hidden border ${currentTheme.border}`}>
<div className="absolute inset-0 p-8">
{/* Neural nodes */}
{sampleData.map((item, i) => {
const angle = (i / sampleData.length) * 2 * Math.PI;
const radius = 35;
const x = 50 + Math.cos(angle) * radius;
const y = 50 + Math.sin(angle) * radius;

```
      return (
        <div
          key={item.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ left: `${x}%`, top: `${y}%` }}
          onClick={handleInteraction}
        >
          <div className={`w-16 h-16 ${currentTheme.surface} rounded-full flex items-center justify-center ${currentTheme.shadow} ${currentTheme.shadowHover} transition-all duration-300 group-hover:scale-110 ${currentTheme.border} border`}>
            <item.icon className={`w-8 h-8 ${currentTheme.accent}`} />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`${currentTheme.surface} px-3 py-1 rounded-lg ${currentTheme.shadow} border ${currentTheme.border} whitespace-nowrap`}>
              <div className={`text-sm font-medium ${currentTheme.text}`}>{item.title}</div>
            </div>
          </div>
        </div>
      );
    })}
    
    {/* Center node */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className={`w-20 h-20 ${currentTheme.surface} rounded-full flex items-center justify-center ${currentTheme.shadow} border ${currentTheme.border} cursor-pointer hover:scale-110 transition-transform duration-300`}
           onClick={handleInteraction}>
        <Brain className={`w-10 h-10 ${currentTheme.accent}`} />
      </div>
    </div>
    
    {/* Connections */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {sampleData.map((_, i) => {
        const angle = (i / sampleData.length) * 2 * Math.PI;
        const nextAngle = ((i + 1) / sampleData.length) * 2 * Math.PI;
        const radius = 35;
        const centerX = 50;
        const centerY = 50;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(nextAngle) * radius;
        const y2 = centerY + Math.sin(nextAngle) * radius;
        
        return (
          <g key={i}>
            <line
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke={darkMode ? '#374151' : '#e5e7eb'}
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1="50%"
              y1="50%"
              x2={`${x1}%`}
              y2={`${y1}%`}
              stroke={darkMode ? '#374151' : '#e5e7eb'}
              strokeWidth="1"
              opacity="0.3"
            />
          </g>
        );
      })}
    </svg>
  </div>
</div>
```

);

const renderQuantumGrid = () => (
<div className={`relative h-full w-full ${currentTheme.bg} rounded-xl overflow-hidden border ${currentTheme.border}`}>
<div className="p-6 grid grid-cols-3 grid-rows-2 gap-4 h-full">
{sampleData.map((item) => (
<div
key={item.id}
className={`group ${currentTheme.surface} rounded-lg p-4 ${currentTheme.shadow} ${currentTheme.shadowHover} border ${currentTheme.border} transition-all duration-300 cursor-pointer hover:scale-105`}
onClick={handleInteraction}
>
<div className="flex items-center justify-between mb-3">
<item.icon className={`w-6 h-6 ${currentTheme.accent}`} />
<span className={`text-xs px-2 py-1 rounded-full ${currentTheme.accentBg} ${currentTheme.accent}`}>
{item.status}
</span>
</div>
<h4 className={`font-semibold ${currentTheme.text} mb-1`}>{item.title}</h4>
<p className={`text-sm ${currentTheme.textSecondary} mb-2`}>{item.subtitle}</p>
<div className="flex justify-between items-center">
<span className={`text-sm ${currentTheme.textMuted}`}>{item.users}</span>
<span className={`text-sm font-medium ${item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
{item.growth}
</span>
</div>
</div>
))}
</div>
</div>
);

const renderBioHelix = () => (
<div className={`relative h-full w-full ${currentTheme.bg} rounded-xl overflow-hidden border ${currentTheme.border}`}>
<div className="p-6 h-full flex items-center justify-center">
<div className="relative">
<div className="grid grid-cols-2 gap-8">
<div className="space-y-4">
{sampleData.slice(0, 3).map((item) => (
<div
key={item.id}
className={`group flex items-center space-x-4 ${currentTheme.surface} rounded-lg p-4 ${currentTheme.shadow} ${currentTheme.shadowHover} border ${currentTheme.border} transition-all duration-300 cursor-pointer hover:scale-105`}
onClick={handleInteraction}
>
<div className={`w-10 h-10 ${currentTheme.accentBg} rounded-lg flex items-center justify-center`}>
<item.icon className={`w-5 h-5 ${currentTheme.accent}`} />
</div>
<div className="flex-1">
<h4 className={`font-semibold ${currentTheme.text}`}>{item.title}</h4>
<p className={`text-sm ${currentTheme.textSecondary}`}>{item.subtitle}</p>
</div>
<ArrowRight className={`w-4 h-4 ${currentTheme.textMuted} transition-colors`} />
</div>
))}
</div>
<div className="space-y-4">
{sampleData.slice(3, 6).map((item) => (
<div
key={item.id}
className={`group flex items-center space-x-4 ${currentTheme.surface} rounded-lg p-4 ${currentTheme.shadow} ${currentTheme.shadowHover} border ${currentTheme.border} transition-all duration-300 cursor-pointer hover:scale-105`}
onClick={handleInteraction}
>
<div className={`w-10 h-10 ${currentTheme.accentBg} rounded-lg flex items-center justify-center`}>
<item.icon className={`w-5 h-5 ${currentTheme.accent}`} />
</div>
<div className="flex-1">
<h4 className={`font-semibold ${currentTheme.text}`}>{item.title}</h4>
<p className={`text-sm ${currentTheme.textSecondary}`}>{item.subtitle}</p>
</div>
<ArrowRight className={`w-4 h-4 ${currentTheme.textMuted} transition-colors`} />
</div>
))}
</div>
</div>
</div>
</div>
</div>
);

const renderDefaultLayout = (layoutKey) => {
const layout = layouts[layoutKey];
const IconComponent = layout.icon;

```
return (
  <div className={`relative h-full w-full ${currentTheme.bg} rounded-xl overflow-hidden border ${currentTheme.border}`}>
    <div className="p-8 h-full flex flex-col items-center justify-center text-center">
      <IconComponent className={`w-20 h-20 ${currentTheme.accent} mb-6`} />
      <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3`}>{layout.name}</h3>
      <p className={`${currentTheme.textSecondary} max-w-md leading-relaxed mb-6`}>
        {layout.description}
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {layout.features.slice(0, 3).map((feature, i) => (
          <span key={i} className={`px-3 py-1 text-sm ${currentTheme.accentBg} ${currentTheme.accent} rounded-full`}>
            {feature}
          </span>
        ))}
      </div>
    </div>
  </div>
);
```

};

const renderLayout = () => {
switch (selectedLayout) {
case ‘neural-network’:
return renderNeuralNetwork();
case ‘quantum-grid’:
return renderQuantumGrid();
case ‘bio-helix’:
return renderBioHelix();
default:
return renderDefaultLayout(selectedLayout);
}
};

const deviceSizes = {
desktop: ‘w-full h-[500px]’,
tablet: ‘w-[768px] h-[400px] mx-auto’,
mobile: ‘w-[375px] h-[600px] mx-auto’
};

const selectedLayoutData = layouts[selectedLayout];
const SelectedLayoutIcon = selectedLayoutData ? selectedLayoutData.icon : LayoutGrid;

return (
<div className={`min-h-screen ${currentTheme.bg} transition-colors duration-300`}>
{/* Header */}
<header className={`sticky top-0 z-50 ${currentTheme.surface} border-b ${currentTheme.border} ${currentTheme.shadow} backdrop-blur-sm`}>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16">
{/* Logo and Title */}
<div className="flex items-center space-x-4">
<div className={`w-10 h-10 ${currentTheme.button} rounded-lg flex items-center justify-center`}>
<LayoutGrid className="w-6 h-6" />
</div>
<div>
<h1 className={`text-xl font-bold ${currentTheme.text}`}>Portal Design System</h1>
<p className={`text-sm ${currentTheme.textMuted}`}>Professional UI Showcase</p>
</div>
</div>

```
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button className={`px-4 py-2 text-sm font-medium ${currentTheme.text} ${currentTheme.surfaceHover} rounded-lg transition-colors`}>
            Layouts
          </button>
          <button className={`px-4 py-2 text-sm font-medium ${currentTheme.textSecondary} ${currentTheme.surfaceHover} rounded-lg transition-colors`}>
            Components
          </button>
          <button className={`px-4 py-2 text-sm font-medium ${currentTheme.textSecondary} ${currentTheme.surfaceHover} rounded-lg transition-colors`}>
            Documentation
          </button>
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 ${currentTheme.surfaceHover} rounded-lg transition-colors`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className={`w-5 h-5 ${currentTheme.textSecondary}`} /> : <Moon className={`w-5 h-5 ${currentTheme.textSecondary}`} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${currentTheme.surfaceHover} rounded-lg transition-colors`}
          >
            {isMobileMenuOpen ? <X className={`w-5 h-5 ${currentTheme.textSecondary}`} /> : <Menu className={`w-5 h-5 ${currentTheme.textSecondary}`} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className={`md:hidden border-t ${currentTheme.border} ${currentTheme.surface}`}>
        <div className="px-4 py-3 space-y-2">
          <button className={`block w-full text-left px-4 py-2 text-sm font-medium ${currentTheme.text} ${currentTheme.surfaceHover} rounded-lg transition-colors`}>
            Layouts
          </button>
          <button className={`block w-full text-left px-4 py-2 text-sm font-medium ${currentTheme.textSecondary} ${currentTheme.surfaceHover} rounded-lg transition-colors`}>
            Components
          </button>
          <button className={`block w-full text-left px-4 py-2 text-sm font-medium ${currentTheme.textSecondary} ${currentTheme.surfaceHover} rounded-lg transition-colors`}>
            Documentation
          </button>
        </div>
      </div>
    )}
  </header>

  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Hero Section */}
    <div className="text-center mb-12">
      <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-4`}>
        Modern Portal Layouts
      </h2>
      <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
        Explore professional portal navigation patterns designed for modern applications. 
        Each layout is crafted with accessibility, performance, and user experience in mind.
      </p>
    </div>

    {/* Controls Bar */}
    <div className={`${currentTheme.surface} rounded-xl p-4 ${currentTheme.shadow} border ${currentTheme.border} mb-8`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textMuted}`} />
            <input
              type="text"
              placeholder="Search layouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full sm:w-64 text-sm rounded-lg border ${currentTheme.input} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>
          
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className={`px-3 py-2 text-sm rounded-lg border ${currentTheme.input} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-2 text-sm rounded-lg border ${currentTheme.input} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          >
            <option value="name">Sort by Name</option>
            <option value="complexity">Sort by Complexity</option>
            <option value="category">Sort by Category</option>
            <option value="updated">Sort by Last Updated</option>
          </select>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-3">
          <div className={`flex items-center ${currentTheme.surface} rounded-lg border ${currentTheme.border} p-1`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? currentTheme.button : currentTheme.surfaceHover}`}
            >
              <Grid3X3 className={`w-4 h-4 ${viewMode === 'grid' ? 'text-white' : currentTheme.textSecondary}`} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? currentTheme.button : currentTheme.surfaceHover}`}
            >
              <List className={`w-4 h-4 ${viewMode === 'list' ? 'text-white' : currentTheme.textSecondary}`} />
            </button>
          </div>

          <div className={`flex items-center ${currentTheme.surface} rounded-lg border ${currentTheme.border} p-1`}>
            {[
              { id: 'desktop', icon: Monitor },
              { id: 'tablet', icon: Tablet },
              { id: 'mobile', icon: Smartphone }
            ].map(device => (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`p-2 rounded-md transition-colors ${selectedDevice === device.id ? currentTheme.button : currentTheme.surfaceHover}`}
                title={`Preview on ${device.id}`}
              >
                <device.icon className={`w-4 h-4 ${selectedDevice === device.id ? 'text-white' : currentTheme.textSecondary}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Layout Grid */}
    <div className={`grid gap-6 mb-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {sortedLayouts.map(([key, layout]) => {
        const LayoutIcon = layout.icon;
        return (
          <div
            key={key}
            onClick={() => {
              setLayoutTransition(true);
              setTimeout(() => {
                setSelectedLayout(key);
                setLayoutTransition(false);
              }, 150);
              handleInteraction();
            }}
            className={`group cursor-pointer ${currentTheme.surface} rounded-xl p-6 ${currentTheme.shadow} ${currentTheme.shadowHover} border ${currentTheme.border} ${currentTheme.borderHover} transition-all duration-300 hover:scale-[1.02] ${
              selectedLayout === key ? `ring-2 ring-blue-500/20 ${currentTheme.accentBg}` : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${selectedLayout === key ? currentTheme.button : currentTheme.accentBg} rounded-xl flex items-center justify-center transition-colors`}>
                <LayoutIcon className={`w-6 h-6 ${selectedLayout === key ? 'text-white' : currentTheme.accent}`} />
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  layout.complexity === 'Medium' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                  layout.complexity === 'Advanced' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {layout.complexity}
                </span>
                {selectedLayout === key && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>

            <h3 className={`text-lg font-bold ${currentTheme.text} mb-2`}>{layout.name}</h3>
            <p className={`text-sm ${currentTheme.textSecondary} mb-3`}>{layout.category}</p>
            <p className={`text-sm ${currentTheme.textMuted} leading-relaxed mb-4`}>{layout.description}</p>

            <div className="space-y-3">
              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className={`font-semibold ${currentTheme.text}`}>{layout.performance.speed}%</div>
                  <div className={currentTheme.textMuted}>Speed</div>
                </div>
                <div className="text-center">
                  <div className={`font-semibold ${currentTheme.text}`}>{layout.performance.accessibility}%</div>
                  <div className={currentTheme.textMuted}>A11y</div>
                </div>
                <div className="text-center">
                  <div className={`font-semibold ${currentTheme.text}`}>{layout.performance.responsive}%</div>
                  <div className={currentTheme.textMuted}>Mobile</div>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {layout.features.slice(0, 3).map((feature, i) => (
                  <span key={i} className={`px-2 py-1 text-xs ${currentTheme.textMuted} bg-gray-100 dark:bg-gray-700 rounded`}>
                    {feature}
                  </span>
                ))}
              </div>

              {/* Last Updated */}
              <div className={`text-xs ${currentTheme.textMuted} flex items-center`}>
                <Clock className="w-3 h-3 mr-1" />
                Updated {new Date(layout.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Layout Preview */}
    {selectedLayout && selectedLayoutData && (
      <div className={`${currentTheme.surface} rounded-xl ${currentTheme.shadow} border ${currentTheme.border} overflow-hidden`}>
        <div className={`p-6 border-b ${currentTheme.border} bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SelectedLayoutIcon className={`w-8 h-8 ${currentTheme.accent}`} />
              <div>
                <h3 className={`text-xl font-bold ${currentTheme.text}`}>
                  {selectedLayoutData.name}
                </h3>
                <p className={`${currentTheme.textSecondary}`}>
                  {selectedLayoutData.category} • Viewing on {selectedDevice}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowLayoutInfo(!showLayoutInfo)}
                className={`p-2 ${currentTheme.surfaceHover} rounded-lg transition-colors`}
                title="Layout Information"
              >
                <Info className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              </button>
              <button
                onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                className={`p-2 ${currentTheme.surfaceHover} rounded-lg transition-colors`}
                title="Fullscreen Preview"
              >
                <Maximize2 className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              </button>
              <button
                onClick={handleInteraction}
                className={`p-2 ${currentTheme.surfaceHover} rounded-lg transition-colors`}
                title="Download Code"
              >
                <Download className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-center">
            <div className={`${deviceSizes[selectedDevice]} border-2 ${currentTheme.border} rounded-xl overflow-hidden transition-all duration-300 ${
              layoutTransition ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}>
              {renderLayout()}
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Layout Information Panel */}
    {showLayoutInfo && selectedLayout && selectedLayoutData && (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm`}>
        <div className={`${currentTheme.surface} rounded-xl ${currentTheme.shadow} border ${currentTheme.border} max-w-2xl w-full max-h-[80vh] overflow-auto`}>
          <div className={`p-6 border-b ${currentTheme.border}`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-bold ${currentTheme.text}`}>
                {selectedLayoutData.name} Details
              </h3>
              <button
                onClick={() => setShowLayoutInfo(false)}
                className={`p-2 ${currentTheme.surfaceHover} rounded-lg transition-colors`}
              >
                <X className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h4 className={`font-semibold ${currentTheme.text} mb-2`}>Description</h4>
              <p className={`${currentTheme.textSecondary} leading-relaxed`}>
                {selectedLayoutData.description}
              </p>
            </div>

            <div>
              <h4 className={`font-semibold ${currentTheme.text} mb-3`}>Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedLayoutData.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${currentTheme.textSecondary}`}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`font-semibold ${currentTheme.text} mb-3`}>Use Cases</h4>
              <div className="space-y-2">
                {selectedLayoutData.useCases.map((useCase, i) => (
                  <div key={i} className={`p-3 ${currentTheme.accentBg} rounded-lg`}>
                    <span className={`text-sm ${currentTheme.accent}`}>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`font-semibold ${currentTheme.text} mb-3`}>Performance Metrics</h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(selectedLayoutData.performance).map(([metric, value]) => (
                  <div key={metric} className={`text-center p-3 ${currentTheme.surface} rounded-lg border ${currentTheme.border}`}>
                    <div className={`text-xl font-bold ${currentTheme.text}`}>{value}%</div>
                    <div className={`text-sm ${currentTheme.textMuted} capitalize`}>{metric}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Fullscreen Preview */}
    {isPreviewFullscreen && selectedLayout && selectedLayoutData && (
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm p-4">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {selectedLayoutData.name} - Fullscreen Preview
            </h3>
            <button
              onClick={() => setIsPreviewFullscreen(false)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-full max-w-6xl border border-gray-600 rounded-xl overflow-hidden">
              {renderLayout()}
            </div>
          </div>
        </div>
      </div>
    )}
  </main>

  {/* Footer */}
  <footer className={`${currentTheme.surface} border-t ${currentTheme.border} mt-16`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <p className={`${currentTheme.textSecondary} mb-2`}>
          Professional Portal Design System © 2025
        </p>
        <p className={`text-sm ${currentTheme.textMuted}`}>
          {userInteractions} total interactions • Built with modern web technologies
        </p>
      </div>
    </div>
  </footer>
</div>
```

);
};

export default ProfessionalPortalShowcase;
