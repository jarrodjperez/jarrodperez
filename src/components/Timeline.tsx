import React from 'react';

const Timeline: React.FC = () => {
  return (
    <section className="section is-medium">
        <div className="container experience is-narrow has-text-centered" data-aos="fade-in">
            <h1 className="title is-spaced is-size-3-desktop is-size-4-mobile">My Experience</h1>
        </div>
        <div className="timeline is-centered">
            <header className="timeline-header" data-aos="fade-in">
                <span className="tag is-medium is-primary">Present</span>
            </header>
            <div className="timeline-item" data-aos="fade-in">
                <div className="timeline-marker is-icon">
                    <i className="fa fa-building"></i>
                </div>
                <div className="timeline-content">
                    <p className="heading">December 2012</p>
                    <p>Sony Playstation</p>
                    <p>Senior UX Engineer</p>
                </div>
            </div>
            <div className="timeline-item" data-aos="fade-in">
                <div className="timeline-marker is-icon">
                    <i className="fa fa-building"></i>
                </div>
                <div className="timeline-content">
                    <p className="heading">September 2008</p>
                    <p>Markit on Demand</p>
                    <p>Senior Software Engineer</p>
                </div>
            </div>
            <div className="timeline-item" data-aos="fade-in">
                <div className="timeline-marker is-icon">
                    <i className="fa fa-graduation-cap"></i>
                </div>
                <div className="timeline-content">
                    <p className="heading">May 2006</p>
                    <p>Full Sail University</p>
                    <p>B.S. Digital Arts & Design</p>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Timeline;
