import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Anim = () => {
  const welcomeRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
    gsap.to(welcomeRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      delay: 4,
    });
    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 5 }
    );
    gsap.fromTo(
      subheadlineRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 5.5 }
    );
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 6 }
    );
    gsap.fromTo(
      headlineRef.current,
      { x: -100 },
      { x: 0, duration: 1, delay: 5 }
    );
    gsap.fromTo(
      subheadlineRef.current,
      { x: -100 },
      { x: 0, duration: 1, delay: 5.25 }
    );
    gsap.fromTo(
      descriptionRef.current,
      { x: -100 },
      { x: 0, duration: 1, delay: 5.5 }
    );
  }, []);

  return (
    <div className="bg-blue-900 text-white text-center flex flex-col justify-center items-center relative p-5">
      <div className="h-full absolute w-full flex justify-center items-center text-4xl font-semibold" ref={welcomeRef}>
        <h1>Welcome to Our NewsCaster</h1>
      </div>
      <h2 ref={headlineRef} className="text-3xl mb-3 font-semibold">About Us</h2>
      <h3 ref={subheadlineRef} className="text-2xl mb-3 font-semibold">Get to know our NewsCaster</h3>
      <p ref={descriptionRef} className="aboutdes">
        News Caster is a machine learning based news portal.<br /> Here, reader can see news authenticity by hovering over news block. <br />We give facilities of:<br />
        Uases can interact by commenting, liking, disliking.<br />
        Users can also do blogging. <br />
        Users can create their own profile <br />

      </p>

    </div>
  );
};


export default Anim;


/*

     News Caster is a machine learning based news portal. Here, reader can see 
        news authenticity by hovering over news block. We give facilities of:
        <ol type="1">
           Uases can interact by commenting, liking, disliking.<br/>
             Users can also do blogging. <br/>
             Users can create their own profile <br/>
             </ol>
      
*/