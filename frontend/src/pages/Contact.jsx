import Navbar from "../components/Navbar";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_3aqn17y";
const TEMPLATE_ID = "template_58sjxaj";
const PUBLIC_KEY = "mCzdbRT03cuKiOI6D";

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          alert("Thank you for contacting us! We'll get back to you soon.");
          formRef.current.reset();
        },
        error => {
          alert("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f0f11] text-white px-4 py-16 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions, feedback, or need support? We'd love to hear from you!
          </p>
        </div>

        <form
          ref={formRef}
          className="bg-[#1e1e24] border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-screen-md space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-medium">Your Name</label>
            <input
              type="text"
              name="user_name"
              className="p-3 rounded-lg bg-[#121217] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-medium">Your Email</label>
            <input
              type="email"
              name="user_email"
              className="p-3 rounded-lg bg-[#121217] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-medium">Your Message</label>
            <textarea
              name="message"
              className="p-3 rounded-lg bg-[#121217] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Write your message..."
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 text-center text-gray-400 space-y-4 text-sm">
          <p>
            Or email us directly at{" "}
            <a href="mailto:jainabhishek62@gmail.com" className="text-blue-300 underline hover:text-blue-400 transition">
              jainabhishek62@gmail.com
            </a>
          </p>
          <p>
            <a
              href="https://www.linkedin.com/in/abhishek-jain-53b506258"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline hover:text-blue-400 transition"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/aj2980"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline hover:text-blue-400 transition"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
