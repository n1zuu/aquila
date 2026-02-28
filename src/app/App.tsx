import { useState } from "react";
import { Radio, Plus, Search, BookOpen } from "lucide-react";
import { BroadcastStatus } from "./components/BroadcastStatus";
import { ModuleCard, Module } from "./components/ModuleCard";
import { UploadModuleDialog } from "./components/UploadModuleDialog";
import { SDRSettings } from "./components/SDRSettings";
import { ScheduledBroadcasts, ScheduledBroadcast } from "./components/ScheduledBroadcasts";
import { StatsOverview } from "./components/StatsOverview";
import { StarfieldBackground } from "./components/StarfieldBackground";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // SDR Settings
  const [frequency, setFrequency] = useState("433.000");
  const [power, setPower] = useState(25);
  const [modulation, setModulation] = useState("FM");

  // Modules State
  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      title: "Introduction to Radio Waves",
      description: "Fundamental concepts of electromagnetic radiation and radio propagation",
      duration: 45,
      size: "128 MB",
      category: "Science",
      downloads: 1247,
      status: "ready",
    },
    {
      id: "2",
      title: "Digital Signal Processing Basics",
      description: "Learn the fundamentals of DSP for software-defined radio applications",
      duration: 60,
      size: "256 MB",
      category: "Technology",
      downloads: 892,
      status: "ready",
    },
    {
      id: "3",
      title: "Mathematics for Engineers",
      description: "Essential mathematical concepts for engineering students",
      duration: 90,
      size: "512 MB",
      category: "Mathematics",
      downloads: 2103,
      status: "broadcasting",
    },
    {
      id: "4",
      title: "Programming Fundamentals in Python",
      description: "Learn Python programming from scratch with practical examples",
      duration: 120,
      size: "384 MB",
      category: "Technology",
      downloads: 3456,
      status: "ready",
    },
  ]);

  // Scheduled Broadcasts State
  const [scheduledBroadcasts, setScheduledBroadcasts] = useState<ScheduledBroadcast[]>([
    {
      id: "s1",
      moduleTitle: "Introduction to Radio Waves",
      scheduledDate: "2026-03-01",
      scheduledTime: "14:00",
      duration: 45,
    },
    {
      id: "s2",
      moduleTitle: "Digital Signal Processing Basics",
      scheduledDate: "2026-03-02",
      scheduledTime: "10:00",
      duration: 60,
    },
  ]);

  // Broadcast state
  const activeBroadcast = modules.find((m) => m.status === "broadcasting");

  const handleBroadcast = (id: string) => {
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        status: m.id === id ? "broadcasting" : m.status === "broadcasting" ? "ready" : m.status,
      }))
    );
    const module = modules.find((m) => m.id === id);
    toast.success(`Broadcasting: ${module?.title}`);
  };

  const handleStopBroadcast = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "ready" as const } : m))
    );
    toast.info("Broadcast stopped");
  };

  const handleEditModule = (id: string) => {
    toast.info("Edit module feature coming soon");
  };

  const handleDeleteModule = (id: string) => {
    const module = modules.find((m) => m.id === id);
    if (module?.status === "broadcasting") {
      toast.error("Cannot delete a module that is currently broadcasting");
      return;
    }
    setModules((prev) => prev.filter((m) => m.id !== id));
    toast.success("Module deleted");
  };

  const handleUploadModule = (moduleData: {
    title: string;
    description: string;
    duration: number;
    category: string;
  }) => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: moduleData.title,
      description: moduleData.description,
      duration: moduleData.duration,
      size: "156 MB", // Mock size
      category: moduleData.category,
      downloads: 0,
      status: "ready",
    };
    setModules((prev) => [newModule, ...prev]);
    toast.success("Module uploaded successfully");
  };

  const handleDeleteScheduledBroadcast = (id: string) => {
    setScheduledBroadcasts((prev) => prev.filter((b) => b.id !== id));
    toast.success("Scheduled broadcast removed");
  };

  const filteredModules = modules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBroadcastTime = Math.floor(
    modules.reduce((acc, m) => acc + m.duration, 0) / 60
  );

  return (
    <div className="min-h-screen bg-background relative">
      <StarfieldBackground />
      <Toaster />
      
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center relative">
                <Radio className="h-6 w-6 text-primary-foreground" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Aquila
                </h1>
                <p className="text-sm text-muted-foreground">
                  SDR Broadcast Platform
                </p>
              </div>
            </div>
            <Button onClick={() => setUploadDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Module
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="space-y-6">
          {/* Stats Overview */}
          <StatsOverview
            totalModules={modules.length}
            activeBroadcasts={modules.filter((m) => m.status === "broadcasting").length}
            totalBroadcastTime={totalBroadcastTime}
            scheduledBroadcasts={scheduledBroadcasts.length}
          />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Broadcast Status & SDR Settings */}
            <div className="space-y-6">
              <BroadcastStatus
                isActive={!!activeBroadcast}
                frequency={frequency}
                power={power}
                activeModule={activeBroadcast?.title}
              />
              <SDRSettings
                frequency={frequency}
                onFrequencyChange={setFrequency}
                power={power}
                onPowerChange={setPower}
                modulation={modulation}
                onModulationChange={setModulation}
              />
            </div>

            {/* Middle & Right Columns - Modules and Scheduled Broadcasts */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="modules" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="modules">Learning Modules</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled Broadcasts</TabsTrigger>
                </TabsList>

                <TabsContent value="modules" className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search modules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Modules Grid */}
                  <div className="grid gap-4">
                    {filteredModules.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No modules found</p>
                      </div>
                    ) : (
                      filteredModules.map((module) => (
                        <ModuleCard
                          key={module.id}
                          module={module}
                          onBroadcast={handleBroadcast}
                          onStop={handleStopBroadcast}
                          onEdit={handleEditModule}
                          onDelete={handleDeleteModule}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="scheduled">
                  <ScheduledBroadcasts
                    broadcasts={scheduledBroadcasts}
                    onDelete={handleDeleteScheduledBroadcast}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Dialog */}
      <UploadModuleDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onSubmit={handleUploadModule}
      />
    </div>
  );
}

export default App;