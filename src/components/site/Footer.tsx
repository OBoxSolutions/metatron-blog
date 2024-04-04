import Image from "next/image";

import TextInput from "@/components/app/InputText";

const CONTACTS = [
  "Luis Escala",
  "Piedras 623",
  "Piso 2, depto 4",
  "C1070AAM, Capital Federal",
];

const SOCIAL_ICONS = [
  { src: "Facebook.svg", alt: "Facebook Logo" },
  { src: "Instagram.svg", alt: "Instagram Logo" },
  { src: "TikTok.svg", alt: "TikTok Logo" },
];

export default function Footer() {
  return (
    <footer>
      <div className="md:flex gap-20 py-20">
        <div>
          <h2 className="text-2xl">Where are we</h2>
          <ul className="mt-5">
            {CONTACTS.map((contact, index) => (
              <li key={`contact-${index}`}>{contact}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl">Connect with Us</h2>
          <div className="flex gap-1 mt-5">
            {SOCIAL_ICONS.map((icon, index) => (
              <Image
                key={`social-icon-${index}`}
                src={icon.src}
                alt={icon.alt}
                width={42}
                height={42}
              ></Image>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl">Subscribe</h2>
          <form className="mt-5">
            <TextInput required={true}></TextInput>
          </form>
        </div>
      </div>
      <div className="text-center">All Rights Reserved 2024</div>
    </footer>
  );
}
