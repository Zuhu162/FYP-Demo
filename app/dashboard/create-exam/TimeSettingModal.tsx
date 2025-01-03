import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TimeSettingModalProps {
  isOpen: boolean
  onClose: () => void
  duration: number
  onSave: (duration: number) => void
}

export default function TimeSettingModal({ isOpen, onClose, duration, onSave }: TimeSettingModalProps) {
  const [hours, setHours] = useState(Math.floor(duration / 60))
  const [minutes, setMinutes] = useState(duration % 60)

  const handleSave = () => {
    const totalMinutes = hours * 60 + minutes
    onSave(totalMinutes)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Exam Duration</DialogTitle>
          <DialogDescription>
            Set the duration for the exam in hours and minutes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value)))}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value))))}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

