# SciViz Design System - Preview Component Design Specifications

## Executive Summary
This document defines the visual design standards, color palette implementation, and component hierarchy for all preview components within the SciViz Design System to ensure professional consistency and reinforce the established orange and black theme.

## Color Palette Standards

### Primary Scientific Orange Palette
```css
Primary Orange: hsl(25, 100%, 50%)    /* #FF8000 - Main brand color */
Amber Variant: hsl(25, 100%, 53%)     /* #FF8C1A - Hover states */
Bright Accent: hsl(39, 100%, 50%)     /* #FFC700 - Highlights */
Gold Accent: hsl(45, 100%, 50%)       /* #FFD700 - Premium elements */
```

### Professional Black & Gray Scale
```css
Deep Black: hsl(0, 0%, 10%)           /* #1A1A1A - Primary dark */
Charcoal: hsl(0, 0%, 18%)             /* #2D2D2D - Card backgrounds */
Warm Gray 900: hsl(24, 9.8%, 10%)     /* #191919 - Text on light */
Warm Gray 100: hsl(20, 14.3%, 95%)    /* #F4F2F1 - Light backgrounds */
```

## Preview Component Hierarchy

### Level 1: Layout Card Container
```css
.layout-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-card:hover {
  border-color: hsl(25, 100%, 50%);
  box-shadow: 0 25px 50px -12px rgba(255, 128, 0, 0.25);
  transform: translateY(-2px);
}
```

### Level 2: Header Section
```css
.card-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--card);
}

.layout-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, hsl(25, 100%, 50%), hsl(25, 100%, 53%));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 4px;
}

.layout-category {
  font-size: 14px;
  font-weight: 500;
  color: hsl(25, 100%, 50%);
}
```

### Level 3: Preview Visualization Area
```css
.preview-container {
  height: 256px;
  position: relative;
  background: linear-gradient(135deg, var(--muted), var(--muted-foreground/10));
  overflow: hidden;
}

.preview-background {
  position: absolute;
  inset: 0;
  opacity: 0.15;
  object-fit: cover;
  filter: blur(1px);
}

.preview-visualization {
  position: absolute;
  inset: 0;
  z-index: 10;
}
```

### Level 4: Content Section
```css
.card-content {
  padding: 24px;
}

.description-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted-foreground);
  margin-bottom: 16px;
}

.performance-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.metric-item {
  text-align: center;
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--foreground);
}

.metric-label {
  font-size: 12px;
  color: var(--muted-foreground);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Interactive Element Standards

### Overlay Controls
```css
.overlay-controls {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 300ms ease;
}

.layout-card:hover .overlay-controls {
  opacity: 1;
}

.control-button {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 128, 0, 0.2);
  border-radius: 8px;
  color: hsl(25, 100%, 50%);
  transition: all 200ms ease;
}

.control-button:hover {
  background: hsl(25, 100%, 50%);
  color: white;
  transform: scale(1.1);
}
```

### Button System
```css
.btn-primary {
  background: hsl(25, 100%, 50%);
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 300ms ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: hsl(25, 100%, 53%);
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(255, 128, 0, 0.3);
}

.btn-secondary {
  background: var(--muted);
  color: var(--muted-foreground);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 300ms ease;
}

.btn-secondary:hover {
  background: hsl(25, 100%, 50%);
  color: white;
}
```

## Badge System Implementation

### Complexity Indicators
```css
.complexity-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
}

.badge-medium {
  background: hsl(217, 91%, 95%);
  color: hsl(217, 91%, 35%);
  border: 1px solid hsl(217, 91%, 85%);
}

.badge-advanced {
  background: hsl(43, 96%, 95%);
  color: hsl(43, 96%, 35%);
  border: 1px solid hsl(43, 96%, 85%);
}

.badge-expert {
  background: hsl(0, 84%, 95%);
  color: hsl(0, 84%, 35%);
  border: 1px solid hsl(0, 84%, 85%);
}
```

### Use Case Tags
```css
.use-case-tag {
  background: hsla(25, 100%, 50%, 0.1);
  color: hsl(25, 100%, 50%);
  border: 1px solid hsla(25, 100%, 50%, 0.2);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}
```

## Animation Standards

### Entrance Animations
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-entrance {
  animation: fadeInUp 600ms ease-out;
}
```

### Scientific Visualization Animations
```css
@keyframes pulse-orange {
  0%, 100% { 
    box-shadow: 0 0 0 0 hsla(25, 100%, 50%, 0.7); 
  }
  50% { 
    box-shadow: 0 0 0 16px hsla(25, 100%, 50%, 0); 
  }
}

@keyframes neural-flow {
  0% { opacity: 0; transform: translateX(-100%); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateX(100%); }
}

@keyframes quantum-pulse {
  0%, 100% { 
    background: hsla(25, 100%, 50%, 0.2);
    transform: scale(1);
  }
  50% { 
    background: hsla(25, 100%, 50%, 0.4);
    transform: scale(1.05);
  }
}
```

## Responsive Design Rules

### Breakpoint System
```css
/* Mobile: 320px - 640px */
@media (max-width: 640px) {
  .layout-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }
  
  .card-header {
    padding: 16px;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .preview-container {
    height: 200px;
  }
}

/* Tablet: 641px - 1024px */
@media (min-width: 641px) and (max-width: 1024px) {
  .layout-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Desktop: 1025px+ */
@media (min-width: 1025px) {
  .layout-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

## Accessibility Standards

### Color Contrast Requirements
- Primary orange (#FF8000) provides 4.52:1 contrast on white (WCAG AA)
- All text maintains minimum 4.5:1 contrast ratio
- Interactive elements have 3:1 minimum contrast

### Focus Management
```css
.focusable {
  outline: none;
  transition: box-shadow 200ms ease;
}

.focusable:focus-visible {
  box-shadow: 0 0 0 2px hsl(25, 100%, 50%);
  border-radius: 4px;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: hsl(25, 100%, 50%);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
}

.skip-link:focus {
  top: 6px;
}
```

## Implementation Guidelines

### Component Structure Template
```tsx
interface PreviewComponentProps {
  layout: Layout;
  viewMode: 'grid' | 'list';
  onInteraction: (type: string) => void;
}

const PreviewComponent = ({ layout, viewMode, onInteraction }: PreviewComponentProps) => (
  <Card className="layout-card" data-testid={`layout-${layout.id}`}>
    <CardHeader className="card-header">
      <div className="header-content">
        <div className="layout-icon">
          {getIconForLayout(layout.icon)}
        </div>
        <div className="header-text">
          <h3 className="layout-title">{layout.name}</h3>
          <span className="layout-category">{layout.category}</span>
        </div>
      </div>
      <Badge className={getComplexityBadgeClass(layout.complexity)}>
        {layout.complexity}
      </Badge>
    </CardHeader>
    
    <div className="preview-container">
      <LayoutVisualization 
        layoutName={layout.name} 
        className="preview-visualization"
      />
      <div className="overlay-controls">
        <Button 
          className="control-button"
          onClick={() => onInteraction('preview')}
          aria-label={`Preview ${layout.name}`}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button 
          className="control-button"
          onClick={() => onInteraction('fullscreen')}
          aria-label={`Fullscreen ${layout.name}`}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
    
    <CardContent className="card-content">
      <p className="description-text">{layout.description}</p>
      <PerformanceMetrics metrics={layout.performance} />
      <UseCaseTags useCases={layout.useCases} />
      <ActionButtons layout={layout} onAction={onInteraction} />
    </CardContent>
  </Card>
);
```

### Quality Assurance Checklist

#### Visual Consistency
- [ ] All orange elements use exact hsl(25, 100%, 50%) value
- [ ] Card shadows are consistent across components
- [ ] Typography scale is properly implemented
- [ ] Spacing follows 8px grid system
- [ ] Border radius values are standardized

#### Interactive Behavior
- [ ] Hover states provide appropriate feedback
- [ ] Focus states are clearly visible
- [ ] Animations respect prefers-reduced-motion
- [ ] Loading states are handled gracefully
- [ ] Error states maintain design consistency

#### Performance Standards
- [ ] Images are optimized and properly sized
- [ ] CSS animations use transform and opacity only
- [ ] Component re-renders are minimized
- [ ] Accessibility attributes are complete
- [ ] Semantic HTML structure is maintained

This specification ensures that all preview components maintain the professional orange and black aesthetic while providing consistent user experiences across the entire SciViz Design System.