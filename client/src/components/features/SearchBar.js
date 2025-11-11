import './SearchBar.css';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="search-container password-input-wrapper">
      <Search className="search-icon" size={20} />
      <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
      />
      {searchQuery && (
        <button
          type="button"
          className="password-toggle-btn"
          onClick={handleSearchClear}
          onMouseDown={(e) => e.preventDefault()}  // This is the key fix
          tabIndex={-1}
          title="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
