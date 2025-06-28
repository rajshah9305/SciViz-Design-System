import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Maximize2, X, CheckCircle } from "lucide-react";
import { LayoutVisualization } from "./layout-visualizations";
import { getComplexityColor, iconMap } from "@/lib/layouts-data";
import { formatDate, formatNumber } from "@/lib/theme-utils";
import type { Layout } from "@shared/schema";

interface LayoutModalProps {
  layout: Layout | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (layout: Layout) => void;
  onFullscreen: (layout: Layout) => void;
}

export function LayoutModal({ layout, isOpen, onClose, onDownload, onFullscreen }: LayoutModalProps) {
  if (!layout) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-[hsl(0,0%,18%)] border border-gray-200 dark:border-gray-700">
        <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(25,100%,50%)] to-[hsl(25,100%,53%)] rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">{iconMap[layout.icon] || '🔬'}</span>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {layout.name}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[hsl(25,100%,50%)] font-medium">{layout.category}</p>
                  <Badge className={getComplexityColor(layout.complexity)}>
                    {layout.complexity}
                  </Badge>
                </div>
              </div>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          <div className="relative h-80 rounded-xl overflow-hidden">
            <LayoutVisualization layoutName={layout.name} />
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {layout.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
            <div className="grid grid-cols-2 gap-3">
              {layout.features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[hsl(25,100%,50%)]" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ideal Use Cases</h4>
            <div className="flex flex-wrap gap-2">
              {layout.useCases.map((useCase) => (
                <Badge 
                  key={useCase} 
                  variant="secondary" 
                  className="bg-[hsl(25,100%,50%)]/10 text-[hsl(25,100%,50%)] border-[hsl(25,100%,50%)]/20"
                >
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Performance Metrics</h4>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Speed Score', value: layout.performance.speed },
                { label: 'Accessibility Score', value: layout.performance.accessibility },
                { label: 'Responsive Score', value: layout.performance.responsive }
              ].map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {metric.value}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-[hsl(25,100%,50%)] h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Specifications</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Framework:</span>
                  <span className="text-gray-900 dark:text-white ml-2">React + TypeScript</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Styling:</span>
                  <span className="text-gray-900 dark:text-white ml-2">Tailwind CSS</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Downloads:</span>
                  <span className="text-gray-900 dark:text-white ml-2">{formatNumber(layout.downloadCount)}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                  <span className="text-gray-900 dark:text-white ml-2">{formatDate(layout.lastUpdated)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              onClick={() => onDownload(layout)}
              className="flex-1 bg-[hsl(25,100%,50%)] text-white hover:bg-[hsl(25,100%,53%)] transition-colors duration-300 font-medium"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Layout
            </Button>
            <Button 
              onClick={() => onFullscreen(layout)}
              variant="outline"
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 font-medium"
            >
              <Maximize2 className="mr-2 h-4 w-4" />
              Full Preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
