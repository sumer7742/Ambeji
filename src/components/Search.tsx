import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useProductSearch, type ISuggestion } from "../hooks/useSearchQuery";

const SearchProduct: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useProductSearch(queryParam);

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchParams(value ? { q: value } : {});
      setShowDropdown(!!value);
    }, 300),
    []
  );

  useEffect(() => {
    handleSearchChange(searchQuery);
    setHighlightIndex(-1);
    return () => handleSearchChange.cancel();
  }, [searchQuery, handleSearchChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchNavigation = () => {
    if (!searchQuery.trim()) return;

    const results = data?.results || [];
    if (highlightIndex >= 0 && results[highlightIndex]) {
      navigateToItem(results[highlightIndex]);
      return;
    }
    if (results.length === 1) {
      navigateToItem(results[0]);
      return;
    }
    navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const navigateToItem = (item: ISuggestion) => {
    navigate(`/product?${item.type}=${item._id}`);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const results = data?.results || [];
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchNavigation();
      return;
    }
    if (!showDropdown || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "brand":
        return "text-purple-600";
      case "category":
        return "text-blue-600";
      case "subcategory":
        return "text-cyan-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="relative w-full max-w-lg  " ref={dropdownRef}>
      {/* 🔍 Search Input */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 md:h-10 pl-9 pr-8 text-sm md:text-base rounded-md border border-gray-300 bg-white shadow-sm 
          placeholder:text-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 
          focus:border-gray-500 transition-all duration-300"
        />

        {/* Search Icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-500 transition-colors pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setShowDropdown(false);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-3.5 h-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 🔽 Dropdown Results */}
      {showDropdown && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-100 rounded-xl shadow-xl max-h-80 overflow-hidden">
          {isLoading && (
            <div className="p-3 space-y-2">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex items-center gap-2 animate-pulse">
                  <div className="w-7 h-7 bg-gray-200 rounded-md"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="p-3 text-center text-sm text-red-600 font-medium">
              Something went wrong. Try again.
            </div>
          )}

          {data?.results && data.results.length > 0 ? (
            <ul className="py-1 overflow-y-auto max-h-80">
              {data.results.map((item: ISuggestion, index: number) => (
                <li
                  key={`${item.type}-${item._id}`}
                  className={`transition-colors ${
                    index === highlightIndex ? "bg-purple-50" : "hover:bg-gray-50"
                  }`}
                >
                  <Link
                    to={
                      item.type === "slug"
                        ? `/product?slug=${item._id}`
                        : `/product?${item.type}=${item._id}`
                    }
                    className="flex items-center gap-2 px-3 py-1.5"
                    onClick={() => {
                      setShowDropdown(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <span
                        className={`text-[10px] md:text-xs font-medium capitalize ${getTypeColor(
                          item.type
                        )}`}
                      >
                        {item.type === "slug" ? "Product" : item.type}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            queryParam &&
            !isLoading && (
              <div className="p-4 text-center text-sm text-gray-500">
                No results for <strong className="text-gray-700">"{queryParam}"</strong>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
