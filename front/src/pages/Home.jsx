import { useEffect } from "react";
import { motion } from "framer-motion";
import { useKakaoLogin } from "../hooks/useKakaoLogin";
import useUserStore from "../stores/userStore";
import { RECOMMENDED_CONTENT, USER_STATS } from "../constants/home";

// 재사용 가능한 섹션 컴포넌트
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

// 프로필 카드 컴포넌트
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
          src={user?.profile_image || "/api/placeholder/100/100"}
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

// 통계 카드 컴포넌트
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
        <h3 className="mt-1 text-2xl font-bold">{value}</h3>
      </div>
      <div className="rounded-full bg-cta/20 p-3">{icon}</div>
    </div>
  </motion.div>
);

export default function Home() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Section>
          <ProfileCard user={user} />
        </Section>

        <Section delay={0.2}>
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-copy-primary/70">
              나의 활동
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {USER_STATS.map((stat, index) => (
                <StatCard
                  key={stat.key}
                  title={stat.title}
                  value={stat.value}
                  icon={<span className="text-2xl">{stat.icon}</span>}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </Section>
        <Section delay={0.4}>
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-copy-primary/70">
              todos
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RECOMMENDED_CONTENT.map((content) => (
                <motion.div
                  key={content.id}
                  className="group relative aspect-video overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
                  whileHover={{ scale: 1.02 }}
                >
                  <img src={"/"} alt={content.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex items-end">
                    <h3 className="text-lg font-bold text-white">
                      <h3>{content.title}</h3>
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
