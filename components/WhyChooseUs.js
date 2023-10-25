import React from "react";
import SassTest from "./SassComponent/SassTest";
import { ImSearch } from "react-icons/im";
import { GiFist } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import { FaMedal } from "react-icons/fa";
import Back from "../assets/images/bg.jpg";
const WhyChooseUs = () => {
  return (
    <div
      className="bg-cover bg-center p-5"
      style={{ backgroundImage: `url("${Back.src}")` }}
    >
      <div className="w-full h-full backdrop-blur-sm py-10 px-5 md:px-10 bg-blue-200 bg-opacity-60">
        <h1 className="text-center font-bold text-3xl lg:text-4xl mb-5 md:mb-10 text-cyan-950">
          WHY CHOOSE US?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <SassTest
            className="item"
            icon={<ImSearch size={40} />}
            title="Real-time prediction"
            description="Predict news in real-time by hovering over card"
          />
          <SassTest
            classname="item"
            icon={<GiFist size={40} />}
            title="Freedom of speech"
            description="share your thought,political views in our site"
          />
          <SassTest
            classname="item"
            icon={<GoVerified size={40} />}
            title="Reliablity"
            description="News are predicted using machine learning to deliver authentic news"
          />
          <SassTest
            classname="item"
            icon={<FaMedal size={40} />}
            title="Rewards"
            description="Good contents are rated by other reporters."
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
