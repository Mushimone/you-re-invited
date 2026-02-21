"use client";
import { useController, useFormContext } from "react-hook-form";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface IProps {
  name: string;
  label: string;
}

export function GalleryInput({ name, label }: IProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control, defaultValue: [] });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // field.value is (File | string)[]
  const items: (File | string)[] = field.value ?? [];

  const getThumbUrl = (item: File | string) =>
    item instanceof File ? URL.createObjectURL(item) : item;

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    field.onChange([...items, ...newFiles]);
    // Reset input so the same file can be re-added if needed
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    field.onChange(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {items.map((item, i) => (
            <div key={i} className="relative w-20 h-20">
              <img
                src={getThumbUrl(item)}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleAdd}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
      >
        Add photos
      </Button>
    </div>
  );
}
