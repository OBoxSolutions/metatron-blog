import Image from "next/image";

import TextInput from "@/components/InputText";

const CONTACTS = [
  "Luis Escala",
  "Piedras 623",
  "Piso 2, depto 4",
  "C1070AAM, Capital Federal",
];

const SOCIAL_ICONS = [
  { src: "/Facebook.svg", alt: "Facebook Logo" },
  { src: "/Instagram.svg", alt: "Instagram Logo" },
  { src: "/TikTok.svg", alt: "TikTok Logo" },
];

export default function Footer() {
  return (
    <footer className="bg-primary pt-10 px-4">
      <div className="md:flex max-w-screen-xl mx-auto gap-20">
        <div className="flex-1">
          <Image
            className="m-auto hover:opacity-75 cursor-pointer"
            src={"/simple_logo.svg"}
            width={200}
            height={200}
            alt="Logo"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl  my-3">Where are we</h2>
          {CONTACTS.map((contact, i) => (
            <p className="sm:block mr-2 inline-flex" key={i}>
              {contact}
            </p>
          ))}
        </div>
        <div className="flex-1 mt-4  md:text-left">
          <h2 className="text-2xl">Connect with Us</h2>
          <ul className="flex items-center  md:justify-start gap-2 mt-2">
            {SOCIAL_ICONS.map((icon, index) => (
              <li className="flex " key={`social-icon-${index}`}>
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={42}
                  height={42}
                ></Image>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl mt-2">Subscribe</h2>
          <form className="mt-3">
            <TextInput required={true}></TextInput>
          </form>
        </div>
      </div>
      <div className="text-center pt-10 pb-5 text-base">
        All Rights Reserved 2024
      </div>
    </footer>
  );
}
