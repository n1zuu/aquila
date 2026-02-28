import { Settings, Radio, Zap, Waves } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface SDRSettingsProps {
  frequency: string;
  onFrequencyChange: (freq: string) => void;
  power: number;
  onPowerChange: (power: number) => void;
  modulation: string;
  onModulationChange: (mod: string) => void;
}

export function SDRSettings({
  frequency,
  onFrequencyChange,
  power,
  onPowerChange,
  modulation,
  onModulationChange,
}: SDRSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          SDR Configuration
        </CardTitle>
        <CardDescription>Configure your software-defined radio parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="frequency" className="flex items-center gap-2">
            <Radio className="h-4 w-4" />
            Frequency (MHz)
          </Label>
          <Input
            id="frequency"
            type="text"
            value={frequency}
            onChange={(e) => onFrequencyChange(e.target.value)}
            placeholder="433.000"
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Valid range: 70-6000 MHz
          </p>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Transmit Power: {power}W
          </Label>
          <Slider
            value={[power]}
            onValueChange={(value) => onPowerChange(value[0])}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Adjust based on your license and local regulations
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="modulation" className="flex items-center gap-2">
            <Waves className="h-4 w-4" />
            Modulation
          </Label>
          <Select value={modulation} onValueChange={onModulationChange}>
            <SelectTrigger id="modulation">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FM">FM (Frequency Modulation)</SelectItem>
              <SelectItem value="AM">AM (Amplitude Modulation)</SelectItem>
              <SelectItem value="USB">USB (Upper Sideband)</SelectItem>
              <SelectItem value="LSB">LSB (Lower Sideband)</SelectItem>
              <SelectItem value="OFDM">OFDM (Orthogonal Frequency Division)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
