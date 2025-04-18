"use client";

import Image from "next/image";
//import { LuLogIn } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="bg-white flex justify-evenly items-center">
      <div>
        <Image
          src={"/images/logoHeader.png"}
          width={150}
          height={100}
          className="w-[150] h-[100]"
          alt="logo do Resume-Generator"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>

      {/*ideia para implementação de login}
      /* <ul>
        <li className="flex items-center gap-2 hover:text-slate-500 cursor-pointer">
          <LuLogIn />
          Login
        </li>
      </ul> */}
    </header>
  );
}
