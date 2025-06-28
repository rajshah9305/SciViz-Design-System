import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Eye, Maximize2, Info } from "lucide-react";
import { LayoutVisualization } from "./layout-visualizations";
import { getComplexityColor, iconMap } from "@/lib/layouts-data";
import { getImageSrc } from "@/lib/theme-utils";
import { formatNumber } from "@/lib/theme-utils";
import type { Layout } from "@shared/schema";

interface LayoutCardProps {
  layout: Layout;
  onPreview: (layout: Layout) => void;
  onFullscreen: (layout: Layout) => void;
  onInfo: (layout: Layout) => void;
  onUse: (layout: Layout) => void;
  viewMode?: 'grid' | 'list';
}

export function LayoutCard({ 
  layout, 
  onPreview, 
  onFullscreen, 
  onInfo, 
  onUse,
  viewMode = 'grid'
}: LayoutCardProps) {
  if (viewMode === 'list') {
    return (
      <Card className="group bg-white dark:bg-[hsl(0,0%,18%)] hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-[hsl(25,100%,50%)]">
        <div className="flex">
          {/* Preview Area */}
          <div className="relative w-64 h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            <img 
              src={getImageSrc(layout.category, layout.name)} 
              alt={`${layout.name} visualization background`} 
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <LayoutVisualization layoutName={layout.name} className="absolute inset-0" />
            
            {/* Overlay Controls */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onPreview(layout)}
                className="w-8 h-8 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-[hsl(25,100%,50%)] hover:text-white"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onFullscreen(layout)}
                className="w-8 h-8 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-[hsl(25,100%,50%)] hover:text-white"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] rounded-xl flex items-center justify-center group-hover:animate-pulse-orange">
                  <span className="text-white text-xl">{iconMap[layout.icon] || '🔬'}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{layout.name}</h3>
                  <p className="text-sm text-[hsl(25,100%,50%)] font-medium">{layout.category}</p>
                </div>
              </div>
              <Badge className={getComplexityColor(layout.complexity)}>
                {layout.complexity}
              </Badge>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {layout.description}
            </p>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Speed', value: layout.performance.speed },
                { label: 'Accessibility', value: layout.performance.accessibility },
                { label: 'Responsive', value: layout.performance.responsive }
              ].map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</div>
                  <Progress value={metric.value} className="h-1.5 mt-1" />
                </div>
              ))}
            </div>

            {/* Use Cases */}
            <div className="flex flex-wrap gap-2 mb-4">
              {layout.useCases.slice(0, 3).map((useCase) => (
                <Badge key={useCase} variant="secondary" className="text-xs">
                  {useCase}
                </Badge>
              ))}
            </div>

            {/* Download Count */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>{formatNumber(layout.downloadCount)} downloads</span>
              <span>Updated {new Date(layout.lastUpdated).toLocaleDateString()}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                onClick={() => onUse(layout)}
                className="flex-1 bg-[hsl(25,100%,50%)] text-white hover:bg-[hsl(25,100%,53%)] transition-colors duration-300"
              >
                <Download className="mr-2 h-4 w-4" />
                Use Layout
              </Button>
              <Button
                variant="outline"
                onClick={() => onInfo(layout)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group bg-white dark:bg-[hsl(0,0%,18%)] hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-[hsl(25,100%,50%)]">
      {/* Card Header */}
      <CardHeader className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] rounded-xl flex items-center justify-center group-hover:animate-pulse-orange">
              <span className="text-white text-xl">{iconMap[layout.icon] || '🔬'}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{layout.name}</h3>
              <p className="text-sm text-[hsl(25,100%,50%)] font-medium">{layout.category}</p>
            </div>
          </div>
          <Badge className={getComplexityColor(layout.complexity)}>
            {layout.complexity}
          </Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {layout.description}
        </p>
      </CardHeader>

      {/* Preview Area */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <img 
          src={getImageSrc(layout.category, layout.name)} 
          alt={`${layout.name} visualization background`} 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <LayoutVisualization layoutName={layout.name} className="absolute inset-0" />
        
        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onPreview(layout)}
            className="w-8 h-8 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-[hsl(25,100%,50%)] hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onFullscreen(layout)}
            className="w-8 h-8 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-[hsl(25,100%,50%)] hover:text-white"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Card Content */}
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
              <div className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</div>
              <Progress value={metric.value} className="h-1.5 mt-1" />
            </div>
          ))}
        </div>
        
        {/* Use Cases */}
        <div className="flex flex-wrap gap-2 mb-4">
          {layout.useCases.slice(0, 3).map((useCase) => (
            <Badge key={useCase} variant="secondary" className="text-xs">
              {useCase}
            </Badge>
          ))}
        </div>

        {/* Download Count */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{formatNumber(layout.downloadCount)} downloads</span>
          <span>Updated {new Date(layout.lastUpdated).toLocaleDateString()}</span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={() => onUse(layout)}
            className="flex-1 bg-[hsl(25,100%,50%)] text-white hover:bg-[hsl(25,100%,53%)] transition-colors duration-300 font-medium"
          >
            <Download className="mr-2 h-4 w-4" />
            Use Layout
          </Button>
          <Button
            variant="outline"
            onClick={() => onInfo(layout)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
