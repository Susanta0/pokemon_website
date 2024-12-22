import Navbar from "@/components/navbar"
import PokedexGrid from "@/components/pokodexContent"

import React from "react"


const page:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <PokedexGrid/>
    </>
  )
}

export default page