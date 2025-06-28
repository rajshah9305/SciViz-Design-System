import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Book } from "lucide-react";

interface HeroSectionProps {
  onExploreLayouts: () => void;
  onViewDocs: () => void;
}

export function HeroSection({ onExploreLayouts, onViewDocs }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-[hsl(25,100%,50%)] via-[hsl(25,100%,53%)] to-[hsl(39,100%,50%)] py-20 overflow-hidden">
      {/* Professional scientific equipment background */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Modern laboratory with scientific equipment" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Scientific Interfaces
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            A cutting-edge design system that merges scientific accuracy with stunning visual aesthetics. 
            Explore 8 sophisticated layouts inspired by real scientific concepts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onExploreLayouts}
              size="lg"
              className="px-8 py-4 bg-white text-[hsl(25,100%,50%)] font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Explore Layouts
            </Button>
            <Button 
              onClick={onViewDocs}
              variant="outline"
              size="lg"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-[hsl(25,100%,50%)] transition-all duration-300"
            >
              <Book className="mr-2 h-5 w-5" />
              Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full animate-float [animation-delay:1s]"></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/10 rounded-full animate-float [animation-delay:2s]"></div>
    </section>
  );
}
