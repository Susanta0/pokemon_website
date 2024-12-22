"use client";
import Link from "next/link";
import home from "../../../public/home.png";
import pokedex from "../../../public/pokedex.png";
import video_games from "../../../public/video_game.png";
import card from "../../../public/card.png";
import animation from "../../../public/animation.png";
import events from "../../../public/events.png";
import news from "../../../public/news.png";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const navData = [
    { id: 1, name: "Home", image: home, link: "/", bgColor: "#919191" },
    { id: 2, name: "Pokedex", image: pokedex, link: "/pokedex", bgColor: "#E3350D" },
    { id: 3, name: "Video Games & Apps", image: video_games, link: "/", bgColor: "#EE6B2F" },
    { id: 4, name: "Trading Card Game", image: card, link: "/", bgColor: "#E6BC2F" },
    { id: 5, name: "Animation", image: animation, link: "/", bgColor: "#4DAD5B" },
    { id: 6, name: "Play! Pokemon Events", image: events, link: "/", bgColor: "#30A7D7" },
    { id: 7, name: "News", image: news, link: "/", bgColor: "#1B53BA" },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Use null to indicate no active item initially

  const handleClick = (index: number) => {
    setActiveIndex(index); // Set active index to the clicked item
  };

  return (
    <nav className="mt-10">
      <ul className="flex items-center justify-center">
        {navData.map((navItems, index) => (
          <li
            key={navItems.id}
            className="w-[137px] h-[85px] flex justify-center items-center transition-all duration-300"
            style={{
              borderBottom: `4px solid ${navItems.bgColor}`,
              backgroundColor:
                activeIndex === index ? navItems.bgColor : "white", // Show background color when clicked
            }}
            onClick={() => handleClick(index)} // Set active item on click
          >
            <Link
              href={navItems.link}
              className="flex flex-col items-center p-2"
            >
              <Image
                src={navItems.image}
                alt={navItems.name}
                className="h-[26px] w-[28px]"
              />
              <span className="text-center text-[15px]">{navItems.name}</span>
            </Link>
            <style jsx>{`
              li:hover {
                background-color: ${navItems.bgColor};
              }
            `}</style>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
