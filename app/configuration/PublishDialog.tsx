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
import { checkSlugAvailability } from "@/lib/configuration-actions";
import { configurationService } from "@/lib/services/configurationService";
import { Configuration } from "@/lib/types/configuration";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import React, { useRef } from "react";

interface PublishDialogProps {
  isOpen: boolean;
  onClose: () => void;
  configuration: Configuration;
  existingSlug?: string;
  initiallyPublished?: boolean;
  onPublished: () => void;
  openMode?: "edit" | "view";
}

export function PublishDialog(props: PublishDialogProps) {
  const [slug, setSlug] = React.useState(props.existingSlug || "");
  const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);
  const [isChecking, setIsChecking] = React.useState(false);
  const [isPublished, setIsPublished] = React.useState(
    props.openMode === "view",
  );
  const qrRef = useRef<HTMLCanvasElement>(null);

  const publicUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${slug}`;

  React.useEffect(() => {
    setIsPublished(props.openMode === "view");
  }, [props.openMode]);

  React.useEffect(() => {
    if (slug === "") {
      setIsAvailable(null);
      return;
    }

    const checkAvailability = async () => {
      setIsChecking(true);
      const result = await checkSlugAvailability(
        slug,
        props.configuration.user_id,
      );
      setIsAvailable(result);
      setIsChecking(false);
    };

    const timeoutId = setTimeout(() => {
      checkAvailability();
    }, 500); // Debounce by 500ms

    return () => clearTimeout(timeoutId);
  }, [slug]);

  const handleSlugChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSlug = event.target.value;
    setSlug(newSlug);
  };

  const handlePublish = async () => {
    await configurationService.updateConfiguration({
      id: props.configuration.id,
      slug,
      published: true,
    });
    setIsPublished(true);
    if (!props.initiallyPublished) {
      props.onPublished();
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${slug}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleClose = () => {
    setIsPublished(false);
    props.onClose();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            {isPublished ? "Published!" : "Publish Your Memorial"}
          </DialogTitle>
          <DialogDescription>
            {isPublished
              ? "Share the link or QR code below."
              : "Choose a URL for your public memorial page."}
          </DialogDescription>
        </DialogHeader>

        {!isPublished ? (
          <>
            <div className="space-y-4">
              <div>
                <Label>URL slug</Label>
                <Input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="john-smith-1942"
                />
                {isChecking && (
                  <span className="text-sm text-gray-500">Checking...</span>
                )}
                {isAvailable === true && (
                  <span className="text-sm text-green-600">✓ Available!</span>
                )}
                {isAvailable === false && (
                  <span className="text-sm text-red-600">✗ Already taken</span>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                disabled={!isAvailable || isChecking}
                onClick={handlePublish}
              >
                {props.initiallyPublished ? "Update URL" : "Publish"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Visible SVG for display */}
            <QRCodeSVG value={publicUrl} size={180} />

            {/* Hidden canvas for PNG download */}
            <QRCodeCanvas
              value={publicUrl}
              size={512}
              ref={qrRef}
              className="hidden"
            />

            {/* Copyable URL */}
            <div className="flex w-full gap-2">
              <Input readOnly value={publicUrl} className="text-sm" />
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(publicUrl)}
              >
                Copy
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={handleDownloadQR}
              className="w-full"
            >
              Download QR Code
            </Button>

            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
