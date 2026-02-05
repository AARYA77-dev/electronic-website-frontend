// *********************
// Role of the component: Search input element located in the header but it can be used anywhere in your application
// Name of the component: SearchInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <SearchInput />
// Input parameters: no input parameters
// Output: form with search input and button
// *********************

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  // function for modifying URL for searching products
  // After it we will grab URL on the search page and send GET request for searched products
  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?search=${searchInput}`);
    setSearchInput("");
  };

  return (
    <form
      className="flex  max-w-xl mx-auto"
      onSubmit={searchProducts}
    >
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search products..."
        className="
      flex-1
      bg-gray-50
      border
      border-gray-300
      px-4
      py-2
      rounded-l-full
      outline-none
      focus:ring-2
      focus:ring-secondary
      text-sm sm:text-base
    "
      />

      <button
        type="submit"
        className="
      bg-secondary
      text-tertiary
      px-4 sm:px-6
      py-2
      rounded-r-full
      font-semibold
      hover:bg-tertiary
      hover:text-secondary
      transition
      text-sm sm:text-base
    "
      >
        Search
      </button>

    </form>

  );
};

export default SearchInput;
