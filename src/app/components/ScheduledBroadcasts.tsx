import { Calendar, Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface ScheduledBroadcast {
  id: string;
  moduleTitle: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
}

interface ScheduledBroadcastsProps {
  broadcasts: ScheduledBroadcast[];
  onDelete: (id: string) => void;
}

export function ScheduledBroadcasts({ broadcasts, onDelete }: ScheduledBroadcastsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Scheduled Broadcasts
        </CardTitle>
        <CardDescription>Upcoming automatic broadcasts</CardDescription>
      </CardHeader>
      <CardContent>
        {broadcasts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No scheduled broadcasts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {broadcasts.map((broadcast) => (
              <div
                key={broadcast.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{broadcast.moduleTitle}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {broadcast.scheduledDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {broadcast.scheduledTime}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {broadcast.duration} min
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(broadcast.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
