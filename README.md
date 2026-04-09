# Kamora Food Promotional Website

A modern, responsive, and interactive food promotional website built with React, TypeScript, Vite, and Tailwind CSS for the fictional food brand "Kamora".

## Features

- **Single-Page Application**: Smooth scrolling navigation between sections
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern UI**: Clean card layouts with warm food-inspired colors
- **Interactive Components**: Functional navigation, contact form with validation
- **Professional Branding**: Cohesive design theme throughout

## Project Structure

```
src/
  assets/          # Images and icons
  components/      # Reusable UI components
    - Button.tsx
    - Navbar.tsx
    - Hero.tsx
    - FoodCard.tsx
    - MemberCard.tsx
    - PartnershipSection.tsx
    - Footer.tsx
  sections/        # Page sections
    - Home.tsx
    - About.tsx
    - Partnership.tsx
    - Contact.tsx
  styles/          # CSS and styling
    - index.css
  App.tsx          # Main application component
  main.tsx         # Entry point
```

## Technology Stack

- **React 18** - UI library with functional components and hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Inter Font** - Modern typography from Google Fonts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Kamora-final
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Website Sections

### Hero Section
- Brand introduction with welcoming message
- Call-to-action button for smooth scrolling to About section
- Gradient background with modern typography

### Home Section
- Menu highlights displaying exactly 3 items:
  - 1 main dish (Grilled Salmon Deluxe - $24.99)
  - 1 side dish (Garden Fresh Salad - $8.99)
  - 1 drink (Artisan Lemonade - $4.99)
- Clean card layouts with category icons and pricing

### About Section
- Company story, mission, and vision
- Team showcase with 10+ member cards
- Responsive grid layout for team members

### Partnership Section
- Partnership opportunities and benefits
- Call-to-action button scrolling to Contact section
- Gradient design with benefit cards

### Contact Section
- Functional contact form with validation
- Success message display without page refresh
- Business contact information and social links

## Design System

### Color Palette
- **Kamora Orange**: #FF6B35 (primary brand color)
- **Kamora Red**: #C73E1D (accent color)
- **Kamora Cream**: #FFF8E1 (background accent)
- **Kamora Brown**: #8B4513 (text accent)
- **Kamora Dark**: #2C1810 (dark text)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Responsive scaling** for all screen sizes

### Components
- **Button**: Primary and secondary variants with hover states
- **Card**: Consistent shadow and border radius
- **Navbar**: Sticky navigation with mobile menu toggle
- **Form**: Controlled components with real-time validation

## Responsive Features

- **Mobile Menu**: Hamburger menu with smooth transitions
- **Flexible Grid**: Adaptive layouts for all screen sizes
- **Touch-Friendly**: Appropriate button sizes and spacing
- **Performance**: Optimized images and minimal JavaScript

## Development Notes

- Uses functional components with React Hooks
- Implements smooth scrolling with `scrollIntoView`
- Form validation with controlled components
- No external routing - single-page navigation
- Separation of concerns with modular component structure

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.
