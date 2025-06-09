import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const DropdownMenu = ({
  categories,
  isDarkMode,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  isDarkMode: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add when the dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const inputClasses = `w-full  py-1.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      : "border-gray-300 placeholder-gray-400"
  }`;
  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium ${
          isDarkMode
            ? "bg-gray-700 text-white hover:bg-gray-500"
            : "bg-white text-black hover:bg-gray-100"
        } ${inputClasses}`}
      >
        {selectedCategory}
        <ChevronDown className="ml-2 h-5 w-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          } ring-1 ring-black ring-opacity-5`}
        >
          <div className="py-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-200 ${
                  isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
