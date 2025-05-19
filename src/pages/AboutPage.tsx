
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-codex-dark-brown text-codex-cream py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/2999c0a2-0b95-4505-bc78-75e636f35eba.png')] bg-cover bg-center opacity-20"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-codex-cream/90">
              The passion and philosophy behind The Edible Codex
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container px-4 md:px-6 py-16 md:py-24 mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-medium mb-6 text-center">Our Mission</h2>
          <div className="prose prose-lg mx-auto">
            <p>
              At The Edible Codex, we believe that books, like food, should be carefully selected, thoughtfully prepared, and savored with intention. We are passionate about curating literature that nourishes the mind and soul.
            </p>
            <p>
              Founded in 2021, our specialty bookshop focuses on the intersection of literary excellence and thoughtful curation. We operate entirely online, delivering carefully selected books directly to the doorsteps of discerning readers.
            </p>
            <p>
              Each title in our collection has been chosen not merely for its commercial appeal, but for its ability to provoke thought, evoke emotion, and enrich the reader's intellectual palate.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-codex-cream/30 py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="font-serif text-3xl font-medium mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-codex-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-codex-amber">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">Thoughtful Curation</h3>
              <p className="text-codex-charcoal/80">
                We meticulously select each book in our collection, prioritizing quality, significance, and the unique perspective it offers.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-codex-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-codex-amber">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">Literary Discovery</h3>
              <p className="text-codex-charcoal/80">
                We celebrate both established classics and undiscovered gems, introducing readers to works they might otherwise never encounter.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-codex-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-codex-amber">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">Intellectual Nourishment</h3>
              <p className="text-codex-charcoal/80">
                We believe in the transformative power of literature and its ability to expand minds, challenge perspectives, and deepen understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container px-4 md:px-6 py-16 md:py-24 mx-auto">
        <h2 className="font-serif text-3xl font-medium mb-12 text-center">Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-codex-cream/50 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop"
                alt="Elena Morgan"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-xl font-medium mb-1">Elena Morgan</h3>
            <p className="text-codex-amber mb-3">Founder & Chief Curator</p>
            <p className="text-codex-charcoal/80 max-w-xs mx-auto">
              Former literature professor with a passion for connecting readers with transformative texts.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-codex-cream/50 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop"
                alt="Marcus Chen"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-xl font-medium mb-1">Marcus Chen</h3>
            <p className="text-codex-amber mb-3">Literary Director</p>
            <p className="text-codex-charcoal/80 max-w-xs mx-auto">
              Book critic and essayist with a keen eye for emerging literary talent.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-codex-cream/50 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop"
                alt="Sophia Williams"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-xl font-medium mb-1">Sophia Williams</h3>
            <p className="text-codex-amber mb-3">Community Manager</p>
            <p className="text-codex-charcoal/80 max-w-xs mx-auto">
              Former bookseller dedicated to creating meaningful connections between readers.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="bg-codex-dark-blue text-codex-cream py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-medium mb-6">Our Vision</h2>
            <p className="text-xl mb-8">
              "We envision a world where the act of selecting and reading a book is approached with the same intention and appreciation as a carefully prepared meal."
            </p>
            <Button asChild className="bg-codex-amber hover:bg-codex-gold text-codex-dark-brown">
              <Link to="/shop">Explore Our Collection</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
