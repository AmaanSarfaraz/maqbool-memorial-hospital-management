import React from 'react';
import Hero from '../../components/Hero';
import Testimonial from '../../components/Testimonial';
import BlogBanner from '../Blog/BlogBanner';
import Team from '../Team/Team';
import Services from '../Services/Services';
import Footer from '../../components/Footer';
import BlogContextProvider from '../../context/blog/BlogProvider';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Team/>
      <Testimonial/>
      <BlogContextProvider><BlogBanner/></BlogContextProvider>
      <Footer/>
    </>
  );
}

export default Home;
