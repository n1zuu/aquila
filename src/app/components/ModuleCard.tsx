import { BookOpen, Clock, Users, Play, Pause, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  size: string;
  category: string;
  downloads: number;
  status: "ready" | "broadcasting" | "scheduled";
}

interface ModuleCardProps {
  module: Module;
  onBroadcast: (id: string) => void;
  onStop: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ModuleCard({ module, onBroadcast, onStop, onEdit, onDelete }: ModuleCardProps) {
  const isBroadcasting = module.status === "broadcasting";

  return (
    <Card className={isBroadcasting ? "border-primary border-2 shadow-lg shadow-primary/20" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {module.title}
            </CardTitle>
            <CardDescription className="mt-2">{module.description}</CardDescription>
          </div>
          <Badge variant={module.status === "ready" ? "secondary" : "default"}>
            {module.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{module.duration} min</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{module.downloads} downloads</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Size: {module.size}</span>
            <Badge variant="outline">{module.category}</Badge>
          </div>

          <div className="flex gap-2 pt-2">
            {isBroadcasting ? (
              <Button onClick={() => onStop(module.id)} variant="destructive" className="flex-1">
                <Pause className="h-4 w-4 mr-2" />
                Stop Broadcast
              </Button>
            ) : (
              <Button onClick={() => onBroadcast(module.id)} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Broadcast
              </Button>
            )}
            <Button onClick={() => onEdit(module.id)} variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button onClick={() => onDelete(module.id)} variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}