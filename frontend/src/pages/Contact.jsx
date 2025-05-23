import Navbar from "../components/Navbar";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_3aqn17y";
const TEMPLATE_ID = "template_58sjxaj";
const PUBLIC_KEY = "mCzdbRT03cuKiOI6D";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = e => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          alert("Thank you for contacting us! We'll get back to you soon.");
          setForm({ user_name: "", user_email: "", message: "" });
          formRef.current.reset();
          setSending(false);
        },
        () => {
          alert("Something went wrong. Please try again later.");
          setSending(false);
        }
      );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f0f11] text-white px-4 py-16 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4 drop-shadow-lg">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions, feedback, or need support? We'd love to hear from you!
          </p>
        </div>

        <form
          ref={formRef}
           className="contact-form-container w-full max-w-screen-md space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-medium">Your Name</label>
            <div className="inputBox">
              <input
                type="text"
                name="user_name"
                className="bg-transparent border-none outline-none text-white w-full"
                placeholder="Enter your name"
                required
                value={form.user_name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-medium">Your Email</label>
            <div className="inputBox">
              <input
                type="email"
                name="user_email"
                className="bg-transparent border-none outline-none text-white w-full"
                placeholder="Enter your email"
                required
                value={form.user_email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-medium">Your Message</label>
            <div className="inputBox">
              <textarea
                name="message"
                className="bg-transparent border-none outline-none text-white w-full resize-none"
                placeholder="Write your message..."
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btnNormal mt-2"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Message"}
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
