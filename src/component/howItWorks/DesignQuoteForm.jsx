import React from "react";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
const DesignQuoteForm = () => {
  // Initialize AOS (this should ideally be done in a useEffect or componentDidMount)
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: "1500px" }}>
        {/* Left Section */}
        <div className="w-full md:w-1/2 relative bg-gray-200" style={{ width: "700px" }}>
          {/* Background Image */}
          <div className="absolute inset-0">
            <motion.img
              src="/src/assets/Howitworks.jpg"
              loading="lazy"
              alt="Room Background"
              className="w-full h-full"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
        {/* Right Section */}
        <div
          className="w-full md:w-1/2 text-white p-8"
          style={{
            '--secondary-custom-variant': '#013220', // Custom color
            '--secondary-dark': '#000000', // Custom color
            background: 'linear-gradient(100.23deg, var(--secondary-custom-variant), var(--secondary-dark))',
          }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-4"
            data-aos="fade-up" // AOS fade-up for section title
          >
            Designs for Every Budget
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mb-6"
            data-aos="fade-up" // AOS fade-up for text
            data-aos-delay="200"
          >
            Get your dream home today. Let our experts help you.
          </motion.p>
          <motion.form
            variants={containerVariants}
            className="space-y-4"
            data-aos="fade-up" // AOS fade-up for form fields
          >
            <motion.div variants={itemVariants} data-aos="fade-up" data-aos-delay="300">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </motion.div>
            <motion.div variants={itemVariants} data-aos="fade-up" data-aos-delay="400">
              <label className="block text-sm font-medium">Email ID</label>
              <input
                type="email"
                placeholder="Email ID"
                className="w-full p-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </motion.div>
            <motion.div variants={itemVariants} data-aos="fade-up" data-aos-delay="500">
              <label className="block text-sm font-medium">Phone Number</label>
              <div className="flex items-center">
                <span className="bg-white text-gray-800 p-2 rounded-l">+91</span>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full p-2 rounded-r bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="600">
              <input type="checkbox" id="whatsapp" className="w-4 h-4" />
              <label htmlFor="whatsapp" className="text-sm">
                Send me updates on WhatsApp
              </label>
            </motion.div>
            {/* <motion.div variants={itemVariants} data-aos="fade-up" data-aos-delay="700">
              <label className="block text-sm font-medium">Property Name</label>
              <input
                type="text"
                placeholder="Property Name"
                className="w-full p-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </motion.div> */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1, boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)" }}
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <button
                type="submit"
                className="w-full py-2 bg-white rounded text-[#104438] font-semibold transition-all duration-300"
              >
                GET FREE QUOTE
              </button>
            </motion.div>
          </motion.form>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-sm"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            By submitting this form, you agree to the
            <a href="#" className="underline">
              <span>{" "}</span> privacy policy
            </a>
            &
            <a href="#" className="underline">
              terms and conditions
            </a>
            .
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
export default DesignQuoteForm;




















