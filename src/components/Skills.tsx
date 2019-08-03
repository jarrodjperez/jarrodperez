import React from 'react';

const Skills: React.FC = () => {
  return (
    <section className="section skills has-text-centered">
      <div className="container is-narrow">
          <div className="box" data-aos="slide-up" data-aos-duration="2000">
              <div className="content">
                  <div className="columns is-centered">
                      <div className="column">
                        <span className="icon is-large has-text-primary">
                            <i className="fas fa-code fa-3x"></i>
                        </span>
                        <h1 className="title is-size-3 is-spaced">Coding</h1>
                        <h1 className="title is-size-5 is-spaced">Languages</h1>
                        <p>Angular, React, HTML, CSS, Typescript, NodeJs</p>
                        <h1 className="title is-size-5 is-spaced">Developer Tools</h1>
                        <ul>
                            <li>Bootstrap</li>
                            <li>Bulma</li>
                            <li>Github</li>
                            <li>Gitlab</li>
                            <li>Jest</li>
                            <li>Terminal</li>
                        </ul>
                      </div>
                      <div className="column">
                        <span className="icon is-large has-text-primary">
                            <i className="fas fa-palette fa-3x"></i>
                        </span>
                        <h1 className="title is-size-3 is-spaced">Design</h1>
                        <h1 className="title is-size-5 is-spaced">Stuff I do</h1>
                        <p>UI, UX, Web, Mobile, Apps</p>
                        <h1 className="title is-size-5 is-spaced">Design Tools</h1>
                        <ul>
                            <li>Balsamiq</li>
                            <li>Illustrator</li>
                            <li>Invision</li>
                            <li>Photoshop</li>
                            <li>Sketch</li>                            
                            <li>XD</li>
                        </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
}

export default Skills;
