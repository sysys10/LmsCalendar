import StatCard from "../components/home/StatCard";
import { USER_STATS } from "../constants/home";

export default function Lme() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col p-2">
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
        <div className="bg-blue-100 flex-1">
          위에 카드들 누르면 어떤 영상 봤고 그런거 보여주는 거
        </div>
      </div>

      <div className="min-w-96 border-l border-l-border">대충 캐릭터 사진</div>
    </div>
  );
}
