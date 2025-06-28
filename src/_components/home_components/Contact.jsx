export default function Contact() {
  return (
    <>
      <section className="min-h-screen bg-white py-20 px-6 sm:px-10 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info Section */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-nure mb-4">
              Let’s Build Together
            </h1>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              Whether you have an idea, a project, or a question — Nurray
              Technologies is here for you. Fill the form or connect directly.
            </p>
            <div className="space-y-4 text-sm sm:text-base text-gray-600">
              <p>
                <span className="font-medium text-nure">Email:</span>{" "}
                hello@nurray.com
              </p>
              <p>
                <span className="font-medium text-nure">Phone:</span> +234 706
                184 3511
              </p>
              <p>
                <span className="font-medium text-nure">Location:</span> Abuja,
                Nigeria
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="bg-gray-50 p-8 rounded-2xl shadow-lg space-y-6 w-full"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-main text-white font-semibold rounded-lg hover:bg-nure/90 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
