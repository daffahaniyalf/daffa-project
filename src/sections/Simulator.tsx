import { useEffect, useRef, useState, useCallback } from 'react';
import { simulatorConfig } from '../config';
import { Calculator, Zap, Home, Leaf, TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SimulationResult {
  energy: number;
  homes: number;
  co2Reduction: number;
}

export function Simulator() {
  const [isVisible, setIsVisible] = useState(false);
  const [wasteType, setWasteType] = useState(simulatorConfig.wasteTypes[2].value);
  const [weight, setWeight] = useState(100);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const calculateEnergy = useCallback(() => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const selectedType = simulatorConfig.wasteTypes.find(t => t.value === wasteType);
      const efficiency = selectedType?.efficiency || 0.45;
      
      // Calculate results
      const energy = Math.round(weight * efficiency * 10) / 10; // kWh
      const homes = Math.round(energy / 30); // Assuming 30 kWh per home per day
      const co2Reduction = Math.round(weight * 0.7 * 10) / 10; // kg CO2
      
      setResult({ energy, homes, co2Reduction });
      setIsCalculating(false);
    }, 500);
  }, [wasteType, weight]);

  // Auto-calculate on initial load
  useEffect(() => {
    if (isVisible && !result) {
      calculateEnergy();
    }
  }, [isVisible, calculateEnergy, result]);

  // Chart data
  const barChartData = {
    labels: ['Energi (kWh)', 'Rumah Terlayani', 'Pengurangan CO₂ (kg)'],
    datasets: [
      {
        label: 'Hasil Simulasi',
        data: result ? [result.energy, result.homes, result.co2Reduction] : [0, 0, 0],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const doughnutChartData = {
    labels: simulatorConfig.wasteTypes.map(t => t.label),
    datasets: [
      {
        data: simulatorConfig.wasteTypes.map(t => t.efficiency * 100),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, family: 'Poppins' },
        bodyFont: { size: 13, family: 'Inter' },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 16,
          font: { size: 12, family: 'Inter' },
        },
      },
    },
  };

  return (
    <section
      id="simulator"
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="container-custom">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-green-400 font-medium tracking-wider uppercase text-sm mb-2">
            {simulatorConfig.scriptText}
          </p>
          <p className="text-blue-400 font-medium tracking-wider uppercase text-sm mb-4">
            {simulatorConfig.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {simulatorConfig.mainTitle}
          </h2>
          <p className="text-gray-400 text-lg">
            {simulatorConfig.introText}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div
            className={`bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Input Data</h3>
            </div>

            {/* Waste Type Selection */}
            <div className="mb-8">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                {simulatorConfig.labels.wasteType}
              </label>
              <div className="grid grid-cols-1 gap-3">
                {simulatorConfig.wasteTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setWasteType(type.value)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                      wasteType === type.value
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <span className={`font-medium ${wasteType === type.value ? 'text-green-400' : 'text-gray-300'}`}>
                      {type.label}
                    </span>
                    <span className="text-sm text-gray-500">{type.efficiency * 100}% efisiensi</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Slider */}
            <div className="mb-8">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                {simulatorConfig.labels.weight}
              </label>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-display font-bold text-white">{weight}</span>
                  <span className="text-gray-400">kg</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>10 kg</span>
                  <span>1000 kg</span>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateEnergy}
              disabled={isCalculating}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menghitung...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  {simulatorConfig.labels.calculateButton}
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Result Cards */}
            {result && (
              <div className="grid grid-cols-1 gap-4">
                {/* Energy Output */}
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center">
                      <Zap className="w-7 h-7 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{simulatorConfig.labels.energyOutput}</p>
                      <p className="font-display text-3xl font-bold text-white">{result.energy} <span className="text-lg text-green-400">kWh</span></p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((result.energy / 600) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Homes Powered */}
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center">
                      <Home className="w-7 h-7 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{simulatorConfig.labels.homesPowered}</p>
                      <p className="font-display text-3xl font-bold text-white">{result.homes} <span className="text-lg text-blue-400">rumah</span></p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((result.homes / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* CO2 Reduction */}
                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-500/30 rounded-xl flex items-center justify-center">
                      <Leaf className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{simulatorConfig.labels.co2Reduction}</p>
                      <p className="font-display text-3xl font-bold text-white">{result.co2Reduction} <span className="text-lg text-emerald-400">kg</span></p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((result.co2Reduction / 700) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
                <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Perbandingan Hasil
                </p>
                <div className="h-40">
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
                <p className="text-gray-400 text-sm mb-4">Efisiensi per Jenis</p>
                <div className="h-40">
                  <Doughnut data={doughnutChartData} options={doughnutOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
