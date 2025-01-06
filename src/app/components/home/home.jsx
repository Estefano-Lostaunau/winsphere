import React from 'react';


import { Hero } from '../hero/Hero';
import { Statistics } from '../statistics/Statistics';
import { Showcase } from '../showcase/Showcase';
import { Reviews } from '../reviews/Reviews';

function Home() {

  return (
    <>
      <Hero />
      <Statistics />
      <Showcase />
      <Reviews />
    </>
  );
}

export default Home;