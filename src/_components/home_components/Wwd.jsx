import React from 'react'

const Wwd = () => {
  return (
    <section className="bg-nure/5 py-16 px-4 sm:px-6 lg:px-24">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h3 className="text-2xl sm:text-3xl font-semibold text-nure">What We Do</h3>
    <p className="text-sm sm:text-base text-gray-600 mt-2">
      From smart software to digital strategy, we help you build and grow with technology.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* <!-- Service 1 --> */}
    <div className="bg-white p-6 rounded-2xl shadow group hover:shadow-lg transition-all duration-300 text-center">
      <div className="w-14 h-14 mx-auto mb-4 bg-nure/10 text-nure rounded-full flex items-center justify-center text-xl font-bold">
        💻
      </div>
      <h4 className="text-lg font-semibold mb-2">Web & App Development</h4>
      <p className="text-sm text-gray-600">
        We design and build modern, scalable websites and apps for businesses and users who expect performance.
      </p>
    </div>

    {/* <!-- Service 2 --> */}
    <div className="bg-white p-6 rounded-2xl shadow group hover:shadow-lg transition-all duration-300 text-center">
      <div className="w-14 h-14 mx-auto mb-4 bg-nure/10 text-nure rounded-full flex items-center justify-center text-xl font-bold">
        🧠
      </div>
      <h4 className="text-lg font-semibold mb-2">Tech Consulting</h4>
      <p className="text-sm text-gray-600">
        We guide businesses in using technology wisely — from systems planning to digital transformation strategies.
      </p>
    </div>

    {/* <!-- Service 3 --> */}
    <div className="bg-white p-6 rounded-2xl shadow group hover:shadow-lg transition-all duration-300 text-center">
      <div className="w-14 h-14 mx-auto mb-4 bg-nure/10 text-nure rounded-full flex items-center justify-center text-xl font-bold">
        ☁️
      </div>
      <h4 className="text-lg font-semibold mb-2">Cloud & Infrastructure</h4>
      <p className="text-sm text-gray-600">
        Hosting, deployment, monitoring — we manage cloud platforms so your solutions stay fast and reliable.
      </p>
    </div>

    {/* <!-- Service 4 --> */}
    <div className="bg-white p-6 rounded-2xl shadow group hover:shadow-lg transition-all duration-300 text-center">
      <div className="w-14 h-14 mx-auto mb-4 bg-nure/10 text-nure rounded-full flex items-center justify-center text-xl font-bold">
        🎨
      </div>
      <h4 className="text-lg font-semibold mb-2">Brand & Creative</h4>
      <p className="text-sm text-gray-600">
        From logo to launch, we build visual identity and experiences that connect emotionally and convert.
      </p>
    </div>
  </div>
</section>

  )
}

export default Wwd