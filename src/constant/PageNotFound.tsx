import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Page transition variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
};

const PageNotFound: React.FC = () => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 px-6 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center space-y-6">
        {/* Image */}
        <motion.img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmBmf8s4gE1BRHzyJraZUofVuQA1KY_coiw&s" // Replace this with your asset or use an online link
          alt="Page Not Found"
          className="mx-auto w-72 sm:w-96"
          variants={imageVariants}
        />

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Oops! Page not found.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-gray-600 text-lg max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved. Let’s get you back to shopping!
        </motion.p>

        {/* Go Home Button */}
        <motion.div variants={buttonVariants}>
          <Link
            to="/"
            className="inline-block px-6 py-3 mt-4 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg shadow-lg"
          >
            Go to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PageNotFound;
