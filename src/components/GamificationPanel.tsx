import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Award, Trophy, Star, Target, Flame } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const GamificationPanel = () => {
  const { streak, badges, historicalDebtsPaid, gardenBadges } = useApp();

  const earnedBadges = badges.filter(b => b.earned).length + gardenBadges.length;
  const totalBadges = badges.length + 8; // 8 garden badges possible

  const achievements = [
    {
      icon: Flame,
      title: "Racha de Pagos",
      value: `${streak.current} días`,
      description: streak.current >= 7 ? "¡Excelente constancia!" : "Sigue pagando a tiempo",
      color: "text-accent",
      bgColor: "bg-accent/20",
    },
    {
      icon: Trophy,
      title: "Deudas Conquistadas",
      value: historicalDebtsPaid.toString(),
      description: "Deudas pagadas en total",
      color: "text-growth",
      bgColor: "bg-growth/20",
    },
    {
      icon: Award,
      title: "Insignias",
      value: `${earnedBadges}/${totalBadges}`,
      description: "Colección de logros",
      color: "text-trust",
      bgColor: "bg-trust/20",
    },
  ];

  const milestones = [
    { target: 3, label: "3 pagos seguidos", reached: streak.current >= 3 },
    { target: 7, label: "1 semana de racha", reached: streak.current >= 7 },
    { target: 30, label: "1 mes de constancia", reached: streak.current >= 30 },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Logros y Rachas</h3>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {achievements.map((achievement, i) => {
          const Icon = achievement.icon;
          return (
            <div
              key={i}
              className="text-center p-3 rounded-lg bg-muted/30"
            >
              <div className={`p-2 rounded-full ${achievement.bgColor} inline-flex mb-2`}>
                <Icon className={`h-5 w-5 ${achievement.color}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{achievement.value}</p>
              <p className="text-xs text-muted-foreground">{achievement.title}</p>
            </div>
          );
        })}
      </div>

      {/* Streak Milestones */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground flex items-center gap-2">
          <Target className="h-4 w-4 text-accent" />
          Metas de Racha
        </p>
        {milestones.map((milestone, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              milestone.reached ? "bg-growth text-growth-foreground" : "bg-muted"
            }`}>
              {milestone.reached ? (
                <Zap className="h-3 w-3 text-white" />
              ) : (
                <span className="text-xs text-muted-foreground">{milestone.target}</span>
              )}
            </div>
            <span className={`text-sm ${
              milestone.reached ? "text-growth font-medium" : "text-muted-foreground"
            }`}>
              {milestone.label}
            </span>
            {milestone.reached && (
              <span className="text-xs text-growth ml-auto">✓ Logrado</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 italic">
        * Las recompensas son visuales y motivacionales. No hay descuentos ni beneficios reales.
      </p>
    </Card>
  );
};

export default GamificationPanel;
