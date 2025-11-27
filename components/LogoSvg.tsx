export default function LogoSvg({
  className = "w-8 h-8",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="BlogSpace logo"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="bs-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#bs-grad)" />

      {/* Simple stylized B mark */}
      <path
        d="M28 18h6c5 0 9 4 9 9s-4 9-9 9h-6v-18zM28 36h6c2 0 4-2 4-4s-2-4-4-4h-6v8z"
        fill="#fff"
      />
    </svg>
  );
}
