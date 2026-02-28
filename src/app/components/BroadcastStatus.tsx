import { Radio, Signal, Activity, Wifi } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface BroadcastStatusProps {
  isActive: boolean;
  frequency: string;
  power: number;
  activeModule?: string;
}

export function BroadcastStatus({ isActive, frequency, power, activeModule }: BroadcastStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5" />
          Broadcast Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Status</span>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Broadcasting" : "Idle"}
          </Badge>
        </div>

        {isActive && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <Signal className="h-4 w-4" />
                Frequency
              </span>
              <span className="font-mono text-sm">{frequency} MHz</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Transmit Power
              </span>
              <span className="font-mono text-sm">{power}W</span>
            </div>

            {activeModule && (
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  Active Module
                </span>
                <span className="text-sm truncate max-w-[150px]">{activeModule}</span>
              </div>
            )}

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
                <span className="text-xs text-muted-foreground">Live broadcast in progress</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}