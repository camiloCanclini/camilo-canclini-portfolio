import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

const WelcomeText = () => {
  return (
    <>
      <ReactTypingEffect
        text={["Hello world!", "I'm Camilo Canclini", "And I'm web developer"]}
        className='text-white text-4xl'
        speed={70}
        typingDelay={1000}
        eraseDelay={2000}
        eraseSpeed={50}
      />
    </>
  );
};

export default WelcomeText;