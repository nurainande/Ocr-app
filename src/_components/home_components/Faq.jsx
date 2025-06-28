import React from 'react'

const Faq = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-24">
  <div className="max-w-3xl mx-auto text-center mb-10">
    <h3 className="text-2xl sm:text-3xl font-semibold text-nure">FAQs</h3>
    <p className="text-sm sm:text-base text-gray-600 mt-2">
      Everything you need to know about Nurray Technologies and how we work.
    </p>
  </div>

  <div className="max-w-3xl mx-auto space-y-4">
    {/* <!-- FAQ 1 --> */}
    <details className="group bg-gray-50 p-5 rounded-xl shadow">
      <summary className="flex justify-between items-center cursor-pointer text-nure font-medium">
        What services does Nurray Technologies offer?
        <span className="ml-2 transition-transform group-open:rotate-180">➕</span>
      </summary>
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
        We offer full-stack web & mobile development, tech consulting, branding, and digital infrastructure solutions tailored to individuals, startups, and growing businesses.
      </p>
    </details>

    {/* <!-- FAQ 2 --> */}
    <details className="group bg-gray-50 p-5 rounded-xl shadow">
      <summary className="flex justify-between items-center cursor-pointer text-nure font-medium">
        Can I request a custom software or website?
        <span className="ml-2 transition-transform group-open:rotate-180">➕</span>
      </summary>
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
        Absolutely! We specialize in building tailored digital solutions. Just tell us your idea, and we’ll help bring it to life step-by-step.
      </p>
    </details>

    {/* <!-- FAQ 3 --> */}
    <details className="group bg-gray-50 p-5 rounded-xl shadow">
      <summary className="flex justify-between items-center cursor-pointer text-nure font-medium">
        What makes Nurray different from other tech companies?
        <span className="ml-2 transition-transform group-open:rotate-180">➕</span>
      </summary>
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
        We're rooted in purpose. Beyond just building software, we focus on impact, innovation, and empowering people through tech — especially in Africa and emerging markets.
      </p>
    </details>

    {/* <!-- FAQ 4 --> */}
    <details className="group bg-gray-50 p-5 rounded-xl shadow">
      <summary className="flex justify-between items-center cursor-pointer text-nure font-medium">
        How long does it take to build a project?
        <span className="ml-2 transition-transform group-open:rotate-180">➕</span>
      </summary>
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
        Timelines depend on the project’s size and complexity. Simple sites take 1–2 weeks, while custom apps may take a few months. We'll always give a clear timeline upfront.
      </p>
    </details>
  </div>
</section>

  )
}

export default Faq