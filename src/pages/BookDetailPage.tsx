
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

// Dummy book data
const BOOKS = [
  {
    id: 1,
    title: "The Secret Library",
    author: "Oliver Tearle",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 24.99,
    slug: "the-secret-library",
    description: "A literary journey through hidden and forgotten libraries around the world. Oliver Tearle explores the mysteries, histories, and treasures concealed within these remarkable institutions.",
    details: {
      publisher: "Codex Publishing",
      language: "English",
      paperback: "312 pages",
      isbn: "978-1234567890",
      dimensions: "5.5 x 8.5 inches"
    },
    curatorNote: "We selected this book for its beautiful prose and the author's passion for literary preservation. Each chapter feels like opening a door to a new world of discovery.",
    relatedBooks: [2, 6, 8]
  },
  {
    id: 2,
    title: "Culinary Mysteries",
    author: "Amanda Lee",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 19.99,
    slug: "culinary-mysteries",
    description: "A collection of tales exploring the mysterious connections between food, memory, and identity. Amanda Lee weaves together fiction and culinary history into an enthralling narrative.",
    details: {
      publisher: "Brewed Press",
      language: "English",
      paperback: "248 pages",
      isbn: "978-0987654321",
      dimensions: "5.25 x 8 inches"
    },
    curatorNote: "Amanda Lee's ability to describe taste and aroma through prose is unmatched. This book will change how you experience both reading and dining.",
    relatedBooks: [3, 5, 7]
  },
  {
    id: 3,
    title: "Essays on Taste",
    author: "Malcolm Richards",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 22.99,
    slug: "essays-on-taste",
    description: "A profound exploration of how taste — both culinary and aesthetic — shapes our cultural experiences. Malcolm Richards combines philosophy, science, and personal reflection in this groundbreaking work.",
    details: {
      publisher: "Flavor & Thought Press",
      language: "English",
      paperback: "286 pages",
      isbn: "978-5678901234",
      dimensions: "6 x 9 inches"
    },
    curatorNote: "Richards challenges us to reconsider our relationships with taste in all its forms. A truly thought-provoking read that defies categorization.",
    relatedBooks: [2, 5, 7]
  },
  {
    id: 4,
    title: "Brewed Thoughts",
    author: "Eleanor Hart",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 18.99,
    slug: "brewed-thoughts",
    description: "A meditation on coffee culture and the spaces where ideas percolate. Eleanor Hart combines memoir, social history, and cultural criticism in this warm and inviting book.",
    details: {
      publisher: "Caffeine Books",
      language: "English",
      paperback: "224 pages",
      isbn: "978-6789012345",
      dimensions: "5 x 8 inches"
    },
    curatorNote: "Hart captures the essence of what makes cafe culture so vital to intellectual and creative life. A perfect book to read while enjoying your favorite brew.",
    relatedBooks: [1, 6, 8]
  },
  {
    id: 5,
    title: "The Art of Fermentation",
    author: "Sandor Katz",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 28.99,
    slug: "the-art-of-fermentation",
    description: "The definitive guide to fermentation practices throughout history and across cultures. Sandor Katz delves into the science, craft, and significance of one of humanity's oldest food preservation techniques.",
    details: {
      publisher: "Microbial Press",
      language: "English",
      paperback: "498 pages",
      isbn: "978-7890123456",
      dimensions: "7 x 9.5 inches"
    },
    curatorNote: "A comprehensive yet accessible work that has become essential reading for anyone interested in the intersection of food science, tradition, and sustainability.",
    relatedBooks: [2, 3, 7]
  },
  {
    id: 6,
    title: "Literary Palates",
    author: "Jane Morgan",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 21.99,
    slug: "literary-palates",
    description: "An exploration of famous meals in literature and what they reveal about character, plot, and cultural context. Jane Morgan guides readers through a feast of fictional food moments.",
    details: {
      publisher: "Narrative Cuisine Books",
      language: "English",
      paperback: "276 pages",
      isbn: "978-8901234567",
      dimensions: "5.5 x 8.25 inches"
    },
    curatorNote: "Morgan's analysis brings fresh insight to familiar texts by examining them through the lens of food and dining. Equally enjoyable for literary scholars and food enthusiasts.",
    relatedBooks: [1, 4, 8]
  },
  {
    id: 7,
    title: "The Edible Word",
    author: "Thomas Hill",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 19.99,
    slug: "the-edible-word",
    description: "A unique cookbook inspired by iconic literary works. Thomas Hill recreates dishes mentioned in classic novels, paired with analysis of their significance to the narrative.",
    details: {
      publisher: "Chapter & Plate Press",
      language: "English",
      paperback: "240 pages",
      isbn: "978-9012345678",
      dimensions: "8 x 10 inches"
    },
    curatorNote: "This beautiful book bridges the gap between cookbook and literary criticism. Hill's recipes are as thoughtful as his analysis, making this a true feast for mind and body.",
    relatedBooks: [2, 3, 5]
  },
  {
    id: 8,
    title: "Whispers & Wine",
    author: "Clarissa Stone",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 23.99,
    slug: "whispers-and-wine",
    description: "Part memoir, part wine guide, Clarissa Stone recalls the bottles that marked pivotal moments in her life. A lyrical exploration of how wine becomes intertwined with our personal narratives.",
    details: {
      publisher: "Vineyard Tales",
      language: "English",
      paperback: "292 pages",
      isbn: "978-0123456789",
      dimensions: "5.5 x 8.5 inches"
    },
    curatorNote: "Stone writes with remarkable vulnerability and sensory precision. Her story will resonate with anyone who has ever found meaning in shared meals and special bottles.",
    relatedBooks: [1, 4, 6]
  }
];

const BookDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  
  // Find the book by slug
  const book = BOOKS.find(b => b.slug === slug);
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    // In a real app, this would add the item to a cart state or context
    console.log(`Added ${quantity} copies of "${book?.title}" to cart`);
    // Show a toast notification
    alert(`Added ${quantity} ${quantity === 1 ? 'copy' : 'copies'} to cart`);
  };
  
  // Get related books
  const relatedBooks = book?.relatedBooks.map(id => 
    BOOKS.find(b => b.id === id)
  ).filter(Boolean);
  
  if (!book) {
    return (
      <div className="container px-4 md:px-6 py-16 mx-auto text-center">
        <h1 className="font-serif text-2xl mb-4">Book Not Found</h1>
        <p className="mb-6">We couldn't find the book you're looking for.</p>
        <Button asChild>
          <a href="/shop">Return to Shop</a>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container px-4 md:px-6 py-12 mx-auto">
      {/* Book Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Book Image */}
        <div className="aspect-[3/4] bg-codex-cream/30 rounded-lg overflow-hidden">
          <img 
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Book Info */}
        <div>
          <h1 className="font-serif text-3xl font-medium mb-2">{book.title}</h1>
          <p className="text-lg text-codex-charcoal/80 mb-4">{book.author}</p>
          <p className="text-2xl font-medium text-codex-amber mb-6">${book.price.toFixed(2)}</p>
          
          <div className="prose max-w-none mb-8 text-codex-charcoal/90">
            <p>{book.description}</p>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 font-medium">Quantity</span>
            <div className="flex items-center border border-codex-amber rounded-md">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-2 text-codex-amber hover:bg-codex-amber/10"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="px-3 py-2 text-codex-amber hover:bg-codex-amber/10"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-codex-amber hover:bg-codex-gold text-codex-dark-brown"
          >
            Add to Cart
          </Button>
          
          {/* Book Details */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="font-serif text-xl font-medium mb-4">Product Details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex justify-between sm:block">
                <dt className="text-sm text-codex-charcoal/70">Publisher</dt>
                <dd className="sm:mt-1">{book.details.publisher}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-sm text-codex-charcoal/70">Language</dt>
                <dd className="sm:mt-1">{book.details.language}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-sm text-codex-charcoal/70">Paperback</dt>
                <dd className="sm:mt-1">{book.details.paperback}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-sm text-codex-charcoal/70">ISBN</dt>
                <dd className="sm:mt-1">{book.details.isbn}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-sm text-codex-charcoal/70">Dimensions</dt>
                <dd className="sm:mt-1">{book.details.dimensions}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      {/* Curator's Note */}
      <div className="bg-codex-cream/30 p-6 md:p-8 rounded-lg mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-xl font-medium mb-4">Curator's Note</h2>
          <div className="prose text-codex-charcoal/90">
            <p className="italic">"{book.curatorNote}"</p>
          </div>
        </div>
      </div>
      
      {/* Related Books */}
      {relatedBooks && relatedBooks.length > 0 && (
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-medium mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {relatedBooks.map((relatedBook) => relatedBook && (
              <a key={relatedBook.id} href={`/shop/${relatedBook.slug}`}>
                <Card className="hover-lift overflow-hidden border-none">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={relatedBook.image} 
                      alt={relatedBook.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-serif font-medium text-lg">{relatedBook.title}</h3>
                    <p className="text-sm text-codex-charcoal/80 mb-2">{relatedBook.author}</p>
                    <p className="font-medium text-codex-amber">${relatedBook.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;
