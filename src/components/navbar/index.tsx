"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  // navbar data
  const navData = [
    { id: 1, name: "Home", image: "/home.png", link: "/", bgColor: "#919191" },
    { id: 2, name: "Pokedex", image: "pokedex.png", link: "/pokedex", bgColor: "#E3350D" },
    { id: 3, name: "Video Games & Apps", image: "/video_game.png", link: "/", bgColor: "#EE6B2F" },
    { id: 4, name: "Trading Card Game", image: "/card.png", link: "/", bgColor: "#E6BC2F" },
    { id: 5, name: "Animation", image: "/animation.png", link: "/", bgColor: "#4DAD5B" },
    { id: 6, name: "Play! Pokemon Events", image: "/events.png", link: "/", bgColor: "#30A7D7" },
    { id: 7, name: "News", image: "/news.png", link: "/", bgColor: "#1B53BA" },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setIsMenuOpen(false); // Close menu after clicking
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="mt-10">
      {/* Hamburger Menu Button */}
      <div className="sm:hidden flex justify-end p-4">
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Navbar Items */}
      <ul
        className={`sm:flex sm:items-center sm:justify-center sm:gap-6 ${
          isMenuOpen ? "block" : "hidden"
        } sm:block`}
      >
        {navData.map((navItems, index) => (
          <li
            key={navItems.id}
            className="w-full sm:w-[137px] h-[85px] flex justify-center items-center transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
            style={{
              borderBottom: `4px solid ${navItems.bgColor}`,
              backgroundColor:
                activeIndex === index ? navItems.bgColor : "white",
            }}
            onClick={() => handleClick(index)}
          >
            <Link href={navItems.link} className="flex flex-col items-center p-2">
              <img
                src={navItems.image}
                alt={navItems.name}
                className="h-[24px] w-[24px] sm:h-[26px] sm:w-[28px]"
              />
              <span className="text-center text-sm sm:text-[15px]">
                {navItems.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
