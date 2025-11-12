import Image from "next/image";
import Link from "next/link";

export default function LogoName() {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <div className="flex justify-center items-center gap-2">
        <Image
          width={10}
          height={10}
          alt="Some logo"
          src="/assets/images/Logo.png"
          className="h-8 w-auto"
        />
        <span className="text-white text-center">Blog Application</span>
      </div>
    </Link>
  );
}
