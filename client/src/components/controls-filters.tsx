import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Grid3X3, List, Monitor, Tablet, Smartphone } from "lucide-react";
import { categories, sortOptions, deviceViewports, viewModes } from "@/lib/layouts-data";

interface ControlsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  selectedDevice: string;
  onDeviceChange: (device: string) => void;
}

export function ControlsFilters({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  selectedDevice,
  onDeviceChange
}: ControlsFiltersProps) {
  const getDeviceIcon = (deviceId: string) => {
    switch (deviceId) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
      default: return Monitor;
    }
  };

  return (
    <section className="bg-white dark:bg-[hsl(0,0%,18%)] border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search layouts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[hsl(25,100%,50%)] focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className={
                  activeCategory === category
                    ? "bg-[hsl(25,100%,50%)] text-white border-[hsl(25,100%,50%)] hover:bg-[hsl(25,100%,53%)]"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[hsl(25,100%,50%)] hover:text-white border-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-48 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[hsl(25,100%,50%)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              {viewModes.map((mode) => {
                const Icon = mode.id === 'grid' ? Grid3X3 : List;
                return (
                  <Button
                    key={mode.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewModeChange(mode.id)}
                    className={
                      viewMode === mode.id
                        ? "bg-[hsl(25,100%,50%)] text-white hover:bg-[hsl(25,100%,53%)]"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>

            {/* Device Preview Toggle */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              {deviceViewports.map((device) => {
                const Icon = getDeviceIcon(device.id);
                return (
                  <Button
                    key={device.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeviceChange(device.id)}
                    className={
                      selectedDevice === device.id
                        ? "bg-[hsl(25,100%,50%)] text-white hover:bg-[hsl(25,100%,53%)]"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
