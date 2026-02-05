// *********************
// Role of the component: Simple H2 heading component
// Name of the component: Heading.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Heading title={title} />
// Input parameters: { title: string }
// Output: h2 heading title with some styles 
// *********************

import React from 'react'

const Heading = ({ title } : { title: string }) => {
  return (
    <h2 className="text-white 
      text-3xl 
      sm:text-4xl 
      md:text-5xl 
      lg:text-6xl 
      xl:text-7xl 
      font-extrabold 
      text-center 
      mt-12 md:mt-20">{ title }</h2>
  )
}

export default Heading