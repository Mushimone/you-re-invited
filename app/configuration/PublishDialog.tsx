import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { configurationService } from "@/lib/services/configurationService";
import React from "react";

interface PublishDialogProps {
  isOpen: boolean;
  onClose: () => void;
  configurationId: string;
}
export function PublishDialog(props: PublishDialogProps) {
  const [slug, setSlug] = React.useState("");
  const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);
  const [isChecking, setIsChecking] = React.useState(false);

  React.useEffect(() => {
    if (slug === "") {
      setIsAvailable(null);
      return;
    }

    const checkAvailability = async () => {
      setIsChecking(true);
      const result = await configurationService.checkSlugAvailability(slug);
      setIsAvailable(result);
      setIsChecking(false);
    };

    const timeoutId = setTimeout(() => {
      checkAvailability();
    }, 500); // Debounce by 500ms

    return () => clearTimeout(timeoutId);
  }, [slug]);

  const handleSlugChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSlug = event.target.value;
    setSlug(newSlug);
  };

  const handlePublish = async () => {
    const updatedConfiguration = {
      id: props.configurationId,
      slug: slug,
      published: true,
    };
    await configurationService.updateConfiguration(updatedConfiguration);
    props.onClose();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Your Configuration</DialogTitle>
          <DialogDescription>
            Choose a URL for your public invitation page
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>URL</Label>
            <Input
              type="text"
              value={slug}
              onChange={handleSlugChange}
              placeholder="my-event-2026"
            />
            {isChecking && <span>Checking...</span>}
            {isAvailable === true && (
              <span className="text-green-600">✓ Available!</span>
            )}
            {isAvailable === false && (
              <span className="text-red-600">✗ Already taken</span>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => props.onClose()}>
            Cancel
          </Button>
          <Button disabled={!isAvailable || isChecking} onClick={handlePublish}>
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
