import React from "react";
import StarRating from "../components/Rating";
import Anim from "../components/GsapComponent";
import Map from "../components/Location";
import PageTitle from "../components/PageTitle";

const About = () => {
  return (
    <div className="">
      <PageTitle>About Us</PageTitle>
      <Anim />
      <StarRating />
      <Map />
    </div>
  );
};

export default About;
