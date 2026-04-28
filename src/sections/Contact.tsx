import React, { useState } from 'react';
import Button from '../components/Button';
import facebookIcon from '../../assets/facebook.png';
import instaIcon from '../../assets/insta.png';
import tiktokIcon from '../../assets/tiktok.png';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-green-600 text-5xl mb-4"> Success!</div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Thank you for contacting us!
            </h3>
            <p className="text-green-700 mb-6">
              We've received your message and will get back to you within 24 hours.
            </p>
            <Button onClick={resetForm} variant="primary">
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-kamora-dark mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-kamora-orange focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-kamora-orange focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-kamora-orange focus:border-transparent transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-kamora-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-kamora-dark mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-kamora-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">goldensunfield@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-kamora-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">+63 966 544 3985</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-kamora-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">4031 Gen T. De Leon, Valenzuela City, Philippines</span>
                </div>
              </div>
            </div>

            <div className="bg-kamora-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-kamora-dark mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-700">
                <p>Monday to Saturday</p>
                <p>8:00 AM - 8:00 PM</p>
              
              </div>
            </div>

            <div className="bg-kamora-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-kamora-dark mb-4">Follow Us</h3>
              <div className="flex items-center space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61573337227317&rdid=QUVyv1mVajnPPUUU&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C4ayqFM75%2F#" target="_blank" rel="noreferrer">
                  <img src={facebookIcon} alt="Facebook" className="w-6 h-6 object-contain" />
                </a>
                <a href="https://www.tiktok.com/@goldensunfield?_r=1&_t=ZS-95Q6eBgXIVI" target="_blank" rel="noreferrer">
                  <img src={tiktokIcon} alt="TikTok" className="w-6 h-6 object-contain" />
                </a>
                <a href="https://www.instagram.com/kamora_official?igsh=NWN6ejJxbjRqdHMx" target="_blank" rel="noreferrer">
                  <img src={instaIcon} alt="Instagram" className="w-6 h-6 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
