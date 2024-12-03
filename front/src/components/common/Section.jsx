import { motion } from "framer-motion";

const Section = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="w-full"
  >
    {children}
  </motion.div>
);

export default Section;
