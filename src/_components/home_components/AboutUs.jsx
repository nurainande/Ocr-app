import React from 'react'

const AboutUs = () => {
  return (
    <section id='about' className="bg-white py-12 px-4 sm:px-6 lg:px-24 text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-nure">
          About Nurray
        </h2>
        <p className="text-base sm:text-lg leading-relaxed mb-4">
          At <strong>Nurray Technologies</strong>, we are on a mission to build
          innovative software solutions that transform how people live, work,
          and connect. From everyday tools to enterprise-grade platforms, our
          goal is to craft technology that matters.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-4">
          Born out of a passion for excellence and rooted in African innovation,
          Nurray is not just a tech company — it's a movement. We exist to
          empower businesses, support communities, and reimagine what's possible
          in today's digital age.
        </p>
        <p className="text-base sm:text-lg leading-relaxed">
          Whether it's creating intuitive web apps, offering custom solutions,
          or nurturing future creators through education and impact, we're here
          to build a better future — one line of code at a time.
        </p>
      </div>
    </section>
  );
}

export default AboutUs