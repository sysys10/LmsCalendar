import { motion } from "framer-motion";
import useUserStore from "../stores/userStore";
import { RECOMMENDED_CONTENT, USER_STATS } from "../constants/home";
import StatCard from "@/components/home/StatCard";
import ProfileCard from "@/components/home/ProfileCard";
import Section from "@/components/common/Section";

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
                    <div className="text-lg font-bold text-white">
                      <p>{content.title}</p>
                    </div>
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
