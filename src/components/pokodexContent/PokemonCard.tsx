import React from "react";

interface PokemonCardProps {
  id: number;
  name: string;
  types: { slot: number; type: { name: string } }[]; // Correctly typed `types`
  sprites: {
    other: {
      "official-artwork": {
        front_default: string; // Correctly typed `sprites`
      };
    };
  };
}
const PokemonCard: React.FC<PokemonCardProps> = ({
  sprites,
  name,
  id,
  types,
}) => {
  return (
    <>
      <div className="transform transition-transform duration-100 hover:-translate-y-1">
        <div className="bg-[#F2F2F2]">
          <img
            src={sprites.other["official-artwork"].front_default}
            alt={name}
            className="h-[205.16px] w-[205.16px] m-auto"
          />
        </div>
        <div className="px-4">
          <span className="font-medium text-gray-600">#{id}</span>
          <p className="font-semibold text-[24px]">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
          <div className="flex items-center gap-x-1 mt-2">
            {types.map((ele, ind) => (
              <p 
              style={{
                backgroundColor: 
                ele.type.name=== "grass"?"#9BCC50":
                ele.type.name=== "poison"?"#B97FC9":
                ele.type.name=== "fire"?"#FD7D24":
                ele.type.name=== "water"?"#4592C3":
                ele.type.name=== "bug"?"#729F3F":
                ele.type.name=== "normal"?"#A4ACAF":
                ele.type.name=== "electric"?"#EED535":
                ele.type.name=== "fairy"?"#FDB9E9":
                ele.type.name=== "fighting"?"#D56723":
                ele.type.name=== "psychic"?"#F366B9":
                ele.type.name=== "flying"?"#3DC7EF":
                "#7B62A3",
                color: 
                ele.type.name=== "grass"?"black":
                ele.type.name=== "poison"?"white":
                ele.type.name=== "fire"?"white":
                ele.type.name=== "water"?"white":
                ele.type.name=== "bug"?"white":
                ele.type.name=== "normal"?"balck":
                ele.type.name=== "electric"?"black":
                ele.type.name=== "fairy"?"black":
                ele.type.name=== "fighting"?"white":
                ele.type.name=== "psychic"?"#white":
                ele.type.name=== "flying"?"black":
                "white"
              }}
              
              key={ele.slot} className="font-normal text-[12px] px-7 h-5 flex items-center text-center rounded-md">{ele.type.name.charAt(0).toUpperCase() + ele.type.name.slice(1)}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
