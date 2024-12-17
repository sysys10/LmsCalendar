import { motion } from "framer-motion";

const ProfileCard = ({ user }) => (
  <motion.div
    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-4"
    whileHover={{ scale: 1.02 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20"
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
    <div className="relative rounded-2xl bg-background p-6">
      <div className="flex items-center gap-4">
        <img
          src={
            user?.profile_image ||
            "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg"
          }
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-copy-primary">
            {user?.nickname || "게스트"}님
          </h2>
          <p className="text-copy-secondary">오늘도 좋은 하루 되세요!</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default ProfileCard;
