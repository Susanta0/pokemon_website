"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PokemonCardProps {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  abilities: {
    solt: number;
    ability: {
      name: string;
    };
  }[];
}

const Home: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=200`
      );
      const pokemonResults = res.data.results;

      const pokemonDetails = await Promise.all(
        pokemonResults.map(async (pokemon: { name: string; url: string }) => {
          const { data } = await axios.get(pokemon.url);
          return data;
        })
      );

      setPokemon(pokemonDetails);
      setIsLoading(false);
      console.log(pokemonDetails);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1 < pokemon.length - 2 ? prevIndex + 1 : 0) // Prevent out-of-bound errors
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : pokemon.length - 3) // Ensure the first card is the first in the array
    );
  };

  return (
    <>
      {isError && (
        <p className="text-red-500 text-center">
          Failed to load Pokémon data. Please try again later.
        </p>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <img
            className="rounded-full object-cover animate-spin h-16 w-16"
            src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png"
            alt="loading"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center relative w-full bg-gray-100 mt-4">
            {/* Carousel Container */}
            <div className="relative flex overflow-hidden w-[90%] max-w-6xl h-[300px] mx-auto">
              <div
                className="flex transition-transform duration-500 space-x-1"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / 3}%)`, // Ensure cards scroll in sets of 3
                  width: `${(pokemon.length / 3) * 100}%`,
                }}
              >
                {pokemon.map((card, index) => {
                  return (
                    <div
                      key={card.id}
                      className="w-[18em] flex-shrink-0 flex flex-col items-center justify-center bg-[#616161] text-white rounded-lg"
                    >
                      <img
                        src={
                          card.sprites.other["official-artwork"].front_default
                        }
                        alt={card.name}
                        className="h-40 w-40 mb-4 object-contain transition-transform duration-500"
                      />
                      <div className="bg-[#232323] h-full w-full text-white px-4 py-4">
                        <div className="font-medium text-[25px] flex items-center justify-between">
                          <p>
                            {card.name.charAt(0).toUpperCase() +
                              card.name.slice(1)}
                          </p>
                          <p>{card.id}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <p>Type</p>
                          <div className="flex items-center gap-x-1 mt-2">
                            {card.types.map((ele, ind) => (
                              <p
                                style={{
                                  backgroundColor:
                                    ele.type.name === "grass"
                                      ? "#9BCC50"
                                      : ele.type.name === "poison"
                                      ? "#B97FC9"
                                      : ele.type.name === "fire"
                                      ? "#FD7D24"
                                      : ele.type.name === "water"
                                      ? "#4592C3"
                                      : ele.type.name === "bug"
                                      ? "#729F3F"
                                      : ele.type.name === "normal"
                                      ? "#A4ACAF"
                                      : ele.type.name === "electric"
                                      ? "#EED535"
                                      : ele.type.name === "fairy"
                                      ? "#FDB9E9"
                                      : ele.type.name === "fighting"
                                      ? "#D56723"
                                      : ele.type.name === "psychic"
                                      ? "#F366B9"
                                      : ele.type.name === "flying"
                                      ? "#3DC7EF"
                                      : "#7B62A3",
                                  color:
                                    ele.type.name === "grass"
                                      ? "black"
                                      : ele.type.name === "poison"
                                      ? "white"
                                      : ele.type.name === "fire"
                                      ? "white"
                                      : ele.type.name === "water"
                                      ? "white"
                                      : ele.type.name === "bug"
                                      ? "white"
                                      : ele.type.name === "normal"
                                      ? "balck"
                                      : ele.type.name === "electric"
                                      ? "black"
                                      : ele.type.name === "fairy"
                                      ? "black"
                                      : ele.type.name === "fighting"
                                      ? "white"
                                      : ele.type.name === "psychic"
                                      ? "#white"
                                      : ele.type.name === "flying"
                                      ? "black"
                                      : "white",
                                }}
                                key={ele.slot}
                                className="font-normal text-[12px] px-7 h-5 flex items-center text-center rounded-md"
                              >
                                {ele.type.name.charAt(0).toUpperCase() +
                                  ele.type.name.slice(1)}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mt-4">
                          <p className="text-gray-500 font-semibold">
                            Abilities
                          </p>
                          {card.abilities.map((ele, ind) => (
                            <div key={ind}>
                              <p className="text-sm">{ele.ability.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-16 h-20 bg-black text-white rounded-bl-3xl"
            >
              <FiChevronLeft className="h-16 w-16" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-16 h-20 bg-black text-white rounded-br-3xl"
            >
              <FiChevronRight className="h-16 w-16" />
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/pokedex">
              <button className="text-white font-semibold text-[15px] bg-gray-700 py-2 px-2 text-center">
                Explore More Pokemon
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
