
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend API
    console.log('Form submitted:', formData);
    // Show a toast notification
    alert('Your message has been sent! We\'ll get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-codex-dark-brown text-codex-cream py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/2999c0a2-0b95-4505-bc78-75e636f35eba.png')] bg-cover bg-center opacity-20"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-codex-cream/90">
              We'd love to hear from you. Reach out with questions, feedback, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container px-4 md:px-6 py-16 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-2xl font-medium mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Email</h3>
                <a href="mailto:hello@ediblecodex.com" className="text-codex-amber hover:underline">
                  hello@ediblecodex.com
                </a>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Hours</h3>
                <p className="text-codex-charcoal/80">
                  Online support available<br />
                  Monday – Friday: 9am – 5pm<br />
                  Saturday: 10am – 3pm<br />
                  Sunday: Closed
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Shipping</h3>
                <p className="text-codex-charcoal/80">
                  We ship nationwide within the US.<br />
                  For international shipping inquiries,<br />
                  please contact us directly.
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium text-lg mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com" className="text-codex-charcoal hover:text-codex-amber" aria-label="Instagram">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://twitter.com" className="text-codex-charcoal hover:text-codex-amber" aria-label="Twitter">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-medium mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-codex-amber"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-codex-amber"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-codex-amber bg-white"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="order-inquiry">Order Inquiry</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="product-availability">Product Availability</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-codex-amber"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit"
                      className="w-full sm:w-auto bg-codex-amber hover:bg-codex-gold text-codex-dark-brown"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-codex-cream/30 py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="font-serif text-2xl font-medium mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif text-lg font-medium mb-2">How long does shipping take?</h3>
                <p className="text-codex-charcoal/80">
                  Standard shipping typically takes 3-5 business days within the continental US. 
                  Express shipping options (2-day and overnight) are also available at checkout.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif text-lg font-medium mb-2">Do you ship internationally?</h3>
                <p className="text-codex-charcoal/80">
                  Yes, we ship to select international destinations. International shipping rates and delivery times 
                  vary by location. Please contact us directly for specific information about your country.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif text-lg font-medium mb-2">What is your return policy?</h3>
                <p className="text-codex-charcoal/80">
                  We accept returns within 30 days of delivery for books in new, unread condition. 
                  Please contact us to initiate a return. Return shipping costs are the responsibility of the customer 
                  unless the return is due to our error.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif text-lg font-medium mb-2">Can I request a book that's not in your collection?</h3>
                <p className="text-codex-charcoal/80">
                  Absolutely! We're always open to customer requests and suggestions. Please use our contact form 
                  or email us directly with any specific titles or authors you'd like to see in our collection.
                </p>
              </div>
              
              <div className="pb-4">
                <h3 className="font-serif text-lg font-medium mb-2">Do you offer gift wrapping?</h3>
                <p className="text-codex-charcoal/80">
                  Yes, we offer premium gift wrapping services for an additional $5 per book. 
                  You can select this option during checkout and include a personalized message if desired.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
