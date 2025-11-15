"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { handleError } from "@/lib/utils";

type FileUploaderProps = {
  imageUrl: string | null;
  onFieldChange: (url: string) => void;
  setFiles?: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function FileUploader({
  imageUrl,
  onFieldChange,
}: FileUploaderProps) {
  const { startUpload } = useUploadThing("imageUploader");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl);
  const [isUploading, setIsUploading] = useState(false);

  // Update preview when imageUrl changes
  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  const uploadFile = useCallback(
    async (file: File) => {
      // Show preview immediately
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);
      setIsUploading(true);

      try {
        const uploaded = await startUpload([file]);

        if (uploaded?.[0]?.url) {
          // Replace local preview with uploaded URL
          URL.revokeObjectURL(localPreview);
          setPreviewUrl(uploaded[0].url);
          onFieldChange(uploaded[0].url);
        }
      } catch (error) {
        // Revert to original imageUrl on error
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(imageUrl);
        handleError(error);
      } finally {
        setIsUploading(false);
      }
    },
    [startUpload, onFieldChange, imageUrl]
  );

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) uploadFile(accepted[0]);
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const triggerFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  const manualSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center h-full min-h-[245px] w-full bg-gray-100 border border-gray-300 rounded-xl cursor-pointer overflow-hidden relative"
      onClick={triggerFileDialog}
    >
      {/* Hidden input for manual selection */}
      <input
        {...getInputProps()}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={manualSelect}
        className="hidden"
      />

      {previewUrl ? (
        <>
          <Image
            src={previewUrl}
            alt="Uploaded"
            width={300}
            height={200}
            className="w-full max-h-[245px]  object-contain"
            unoptimized={previewUrl.startsWith("blob:")}
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
                <span className="text-white text-sm">Uploading...</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center text-gray-600">
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            width={50}
            height={50}
          />
          <p className="mt-2 font-medium text-sm">Drag your image here</p>
          <p className="text-xs text-gray-500">JPG, PNG, SVG</p>

          <button
            type="button"
            className="mt-3 px-4 py-1.5 bg-gray-800 text-white rounded-full text-sm"
          >
            Choose from computer
          </button>
        </div>
      )}
    </div>
  );
}
