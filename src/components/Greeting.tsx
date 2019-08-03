import React from 'react';

const Greeting: React.FC = () => {

  const getAge = (dob: string) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
  }

  return (
    <section className="section greeting has-text-centered is-medium is-long has-background-primary">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-three-fifths">
                    <h1 className="title is-spaced is-size-3-desktop is-size-4-mobile has-text-white" data-aos="fade-down" data-aos-duration="2000">A little bit more about me...</h1>
                    <h2 className="subtitle is-size-5-desktop has-text-white" data-aos="fade-in" data-aos-delay="500" data-aos-duration="2000">I'm { getAge("12/17/1985") } years old currently living in Austin TX with my fiance and two dogs. I'm a creative problem solver and always looking to level up my skills. I enjoy working and learning from smart, talented people. When I'm not playing with my dogs, I'm usually playing games with friends and spending time with my soon to be wife.</h2>
                </div>
            </div>
        </div>
    </section>
  );
}


export default Greeting;
