import { motion } from "framer-motion";
const StatCard = ({ title, value, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="rounded-xl bg-card p-6 shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-copy-secondary">{title}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
      <div className="rounded-full bg-cta/20 p-3">{icon}</div>
    </div>
  </motion.div>
);

export default StatCard;
