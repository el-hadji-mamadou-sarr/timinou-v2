import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  return (
    <>
      <nav className="flex items-center justify-start space-x-2.5 px-2.5 py-2">
        {/* logo */}
        <div className="">
          <Image src="/logo.svg" alt="timinou-logo" width={155} height={33} />
        </div>
        {/* add new project */}
        <div className="hover:cursor-pointer">
          <PlusCircle width={38} height={38} color="#E5C07B" />
        </div>
      </nav>
    </>
  );
}
