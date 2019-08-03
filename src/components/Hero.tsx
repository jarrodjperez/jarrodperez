import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="section hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">
            Hi, I'm Jarrod Perez
          </p>
          <p className="subtitle is-size-4-desktop" data-aos="fade-in" data-aos-delay="2500" data-aos-duration="2000">
            Full Stack Web Developer, Design Dabbler
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
