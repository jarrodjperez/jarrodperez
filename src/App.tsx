import React from 'react';
import './App.scss';

import Hero from './components/Hero';
import Greeting from './components/Greeting';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Hero></Hero>
      <Greeting></Greeting>
      <Skills></Skills>
      <Timeline></Timeline>
      <Footer></Footer>
    </div>
  );
}

export default App;
