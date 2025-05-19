
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const FEATURED_COLLECTIONS = [
  {
    id: 1,
    title: "Literary Essays",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    description: "Thoughtful perspectives on literature, culture, and more.",
    slug: "literary-essays"
  },
  {
    id: 2,
    title: "Culinary Journeys",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    description: "Explore the rich intersections of food culture and storytelling.",
    slug: "culinary-journeys"
  },
  {
    id: 3,
    title: "Limited Editions",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    description: "Exclusive releases with special bindings and illustrations.",
    slug: "limited-editions"
  }
];

const NEW_ARRIVALS = [
  {
    id: 1,
    title: "The Secret Library",
    author: "Oliver Tearle",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 24.99,
    slug: "the-secret-library"
  },
  {
    id: 2,
    title: "Culinary Mysteries",
    author: "Amanda Lee",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 19.99,
    slug: "culinary-mysteries"
  },
  {
    id: 3,
    title: "Essays on Taste",
    author: "Malcolm Richards",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    price: 22.99,
    slug: "essays-on-taste"
  },
  {
    id: 4,
    title: "Brewed Thoughts",
    author: "Eleanor Hart",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    price: 18.99,
    slug: "brewed-thoughts"
  }
];

const HomePage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the email to a newsletter service
    console.log(`Subscribed with email: ${email}`);
    setEmail('');
    // Show a toast notification
    alert('Thanks for subscribing!');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-codex-dark-brown text-codex-cream py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/2999c0a2-0b95-4505-bc78-75e636f35eba.png')] bg-cover bg-center opacity-20"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Books Brewed With Intention
            </h1>
            <p className="text-lg md:text-xl text-codex-cream/90 mb-10">
              A specialty bookshop with a curated collection focused on niche, high-quality literature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-codex-amber hover:bg-codex-gold text-codex-dark-brown">
                <Link to="/shop">Explore Our Collection</Link>
              </Button>
              <Button asChild variant="outline" className="border-codex-cream/40 hover:bg-codex-cream/10 text-codex-cream">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section-padding container px-4 md:px-6 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-medium mb-3">Featured Collections</h2>
          <p className="text-codex-charcoal/80 max-w-2xl mx-auto">
            Explore our thoughtfully curated selections, each revealing a unique literary journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_COLLECTIONS.map((collection) => (
            <Link key={collection.id} to={`/shop?collection=${collection.slug}`} className="group">
              <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-codex-dark-brown/80 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-white mb-1">{collection.title}</h3>
                  </div>
                </div>
              </div>
              <p className="text-codex-charcoal/80 text-sm">{collection.description}</p>
              <div className="mt-3 flex items-center text-codex-amber font-medium text-sm group-hover:underline">
                View Collection <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-codex-cream/30 section-padding">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-medium mb-3">New Arrivals</h2>
            <p className="text-codex-charcoal/80 max-w-2xl mx-auto">
              The latest additions to our carefully selected catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {NEW_ARRIVALS.map((book) => (
              <Link key={book.id} to={`/shop/${book.slug}`}>
                <Card className="hover-lift overflow-hidden border-none">
                  <div className="h-64 overflow-hidden">
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
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/shop">View All Books</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-codex-dark-blue text-codex-cream section-padding">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-medium mb-3">Join Our Literary Circle</h2>
            <p className="text-codex-cream/80 mb-8">
              Subscribe to our newsletter for curated reading lists, exclusive offers, and literary insights.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 flex-grow bg-codex-dark-blue border border-codex-cream/30 rounded-md focus:outline-none focus:ring-1 focus:ring-codex-amber"
                required
              />
              <Button type="submit" className="bg-codex-amber hover:bg-codex-gold text-codex-dark-brown">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
