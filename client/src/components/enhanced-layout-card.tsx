import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Eye, Maximize2, Info, Clock, TrendingUp } from "lucide-react";
import { LayoutVisualization } from "./layout-visualizations";
import { getComplexityColor, iconMap } from "@/lib/layouts-data";
import { getImageSrc, formatNumber, formatDate } from "@/lib/theme-utils";
import type { Layout } from "@shared/schema";

interface EnhancedLayoutCardProps {
  layout: Layout;
  onPreview: (layout: Layout) => void;
  onFullscreen: (layout: Layout) => void;
  onInfo: (layout: Layout) => void;
  onUse: (layout: Layout) => void;
  viewMode?: 'grid' | 'list';
  priority?: 'standard' | 'featured';
}

export function EnhancedLayoutCard({ 
  layout, 
  onPreview, 
  onFullscreen, 
  onInfo, 
  onUse,
  viewMode = 'grid',
  priority = 'standard'
}: EnhancedLayoutCardProps) {
  const cardClasses = `
    group relative overflow-hidden transition-all duration-500 ease-out
    ${priority === 'featured' 
      ? 'ring-2 ring-[hsl(25,100%,50%)] ring-opacity-50' 
      : ''
    }
    bg-white dark:bg-[hsl(0,0%,18%)] 
    border border-gray-200 dark:border-gray-700
    rounded-xl shadow-sm
    hover:shadow-2xl hover:shadow-[hsl(25,100%,50%)]/20
    hover:border-[hsl(25,100%,50%)]
    hover:-translate-y-1
    ${viewMode === 'list' ? 'flex' : 'flex-col'}
  `;

  if (viewMode === 'list') {
    return (
      <Card className={cardClasses}>
        {/* Enhanced Preview Area for List View */}
        <div className="relative w-80 h-56 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          {/* Scientific Background */}
          <img 
            src={getImageSrc(layout.category, layout.name)} 
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-sm"
          />
          
          {/* Interactive Visualization */}
          <div className="absolute inset-0 z-10">
            <LayoutVisualization layoutName={layout.name} />
          </div>
          
          {/* Overlay Controls with Enhanced Styling */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onPreview(layout)}
              className="w-10 h-10 p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-[hsl(25,100%,50%)]/20 hover:bg-[hsl(25,100%,50%)] hover:text-white hover:scale-110 transition-all duration-200"
              aria-label={`Preview ${layout.name}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onFullscreen(layout)}
              className="w-10 h-10 p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-[hsl(25,100%,50%)]/20 hover:bg-[hsl(25,100%,50%)] hover:text-white hover:scale-110 transition-all duration-200"
              aria-label={`Fullscreen ${layout.name}`}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Priority Indicator */}
          {priority === 'featured' && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Enhanced Content Section */}
        <div className="flex-1 p-8">
          {/* Header with Enhanced Typography */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] rounded-xl flex items-center justify-center group-hover:animate-pulse-orange shadow-lg">
                <span className="text-white text-xl font-bold">{iconMap[layout.icon] || '🔬'}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{layout.name}</h3>
                <p className="text-[hsl(25,100%,50%)] font-semibold text-lg">{layout.category}</p>
              </div>
            </div>
            <Badge className={`${getComplexityColor(layout.complexity)} text-sm px-3 py-1`}>
              {layout.complexity}
            </Badge>
          </div>

          {/* Enhanced Description */}
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
            {layout.description}
          </p>

          {/* Performance Metrics with Enhanced Design */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {[
              { label: 'Speed', value: layout.performance.speed, icon: TrendingUp },
              { label: 'Accessibility', value: layout.performance.accessibility, icon: Eye },
              { label: 'Responsive', value: layout.performance.responsive, icon: Maximize2 }
            ].map((metric) => (
              <div key={metric.label} className="text-center group/metric">
                <div className="flex items-center justify-center mb-2">
                  <metric.icon className="w-5 h-5 text-[hsl(25,100%,50%)] mr-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}%</div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{metric.label}</div>
                <Progress 
                  value={metric.value} 
                  className="h-2 mt-2 bg-gray-200 dark:bg-gray-700"
                />
              </div>
            ))}
          </div>

          {/* Use Cases with Enhanced Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {layout.useCases.slice(0, 4).map((useCase) => (
              <Badge 
                key={useCase} 
                variant="secondary" 
                className="bg-[hsl(25,100%,50%)]/10 text-[hsl(25,100%,50%)] border-[hsl(25,100%,50%)]/20 hover:bg-[hsl(25,100%,50%)]/20 transition-colors duration-200 text-sm px-3 py-1"
              >
                {useCase}
              </Badge>
            ))}
          </div>

          {/* Enhanced Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                {formatNumber(layout.downloadCount)} downloads
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatDate(layout.lastUpdated)}
              </span>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={() => onUse(layout)}
              className="flex-1 bg-[hsl(25,100%,50%)] text-white hover:bg-[hsl(25,100%,53%)] transition-all duration-300 font-semibold py-3 px-6 shadow-lg hover:shadow-xl hover:shadow-[hsl(25,100%,50%)]/30"
            >
              <Download className="mr-2 h-5 w-5" />
              Use Layout
            </Button>
            <Button
              variant="outline"
              onClick={() => onInfo(layout)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[hsl(25,100%,50%)] hover:text-white transition-all duration-300 px-4 py-3"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Enhanced Grid View
  return (
    <Card className={cardClasses}>
      {/* Enhanced Header */}
      <CardHeader className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] rounded-xl flex items-center justify-center group-hover:animate-pulse-orange shadow-md">
              <span className="text-white text-lg font-bold">{iconMap[layout.icon] || '🔬'}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{layout.name}</h3>
              <p className="text-[hsl(25,100%,50%)] font-semibold">{layout.category}</p>
            </div>
          </div>
          <Badge className={`${getComplexityColor(layout.complexity)} px-3 py-1`}>
            {layout.complexity}
          </Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {layout.description}
        </p>
      </CardHeader>

      {/* Enhanced Preview Area */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Scientific Background */}
        <img 
          src={getImageSrc(layout.category, layout.name)} 
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-sm"
        />
        
        {/* Interactive Visualization */}
        <div className="absolute inset-0 z-10">
          <LayoutVisualization layoutName={layout.name} />
        </div>
        
        {/* Enhanced Overlay Controls */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onPreview(layout)}
            className="w-10 h-10 p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-[hsl(25,100%,50%)]/20 hover:bg-[hsl(25,100%,50%)] hover:text-white hover:scale-110 transition-all duration-200"
            aria-label={`Preview ${layout.name}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onFullscreen(layout)}
            className="w-10 h-10 p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-[hsl(25,100%,50%)]/20 hover:bg-[hsl(25,100%,50%)] hover:text-white hover:scale-110 transition-all duration-200"
            aria-label={`Fullscreen ${layout.name}`}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Priority Indicator */}
        {priority === 'featured' && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse-orange">
            Featured
          </div>
        )}
      </div>

      {/* Enhanced Content */}
      <CardContent className="p-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Speed', value: layout.performance.speed },
            { label: 'Accessibility', value: layout.performance.accessibility },
            { label: 'Responsive', value: layout.performance.responsive }
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{metric.label}</div>
              <Progress value={metric.value} className="h-1.5 mt-2 bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
        
        {/* Use Cases */}
        <div className="flex flex-wrap gap-2 mb-4">
          {layout.useCases.slice(0, 3).map((useCase) => (
            <Badge 
              key={useCase} 
              variant="secondary" 
              className="bg-[hsl(25,100%,50%)]/10 text-[hsl(25,100%,50%)] border-[hsl(25,100%,50%)]/20 text-xs hover:bg-[hsl(25,100%,50%)]/20 transition-colors duration-200"
            >
              {useCase}
            </Badge>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center">
            <Download className="w-3 h-3 mr-1" />
            {formatNumber(layout.downloadCount)}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(layout.lastUpdated)}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={() => onUse(layout)}
            className="flex-1 bg-[hsl(25,100%,50%)] text-white hover:bg-[hsl(25,100%,53%)] transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:shadow-[hsl(25,100%,50%)]/30"
          >
            <Download className="mr-2 h-4 w-4" />
            Use Layout
          </Button>
          <Button
            variant="outline"
            onClick={() => onInfo(layout)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[hsl(25,100%,50%)] hover:text-white transition-all duration-300"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}