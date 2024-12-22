"use client";
import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import PokemonCard from "./PokemonCard";
import axios from "axios";

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
}

const PokedexGrid: React.FC = () => {
  // store pokemon data
  const [PokedexData, setPokedexData] = useState<PokemonCardProps[]>([]);
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // error state
  const [isError, setIsError] = useState(false);
  // search state
  const [searchData, setSearchData] = useState<string>("");
  // sort state
  const [sortValue, setSortValue] = useState<string>("");
  // Pagination states
  const ITEMS_PER_PAGE = 12;
  const [offset, setOffset] = useState(0); // Tracks the current offset for API calls

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${ITEMS_PER_PAGE}&offset=${offset}`
      );
      const pokemonResults = res.data.results;

      const pokemonDetails = await Promise.all(
        pokemonResults.map(async (pokemon: { name: string; url: string }) => {
          const { data } = await axios.get(pokemon.url);
          return data;
        })
      );

      setPokedexData((prev) => [...prev, ...pokemonDetails]);
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
  }, [offset]);

  // Filter the data based on the search query
  const filteredPokedexData = PokedexData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchData.toLowerCase())
  );

  // Sort the filtered data based on the selected sort option
  const sortedPokedexData = filteredPokedexData.sort((a, b) => {
    switch (sortValue) {
      case "lowest-number":
        return a.id - b.id;
      case "highest-number":
        return b.id - a.id;
      case "a-z":
        return a.name.localeCompare(b.name);
      case "z-a":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handleLoadMore = () => {
    setOffset((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <div className="w-[90%] m-auto">
        <div className="w-[70%] m-auto bg-white">
          <p className="text-4xl py-4">Pokedex</p>
        </div>
        <div className="bg-[#313131] border py-6">
          <div className=" flex w-[70%] m-auto text-white">
            <div className="space-y-2">
              <p className="text-[26.8px]">Name or Number</p>
              <div className="flex items-center h-12 gap-6">
                <input
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  placeholder="Name or Number"
                  type="text"
                  className="border-2 border-gray-600 w-80 h-full rounded-md text-gray-600"
                />
                <button className="h-full w-14 flex justify-center items-center bg-[#EE6B2F] rounded-md">
                  <FaSearch className="h-6 w-6" />
                </button>
              </div>
              <p className="text-[16px] font-medium">
                Use the Advanced Search to explore Pokémon by type, weakness,
                Ability, and more!
              </p>
            </div>

            <div className="bg-[#4DAD5B] h-fit rounded-md">
              <p className="mx-[10px] my-[20px] text-[20px]">
                Search for a Pokémon by name or using its National Pokédex
                number.
              </p>
            </div>
          </div>
        </div>

        <div className="w-[70%] border h-20 m-auto bg-white px-4 flex items-center justify-between">
          <button className="text-white bg-[#30A7D7] flex items-center justify-center h-12 w-[300px] rounded-md">
            <BiRefresh className="text-[2em]" />
            <span className="font-semibold">Surprise Me!</span>
          </button>
          <div className="flex items-center gap-4 h-10">
            <span className="font-semibold text-xl text-gray-500">Sort By</span>
            <select
              name="sortValue"
              onChange={(e) => setSortValue(e.target.value)}
              className="h-full w-[300px] bg-black text-white font-medium"
            >
              <option value="lowest-number">Lowest Number (First)</option>
              <option value="highest-number">Highest Number (First)</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
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
          <div className="w-[70%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto bg-white px-4 pt-10">
            {sortedPokedexData.map((items, id) => (
              <PokemonCard key={id} {...items} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-[#30A7D7] text-white rounded-md"
          >
            Load More Pokeman
          </button>
        </div>
      </div>
    </>
  );
};

export default PokedexGrid;
