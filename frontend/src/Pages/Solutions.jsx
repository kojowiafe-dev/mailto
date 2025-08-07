import React from "react";
import { WordRotateDemo } from "../Routes/WordRotateDemo";

// Mock Card components (replace with your actual UI library imports)
const Card = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={className}>{children}</h3>
);

// Import icons from lucide-react
import { Bot, Brain, BarChart3, Code2, Zap, Shield, Users } from "lucide-react";

// Features List
const features = [
  {
    title: "Autonomous AI Agents",
    description:
      "Deploy intelligent, conversational agents that automate workflows, handle tasks, and make decisions in real-time.",
    icon: Bot,
  },
  {
    title: "Machine Learning Models",
    description:
      "Leverage predictive modeling, NLP, and deep learning to forecast trends and drive innovation.",
    icon: Brain,
  },
  {
    title: "Data Analytics",
    description:
      "Gain actionable insights through advanced analytics, dashboards, and decision intelligence.",
    icon: BarChart3,
  },
  {
    title: "Custom Web Solutions",
    description:
      "Build scalable, elegant platforms tailored to your business needs—from MVPs to enterprise-grade apps.",
    icon: Code2,
  },
];

// Memoized Feature Card
const FeatureCard = React.memo(function FeatureCard({
  title,
  description,
  icon: Icon,
}) {
  return (
    <Card className="bg-white text-black transition-all duration-300 shadow-lg rounded-2xl p-6 text-left border border-gray-800 hover:border-gray-700 hover:shadow-xl transform hover:scale-105">
      <CardHeader className="flex flex-row items-center gap-3 pb-4">
        <Icon className="w-10 h-10 text-indigo-500 flex-shrink-0" />
        <CardTitle className="text-xl font-semibold text-black">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-800 pt-2 leading-relaxed">
        {description}
      </CardContent>
    </Card>
  );
});

// WordRotate Section (Optimized)

// Additional Features Data
const additionalFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your AI solutions up and running in record time",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security for your most sensitive data",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "24/7 support from our team of AI specialists",
  },
];

// Additional Feature Item Component
const AdditionalFeatureItem = React.memo(function AdditionalFeatureItem({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="text-center group">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-800 border border-gray-800 group-hover:border-blue-600">
        <Icon className="w-8 h-8 text-blue-500 transition-colors duration-300 group-hover:text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-blue-400">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
});

// Main Solutions Component
export default function Solutions() {
  return (
    <section
      id="solutions"
      className="w-full min-h-screen flex flex-col bg-black text-white pt-44 md:pt-28 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Eventus
            </span>
            ?
          </h2>

          <div className="text-lg mx-auto text-gray-300 leading-relaxed text-center">
            We combine <WordRotateDemo />
            to deliver breakthrough outcomes across industries.
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        {/* Additional Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-4">
          {additionalFeatures.map((item) => (
            <AdditionalFeatureItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
