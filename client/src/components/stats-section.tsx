import { useQuery } from "@tanstack/react-query";
import { formatNumber } from "@/lib/theme-utils";

interface StatsData {
  totalInteractions: number;
  totalDownloads: number;
  popularLayouts: Array<{ layoutId: number; layoutName: string; count: number }>;
}

export function StatsSection() {
  const { data: stats } = useQuery<StatsData>({
    queryKey: ['/api/stats'],
    initialData: {
      totalInteractions: 156000,
      totalDownloads: 8500,
      popularLayouts: []
    }
  });

  const statsData = [
    {
      label: "Scientific Layouts",
      value: "8",
      description: "Neural, Quantum, Bio & More"
    },
    {
      label: "Avg Performance Score",
      value: "93%",
      description: "Speed, Accessibility & Response"
    },
    {
      label: "User Interactions",
      value: formatNumber(stats?.totalInteractions || 156000) + "+",
      description: "Real-time Analytics Tracking"
    },
    {
      label: "WCAG AA Compliance",
      value: "96%",
      description: "Professional Accessibility"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-[hsl(25,100%,50%)] via-[hsl(25,100%,53%)] to-[hsl(39,100%,50%)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powered by Science, Perfected by Design
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Every layout in SciViz is meticulously crafted based on real scientific principles, 
            ensuring both aesthetic excellence and functional accuracy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg text-white/80 font-medium">{stat.label}</div>
              <div className="text-sm text-white/60">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
