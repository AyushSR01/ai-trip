import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

function TypingEffect() {
  const typedRef = useRef(null); // Ref for the DOM element
  const typedInstance = useRef(null); // Ref to hold the Typed instance

  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: ["Personalized Itineraries at your Fingertip"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      backDelay: 5000,
      cursorChar: "|",
      smartBackspace: true,
    });

    // Destroy on unmount to clean up
    return () => {
      typedInstance.current.destroy();
    };
  }, []);

  return (
    <span className="auto-type text-6xl font-bold text-black" ref={typedRef}>  </span>
  );
}

export default TypingEffect;
