import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="section footer is-small has-text-centered has-background-primary">
        <div className="container is-narrow" data-aos="fade-down" data-aos-duration="1000">
            <div className="columns is-centered"> 
                <div className="column is-one-third">
                    <h1 className="title is-size-4-touch has-text-white">Connect with me</h1>
                    <a href="https://www.linkedin.com/in/jarrodperez">
                        <span className="icon is-large">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </span>
                    </a>
                    <a href="https://github.com/jarrodjperez">
                        <span className="icon is-large">
                            <i className="fab fa-github fa-2x"></i>
                        </span>
                    </a>
                    <a href="https://twitter.com/perezjarrod">
                        <span className="icon is-large">
                            <i className="fab fa-twitter fa-2x"></i> 
                        </span>
                    </a>
                    <a href="mailto:perez.jarrod@gmail.com">
                        <span className="icon is-large">
                            <i className="fas fa-envelope fa-2x"></i> 
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
