
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="font-serif text-5xl font-medium mb-4">404</h1>
      <p className="text-xl mb-8 text-center">Oops! The page you're looking for isn't in our collection.</p>
      <div className="max-w-md text-center mb-8">
        <p className="text-codex-charcoal/80">
          It seems the literary journey you were embarking on led to an uncharted territory. 
          Let's guide you back to familiar shelves.
        </p>
      </div>
      <div className="space-x-4">
        <Button asChild className="bg-codex-amber hover:bg-codex-gold text-codex-dark-brown">
          <Link to="/">Return Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/shop">Browse Books</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
