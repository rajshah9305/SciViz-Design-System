export const categories = [
  'All Layouts',
  'AI & Machine Learning',
  'Scientific Computing',
  'Life Sciences',
  'Astrophysics',
  'Engineering',
  'Mathematics',
  'Materials Science',
  'Spatial Computing'
];

export const complexityLevels = [
  { value: 'Medium', label: 'Medium', color: 'blue' },
  { value: 'Advanced', label: 'Advanced', color: 'amber' },
  { value: 'Expert', label: 'Expert', color: 'red' }
];

export const sortOptions = [
  { value: 'name', label: 'Sort by Name' },
  { value: 'complexity', label: 'Sort by Complexity' },
  { value: 'category', label: 'Sort by Category' },
  { value: 'updated', label: 'Sort by Last Updated' },
  { value: 'downloads', label: 'Sort by Downloads' }
];

export const deviceViewports = [
  { 
    id: 'desktop', 
    label: 'Desktop', 
    icon: 'Monitor',
    width: '100%',
    maxWidth: 'none'
  },
  { 
    id: 'tablet', 
    label: 'Tablet', 
    icon: 'Tablet',
    width: '768px',
    maxWidth: '768px'
  },
  { 
    id: 'mobile', 
    label: 'Mobile', 
    icon: 'Smartphone',
    width: '375px',
    maxWidth: '375px'
  }
];

export const viewModes = [
  { id: 'grid', label: 'Grid View', icon: 'Grid3X3' },
  { id: 'list', label: 'List View', icon: 'List' }
];

// Icon mapping for layout types
export const iconMap: Record<string, string> = {
  'Brain': '🧠',
  'Atom': '⚛️',
  'Dna': '🧬',
  'Telescope': '🔭',
  'Waves': '🌊',
  'Infinity': '♾️',
  'Microscope': '🔬',
  'Layers3': '📊'
};

// Performance score helpers
export const getPerformanceColor = (score: number): string => {
  if (score >= 95) return 'text-green-600 dark:text-green-400';
  if (score >= 90) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 85) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

export const getComplexityColor = (complexity: string): string => {
  switch (complexity) {
    case 'Medium':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
    case 'Advanced':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300';
    case 'Expert':
      return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    default:
      return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
  }
};
