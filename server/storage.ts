import { layouts, interactions, type Layout, type InsertLayout, type Interaction, type InsertInteraction, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Layout management
  getAllLayouts(): Promise<Layout[]>;
  getLayout(id: number): Promise<Layout | undefined>;
  getLayoutsByCategory(category: string): Promise<Layout[]>;
  createLayout(layout: InsertLayout): Promise<Layout>;
  updateLayoutDownloadCount(id: number): Promise<void>;
  searchLayouts(query: string): Promise<Layout[]>;
  
  // Interaction tracking
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;
  getInteractionStats(): Promise<{
    totalInteractions: number;
    totalDownloads: number;
    popularLayouts: Array<{ layoutId: number; layoutName: string; count: number }>;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private layouts: Map<number, Layout>;
  private interactions: Map<number, Interaction>;
  private currentUserId: number;
  private currentLayoutId: number;
  private currentInteractionId: number;

  constructor() {
    this.users = new Map();
    this.layouts = new Map();
    this.interactions = new Map();
    this.currentUserId = 1;
    this.currentLayoutId = 1;
    this.currentInteractionId = 1;
    
    // Initialize with sample layouts
    this.initializeLayouts();
  }

  private initializeLayouts() {
    const sampleLayouts: Omit<Layout, 'id'>[] = [
      {
        name: 'Neural Network',
        category: 'AI & Machine Learning',
        description: 'Interconnected nodes representing AI neural pathways with dynamic data flow visualization.',
        complexity: 'Advanced',
        useCases: ['AI Dashboards', 'Data Science Platforms', 'Machine Learning Tools'],
        features: ['Dynamic Connections', 'Real-time Data Flow', 'Interactive Nodes', 'Scalable Architecture'],
        performance: { speed: 92, accessibility: 96, responsive: 98 },
        lastUpdated: new Date('2025-01-15'),
        icon: 'Brain',
        downloadCount: 1247,
        isActive: true
      },
      {
        name: 'Quantum Grid',
        category: 'Scientific Computing',
        description: 'Quantum computing visualization with probability states and superposition effects.',
        complexity: 'Expert',
        useCases: ['Quantum Computing', 'Scientific Research', 'Advanced Analytics'],
        features: ['Quantum States', 'Probability Visualization', 'Superposition Effects', 'Research-Grade UI'],
        performance: { speed: 89, accessibility: 94, responsive: 96 },
        lastUpdated: new Date('2025-01-12'),
        icon: 'Atom',
        downloadCount: 892,
        isActive: true
      },
      {
        name: 'Bio Helix',
        category: 'Life Sciences',
        description: 'DNA-inspired double helix structure for biological data and research applications.',
        complexity: 'Medium',
        useCases: ['Biotechnology', 'Medical Research', 'Genetic Analysis'],
        features: ['Helix Structure', 'Genetic Patterns', 'Biological Data', 'Research Tools'],
        performance: { speed: 94, accessibility: 97, responsive: 99 },
        lastUpdated: new Date('2025-01-10'),
        icon: 'Dna',
        downloadCount: 1456,
        isActive: true
      },
      {
        name: 'Cosmic Web',
        category: 'Astrophysics',
        description: 'Large-scale universe structure visualization for astronomical and space research.',
        complexity: 'Advanced',
        useCases: ['Space Research', 'Astronomy', 'Data Visualization'],
        features: ['Cosmic Scale', 'Astronomical Data', 'Space Visualization', 'Research Interface'],
        performance: { speed: 88, accessibility: 93, responsive: 95 },
        lastUpdated: new Date('2025-01-08'),
        icon: 'Telescope',
        downloadCount: 1023,
        isActive: true
      },
      {
        name: 'Fluid Dynamics',
        category: 'Engineering',
        description: 'Real-time fluid simulation interface for engineering and scientific modeling.',
        complexity: 'Advanced',
        useCases: ['Engineering Software', 'Simulation Tools', 'Scientific Modeling'],
        features: ['Fluid Simulation', 'Real-time Physics', 'Engineering Tools', 'Technical Interface'],
        performance: { speed: 85, accessibility: 95, responsive: 97 },
        lastUpdated: new Date('2025-01-05'),
        icon: 'Waves',
        downloadCount: 834,
        isActive: true
      },
      {
        name: 'Fractal Geometry',
        category: 'Mathematics',
        description: 'Self-similar recursive patterns for mathematical and analytical applications.',
        complexity: 'Expert',
        useCases: ['Mathematical Modeling', 'Pattern Analysis', 'Research Tools'],
        features: ['Fractal Patterns', 'Mathematical Precision', 'Infinite Zoom', 'Pattern Recognition'],
        performance: { speed: 87, accessibility: 92, responsive: 94 },
        lastUpdated: new Date('2025-01-03'),
        icon: 'Infinity',
        downloadCount: 678,
        isActive: true
      },
      {
        name: 'Crystal Lattice',
        category: 'Materials Science',
        description: 'Atomic structure visualization for chemistry and materials research.',
        complexity: 'Medium',
        useCases: ['Chemistry Research', 'Materials Science', 'Molecular Modeling'],
        features: ['Atomic Structure', 'Molecular Bonds', 'Crystal Patterns', 'Scientific Accuracy'],
        performance: { speed: 93, accessibility: 96, responsive: 98 },
        lastUpdated: new Date('2025-01-01'),
        icon: 'Microscope',
        downloadCount: 1189,
        isActive: true
      },
      {
        name: 'Holographic Matrix',
        category: 'Spatial Computing',
        description: 'Multi-dimensional interface design for AR/VR and spatial computing platforms.',
        complexity: 'Expert',
        useCases: ['AR/VR Applications', 'Spatial Computing', '3D Interfaces'],
        features: ['3D Layers', 'Spatial Navigation', 'Immersive Design', 'Future Interface'],
        performance: { speed: 86, accessibility: 89, responsive: 91 },
        lastUpdated: new Date('2024-12-28'),
        icon: 'Layers3',
        downloadCount: 756,
        isActive: true
      }
    ];

    sampleLayouts.forEach(layout => {
      const fullLayout: Layout = {
        ...layout,
        id: this.currentLayoutId++
      };
      this.layouts.set(fullLayout.id, fullLayout);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllLayouts(): Promise<Layout[]> {
    return Array.from(this.layouts.values()).filter(layout => layout.isActive);
  }

  async getLayout(id: number): Promise<Layout | undefined> {
    return this.layouts.get(id);
  }

  async getLayoutsByCategory(category: string): Promise<Layout[]> {
    return Array.from(this.layouts.values()).filter(
      layout => layout.isActive && layout.category === category
    );
  }

  async createLayout(insertLayout: InsertLayout): Promise<Layout> {
    const id = this.currentLayoutId++;
    const layout: Layout = {
      ...insertLayout,
      id,
      lastUpdated: new Date(),
      downloadCount: 0,
      isActive: true
    };
    this.layouts.set(id, layout);
    return layout;
  }

  async updateLayoutDownloadCount(id: number): Promise<void> {
    const layout = this.layouts.get(id);
    if (layout) {
      layout.downloadCount++;
      this.layouts.set(id, layout);
    }
  }

  async searchLayouts(query: string): Promise<Layout[]> {
    const normalizedQuery = query.toLowerCase();
    return Array.from(this.layouts.values()).filter(layout => 
      layout.isActive && (
        layout.name.toLowerCase().includes(normalizedQuery) ||
        layout.description.toLowerCase().includes(normalizedQuery) ||
        layout.category.toLowerCase().includes(normalizedQuery) ||
        layout.features.some(feature => feature.toLowerCase().includes(normalizedQuery)) ||
        layout.useCases.some(useCase => useCase.toLowerCase().includes(normalizedQuery))
      )
    );
  }

  async createInteraction(insertInteraction: InsertInteraction): Promise<Interaction> {
    const id = this.currentInteractionId++;
    const interaction: Interaction = {
      id,
      layoutId: insertInteraction.layoutId ?? null,
      interactionType: insertInteraction.interactionType,
      timestamp: new Date(),
      userAgent: insertInteraction.userAgent ?? null,
      sessionId: insertInteraction.sessionId ?? null
    };
    this.interactions.set(id, interaction);
    return interaction;
  }

  async getInteractionStats(): Promise<{
    totalInteractions: number;
    totalDownloads: number;
    popularLayouts: Array<{ layoutId: number; layoutName: string; count: number }>;
  }> {
    const interactions = Array.from(this.interactions.values());
    const downloads = interactions.filter(i => i.interactionType === 'download');
    
    // Count interactions per layout
    const layoutCounts = new Map<number, number>();
    interactions.forEach(interaction => {
      if (interaction.layoutId) {
        const current = layoutCounts.get(interaction.layoutId) || 0;
        layoutCounts.set(interaction.layoutId, current + 1);
      }
    });

    // Get popular layouts
    const popularLayouts = Array.from(layoutCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([layoutId, count]) => {
        const layout = this.layouts.get(layoutId);
        return {
          layoutId,
          layoutName: layout?.name || 'Unknown',
          count
        };
      });

    return {
      totalInteractions: interactions.length,
      totalDownloads: downloads.length,
      popularLayouts
    };
  }
}

export const storage = new MemStorage();
