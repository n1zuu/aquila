import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface UploadModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (module: {
    title: string;
    description: string;
    duration: number;
    category: string;
    file?: File;
  }) => void;
}

export function UploadModuleDialog({ open, onOpenChange, onSubmit }: UploadModuleDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      duration: parseInt(duration) || 0,
      category,
      file: file || undefined,
    });
    // Reset form
    setTitle("");
    setDescription("");
    setDuration("");
    setCategory("");
    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Learning Module</DialogTitle>
          <DialogDescription>
            Add a new learning module to broadcast via SDR
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Module Title</Label>
              <Input
                id="title"
                placeholder="Introduction to Radio Basics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the module content..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Language">Language</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Module File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="flex-1"
                  accept=".mp3,.mp4,.wav,.pdf,.zip"
                />
                {file && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: MP3, MP4, WAV, PDF, ZIP
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Upload className="h-4 w-4 mr-2" />
              Upload Module
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
