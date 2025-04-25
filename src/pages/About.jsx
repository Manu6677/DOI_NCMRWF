import React from 'react';
import Vision from '../components/core/AboutPage/Vision';
import LeadershipAndPartners from '../components/core/AboutPage/LeadershipAndPartners';
import OurMissionAndStory from '../components/core/AboutPage/OurMissionAndStory';
import ProductsAndUserDepartments from '../components/core/AboutPage/ProductsAndUserDepartments';
import Projects from '../components/core/AboutPage/Projects';

const About = () => {
  return (
    <div className="">
      <Vision />

      <OurMissionAndStory />

      <LeadershipAndPartners />

      <Projects />
    </div>
  );
};

export default About;
