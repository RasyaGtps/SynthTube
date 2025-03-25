import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function SearchBar({ query, onChange, onSubmit, loading }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for videos..."
          className="input-search w-full py-3 px-4 pr-12 rounded-full"
        />
        <button 
          type="submit" 
          className="absolute right-2 p-2 rounded-full bg-[var(--primary)] text-white hover:neon-glow"
          disabled={loading}
        >
          <FaSearch size={20} />
        </button>
      </div>
    </form>
  );
}