type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-4 rounded-xl inline-block mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
