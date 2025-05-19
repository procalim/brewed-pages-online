
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronDown } from 'lucide-react';

// Dummy data for books
const BOOKS = [
  {
    id: 1,
    title: "The Secret Library",
    author: "Oliver Tearle",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 24.99,
    slug: "the-secret-library",
    category: "literary-essays",
    tags: ["new-arrival", "staff-pick"]
  },
  {
    id: 2,
    title: "Culinary Mysteries",
    author: "Amanda Lee",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 19.99,
    slug: "culinary-mysteries",
    category: "culinary-journeys",
    tags: ["new-arrival"]
  },
  {
    id: 3,
    title: "Essays on Taste",
    author: "Malcolm Richards",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 22.99,
    slug: "essays-on-taste",
    category: "culinary-journeys",
    tags: ["limited-edition"]
  },
  {
    id: 4,
    title: "Brewed Thoughts",
    author: "Eleanor Hart",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 18.99,
    slug: "brewed-thoughts",
    category: "literary-essays",
    tags: ["staff-pick"]
  },
  {
    id: 5,
    title: "The Art of Fermentation",
    author: "Sandor Katz",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 28.99,
    slug: "the-art-of-fermentation",
    category: "culinary-journeys",
    tags: ["new-arrival", "limited-edition"]
  },
  {
    id: 6,
    title: "Literary Palates",
    author: "Jane Morgan",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 21.99,
    slug: "literary-palates",
    category: "literary-essays",
    tags: ["staff-pick"]
  },
  {
    id: 7,
    title: "The Edible Word",
    author: "Thomas Hill",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 19.99,
    slug: "the-edible-word",
    category: "culinary-journeys",
    tags: ["limited-edition"]
  },
  {
    id: 8,
    title: "Whispers & Wine",
    author: "Clarissa Stone",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 23.99,
    slug: "whispers-and-wine",
    category: "literary-essays",
    tags: ["new-arrival"]
  }
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "literary-essays", label: "Literary Essays" },
  { value: "culinary-journeys", label: "Culinary Journeys" },
  { value: "limited-editions", label: "Limited Editions" }
];

const COLLECTIONS = [
  { value: "all", label: "All Collections" },
  { value: "new-arrival", label: "New Arrivals" },
  { value: "staff-pick", label: "Staff Picks" },
  { value: "limited-edition", label: "Limited Editions" }
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get filter values from URL params
  const categoryFilter = searchParams.get("category") || "all";
  const collectionFilter = searchParams.get("collection") || "all";
  
  // Filter books based on filters and search query
  const filteredBooks = BOOKS.filter(book => {
    // Filter by category
    if (categoryFilter !== "all" && book.category !== categoryFilter) {
      return false;
    }
    
    // Filter by collection (tag)
    if (collectionFilter !== "all" && !book.tags.includes(collectionFilter)) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !book.author.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Update filters
  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };
  
  // Handle search form
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search results are updated directly via the filteredBooks
  };
  
  return (
    <div className="container px-4 md:px-6 py-12 mx-auto">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Page Header */}
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">Shop Our Collection</h1>
          <p className="text-codex-charcoal/80">
            Explore our curated selection of literary treasures.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 space-y-8">
            <div>
              <h2 className="font-serif text-lg font-medium mb-3">Categories</h2>
              <ul className="space-y-2">
                {CATEGORIES.map((category) => (
                  <li key={category.value}>
                    <button
                      onClick={() => updateFilter("category", category.value)}
                      className={`text-sm w-full text-left py-1 ${
                        categoryFilter === category.value
                          ? "text-codex-amber font-medium"
                          : "text-codex-charcoal/80 hover:text-codex-amber"
                      }`}
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="font-serif text-lg font-medium mb-3">Collections</h2>
              <ul className="space-y-2">
                {COLLECTIONS.map((collection) => (
                  <li key={collection.value}>
                    <button
                      onClick={() => updateFilter("collection", collection.value)}
                      className={`text-sm w-full text-left py-1 ${
                        collectionFilter === collection.value
                          ? "text-codex-amber font-medium"
                          : "text-codex-charcoal/80 hover:text-codex-amber"
                      }`}
                    >
                      {collection.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Mobile Filters Button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 w-full mb-4"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${isMobileFilterOpen ? "rotate-180" : ""}`} />
            </Button>
            
            {/* Mobile Filters Dropdown */}
            {isMobileFilterOpen && (
              <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
                <div className="mb-4">
                  <h2 className="font-serif text-lg font-medium mb-3">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <Button
                        key={category.value}
                        variant={categoryFilter === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateFilter("category", category.value)}
                        className={
                          categoryFilter === category.value
                            ? "bg-codex-amber hover:bg-codex-amber text-codex-dark-brown"
                            : ""
                        }
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="font-serif text-lg font-medium mb-3">Collections</h2>
                  <div className="flex flex-wrap gap-2">
                    {COLLECTIONS.map((collection) => (
                      <Button
                        key={collection.value}
                        variant={collectionFilter === collection.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateFilter("collection", collection.value)}
                        className={
                          collectionFilter === collection.value
                            ? "bg-codex-amber hover:bg-codex-amber text-codex-dark-brown"
                            : ""
                        }
                      >
                        {collection.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-codex-amber"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>
            
            {/* Results Count and Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-codex-charcoal/80">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'result' : 'results'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm hidden sm:inline">Sort by:</span>
                <select className="text-sm py-1 px-2 border border-gray-300 rounded-md bg-white">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
            
            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredBooks.map((book) => (
                  <Link key={book.id} to={`/shop/${book.slug}`}>
                    <Card className="hover-lift overflow-hidden border-none">
                      <div className="h-56 overflow-hidden">
                        <img 
                          src={book.image} 
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-serif font-medium text-lg">{book.title}</h3>
                        <p className="text-sm text-codex-charcoal/80 mb-2">{book.author}</p>
                        <p className="font-medium text-codex-amber">${book.price.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-codex-charcoal/80">No books found matching your filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                    setSearchQuery("");
                  }} 
                  className="text-codex-amber"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
