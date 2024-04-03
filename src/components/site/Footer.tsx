import Image from "next/image";

import TextInput from "@/components/app/InputText";

export default function Footer() {
  return (
    <footer className="md:flex gap-20 py-20">
      <div>
        <h2 className="text-2xl">Where are we</h2>
        <ul className="mt-5">
          <li>Luis Escala</li>
          <li>Piedras 623</li>
          <li>Piso 2, depto 4</li>
          <li>C1070AAM, Capital Federal</li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl">Connect with Us</h2>
        <div className="flex gap-1 mt-5">
          <Image
            src="Facebook.svg"
            alt="Facebook logo"
            width={42}
            height={42}
          ></Image>
          <Image
            src="Instagram.svg"
            alt="Instagram logo"
            width={42}
            height={42}
          ></Image>
          <Image
            src="TikTok.svg"
            alt="TikTok logo"
            width={42}
            height={42}
          ></Image>
        </div>
      </div>
      <div>
        <h2 className="text-2xl">Subscribe</h2>
        <form className="mt-5">
          <TextInput required={true}></TextInput>
        </form>
      </div>
    </footer>
  );
}
