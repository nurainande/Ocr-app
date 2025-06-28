import React from 'react'

const Vmc = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-24">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-semibold text-nure">Pillars</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* <!-- Vision --> */}
        <div className="relative h-72 rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1510&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Vision"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-main/80 via-main/40 to-transparent z-10"></div>
          <div className="relative z-20 p-6 h-full flex flex-col justify-end text-white">
            <h4 className="text-xl font-semibold mb-2">Vision</h4>
            <p className="text-sm leading-relaxed">
              To become a leading African technology powerhouse creating
              sustainable solutions that improve lives globally.
            </p>
          </div>
        </div>

        {/* <!-- Mission --> */}
        <div className="relative h-72 rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mission"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-main/80 via-main/40 to-transparent z-10"></div>
          <div className="relative z-20 p-6 h-full flex flex-col justify-end text-white">
            <h4 className="text-xl font-semibold mb-2">Mission</h4>
            <p className="text-sm leading-relaxed">
              To build digital products that solve real-world problems and drive
              entrepreneurship through technology.
            </p>
          </div>
        </div>

        {/* <!-- Core Values --> */}
        <div className="relative h-72 rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://unsplash.com/photos/white-robot-near-brown-wall-2EJCSULRw"
            alt="Core Values"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-main/80 via-main/40 to-transparent z-10"></div>
          <div className="relative z-20 p-6 h-full flex flex-col justify-end text-white">
            <h4 className="text-xl font-semibold mb-2">Core Values</h4>
            <p className="text-sm leading-relaxed">
              Innovation. Integrity. Growth. Excellence. Impact. These guide all
              we build and stand for at Nurray.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vmc