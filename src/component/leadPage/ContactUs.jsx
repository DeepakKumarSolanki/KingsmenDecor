import { motion } from "framer-motion";
import { TextField, Button } from "@mui/material";
import { LuInstagram } from "react-icons/lu";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import PageHomeBanner from "../common/PageHomeBanner";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";

const ContactUsForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!fullName) validationErrors.fullName = "Full Name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      validationErrors.email = "A valid Email is required.";
    if (!contact || !/^\d{10}$/.test(contact))
      validationErrors.contact = "A valid 10-digit contact number is required.";
    if (!message) validationErrors.message = "Message cannot be empty.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Values:");
      console.log("Full Name:", fullName);
      console.log("Email:", email);
      console.log("Contact:", contact);
      console.log("Message:", message);

      const templateParams = {
        name: fullName,
        email,
        contact,
        message,
      };

      emailjs
        .send(
          "service_m4yjyl9",
          "template_5alz4xy",
          templateParams,
          "M5o-kNv5SzysU5w7X"
        )
        .then(
          (response) => {
            console.log("Email Sent Successfully:", response);
            // alert("Message sent successfully!");
          },
          (error) => {
            console.error("Email Sending Error:", error);
            // alert("Failed to send the message. Please try again.");
          }
        );

      // Reset form
      setFullName("");
      setEmail("");
      setContact("");
      setMessage("");
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="z-20 p-6 md:p-20 lg:mt-40"
      style={{
        width: "90%",
        transformStyle: "preserve-3d",
        perspective: "1500px",
      }}
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl font-extrabold text-center text-black mb-6"
      >
        Get in Touch
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-center text-[#104438] text-sm md:text-base mb-8"
      >
        Have questions or feedback? Drop us a message below, and we’ll get back
        to you!
      </motion.p>
      <motion.form
        variants={containerVariants}
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            className="bg-white shadow-2xl rounded-lg"
            size="small"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            className="bg-white shadow-2xl rounded-lg"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            type="number"
            label="Contact Number"
            variant="outlined"
            className="bg-white shadow-2xl rounded-lg"
            size="small"
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            error={!!errors.contact}
            helperText={errors.contact}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            className="bg-white shadow-2xl rounded-lg"
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={!!errors.message}
            helperText={errors.message}
          />
        </motion.div>
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
            rotateX: 5,
            rotateY: 5,
          }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="submit"
            className="bg-[#104438] text-white font-bold rounded-lg lg:w-[30rem] w-[20.5rem] py-3"
          >
            Send Message
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

const ContactUs = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <section className="">
      <div className=" bg-gray-100 relative">
        {/* Background Section */}
        <div className="hidden lg:block">
          <PageHomeBanner
            title=""
            subtitle=""
            buttonText=""
            backgroundImage="/src/assets/Contact_Us_bannaer_1920x500.jpg"
            onButtonClick={() => alert("Button Clicked!")}
          />
        </div>
        <div className="block lg:hidden">
          <PageHomeBanner
            title=""
            subtitle=""
            buttonText=""
            backgroundImage="/src/assets/Contact_Mobile_Version_Banner.jpg"
            onButtonClick={() => alert("Button Clicked!")}
          />
        </div>

        {/* Overlapping Section */}
        <div className="relative -mt-1 z-20">
          <motion.div
            className="container mx-auto px-4 lg:px-8 py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Form Section */}
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <ContactUsForm />
              </motion.div>

              {/* Contact Details Section */}
              <motion.div
                className="p-8 rounded-3xl shadow-2xl w-full backdrop-blur-xl space-y-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  backgroundImage: 'url("/src/assets/ContactDetails.jpg")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  transform: "rotateY(5deg)",
                }}
              >
                <motion.h2
                  variants={sectionVariants}
                  className="text-2xl font-extrabold text-[#104438] text-center mb-4"
                >
                  Let’s Start a Project
                </motion.h2>
                <motion.p
                  variants={sectionVariants}
                  className="text-base text-black text-center mb-6 leading-relaxed"
                >
                  We’re here to bring your ideas to life. Whether you have a
                  clear vision or need expert guidance, our team is ready to
                  help. Feel free to give us a call or drop by anytime! We aim
                  to respond to all inquiries within 24 hours on business days.
                </motion.p>

                <ul className="space-y-4">
                  <motion.li variants={sectionVariants}>
                    <h4 className="font-semibold text-[#104438]">
                      OUR ADDRESS:
                    </h4>
                    <p className=" text-base text-black">
                      Kingsmen Realty | 7th floor, AWFIS Working Space |
                      Kirloskar Business Park | Hebbal Kempapura, Bengaluru,
                      Karnataka 560024.
                    </p>
                  </motion.li>
                  <motion.li variants={sectionVariants}>
                    <h4 className="font-semibold text-[#104438]">
                      OUR MAILBOX:
                    </h4>
                    <p className=" text-base text-black">
                      kingsmendecor@gmail.com
                    </p>
                  </motion.li>
                  <motion.li variants={sectionVariants}>
                    <h4 className="font-semibold text-[#104438]">
                      OUR contact:
                    </h4>
                    <p className=" text-base text-black">+91 7338639331</p>
                  </motion.li>
                </ul>

                <div className="flex space-x-4 mt-6 justify-center">
                  <div className="flex space-x-4">
                    <Link
                      to="https://www.facebook.com/kingsmendecors"
                      className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center border p-2"
                    >
                      <FaFacebookF />
                    </Link>
                    {/* <Link
                to="https://www.linkedin.com/company/kingsmen-real-estate/about/"
                className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
              >
                <FaLinkedinIn />
              </Link> */}
                    <Link
                      to="https://www.instagram.com/kingsmendecors/profilecard/?igsh=MWZzNHN2a2lwdG5zMg%3D%3D"
                      className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
                    >
                      <LuInstagram />
                    </Link>
                    <Link
                      to="https://www.youtube.com/channel/UCArwHcthzSA_hANHiqoQz9g"
                      className="text-white hover:bg-[#104438] rounded-full flex items-center justify-center  border p-2"
                    >
                      <FaYoutube />
                    </Link>
                  </div>
                </div>

                <div className="mt-8">
                  <motion.h3
                    variants={sectionVariants}
                    className="text-xl font-semibold text-white mb-4"
                  >
                    Our dedicated team is happy to:
                  </motion.h3>
                  <motion.p
                    variants={sectionVariants}
                    className="text-sm text-white leading-relaxed"
                  >
                    🟢 Answer your questions.
                    <br />
                    🟢 Discuss your project ideas.
                    <br />
                    🟢 Provide personalized solutions.
                    <br />
                    <br />
                    Let’s work together to create something amazing!
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
