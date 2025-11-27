import Image from "next/image";
import Link from "next/link";

export default function LogoName({ color }: { color?: string }) {
  const accent =
    "bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600";
  const baseText = color ? color : "text-white";

  return (
    <Link href="/" aria-label="Home" className="-m-1.5 p-1.5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#002455] dark:bg-[#002455]/60 shadow-sm overflow-hidden">
          <Image
            src="/assets/images/Logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-8 h-8 object-contain"
            priority={true}
          />
        </div>

        <div className="leading-tight">
          <div className="flex items-baseline gap-1">
            <span
              className={`${accent} font-extrabold tracking-tight text-lg md:text-2xl select-none`}
            >
              Blog
            </span>
            <span
              className={`font-semibold tracking-tight text-lg md:text-2xl select-none ${baseText}`}
            >
              Space
            </span>
          </div>
          <span
            className={`block text-xs text-black/70 dark:text-gray-300/70 ${baseText} -mt-0.5`}
          >
            Share your stories
          </span>
        </div>
      </div>
    </Link>
  );
}
