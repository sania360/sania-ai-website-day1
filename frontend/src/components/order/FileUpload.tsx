import { useRef, useState } from "react";
import { HiUpload, HiX, HiDocument } from "react-icons/hi";

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function FileUpload({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onChange(dropped);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          dragActive ? "border-teal bg-teal/5" : "border-navy/20 dark:border-white/20"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3 text-navy dark:text-mist">
            <HiDocument className="text-2xl text-teal" />
            <span className="text-sm font-medium">{file.name}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="text-navy/50 dark:text-mist/50 hover:text-red-500"
            >
              <HiX />
            </button>
          </div>
        ) : (
          <>
            <HiUpload className="mx-auto text-3xl text-teal mb-2" />
            <p className="text-sm text-navy/70 dark:text-mist/70">
              Drag & drop a file here, or click to browse
            </p>
            <p className="text-xs text-navy/40 dark:text-mist/40 mt-1">Optional — briefs, sample data, etc.</p>
          </>
        )}
      </div>
    </div>
  );
}
