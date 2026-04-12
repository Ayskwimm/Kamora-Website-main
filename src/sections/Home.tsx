import React from 'react';

type TabKey = 'home' | 'menu' | 'about' | 'contact';

interface HomeProps {
  onNavigate: (tab: TabKey) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate: _onNavigate }) => {
  return null;
};

export default Home;
