import { useEffect } from "react";
import { motion } from "framer-motion";
import { useKakaoLogin } from "../hooks/useKakaoLogin";
import useUserStore from "../stores/userStore";

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
    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-[2px]"
    whileHover={{ scale: 1.02 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20"
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
    <div className="relative rounded-2xl bg-white p-6 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <img
          src={user?.profile_image || "/api/placeholder/100/100"}
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.nickname || "게스트"}님
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            오늘도 좋은 하루 되세요!
          </p>
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
    className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <h3 className="mt-1 text-2xl font-bold">{value}</h3>
      </div>
      <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
        {icon}
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Section>
          <ProfileCard user={user} />
        </Section>

        <Section delay={0.2}>
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              나의 활동
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="총 게시물"
                value="24"
                icon={<span className="text-2xl">📝</span>}
                delay={0.3}
              />
              <StatCard
                title="받은 좋아요"
                value="128"
                icon={<span className="text-2xl">❤️</span>}
                delay={0.4}
              />
              <StatCard
                title="팔로워"
                value="56"
                icon={<span className="text-2xl">👥</span>}
                delay={0.5}
              />
              <StatCard
                title="방문 일수"
                value="15"
                icon={<span className="text-2xl">📅</span>}
                delay={0.6}
              />
            </div>
          </div>
        </Section>

        <Section delay={0.4}>
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              추천 콘텐츠
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="group relative aspect-video overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={`/api/placeholder/400/${400 + i}`}
                    alt={`Content ${i}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex items-end">
                    <h3 className="text-lg font-bold text-white">
                      추천 콘텐츠 {i}
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
