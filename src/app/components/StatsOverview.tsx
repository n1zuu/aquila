import { Radio, BookOpen, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StatsOverviewProps {
  totalModules: number;
  activeBroadcasts: number;
  totalBroadcastTime: number;
  scheduledBroadcasts: number;
}

export function StatsOverview({
  totalModules,
  activeBroadcasts,
  totalBroadcastTime,
  scheduledBroadcasts,
}: StatsOverviewProps) {
  const stats = [
    {
      title: "Total Modules",
      value: totalModules,
      icon: BookOpen,
      description: "Available modules",
    },
    {
      title: "Active Broadcasts",
      value: activeBroadcasts,
      icon: Radio,
      description: "Currently broadcasting",
    },
    {
      title: "Total Broadcast Time",
      value: `${totalBroadcastTime}h`,
      icon: Clock,
      description: "This month",
    },
    {
      title: "Scheduled",
      value: scheduledBroadcasts,
      icon: TrendingUp,
      description: "Upcoming broadcasts",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
