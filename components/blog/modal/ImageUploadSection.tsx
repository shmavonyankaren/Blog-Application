import FileUploader from "../FIleUploader";

interface ImageUploadSectionProps {
  imageUrl: string | null;
  onImageChange: (url: string | null) => void;
}

export default function ImageUploadSection({
  imageUrl,
  onImageChange,
}: ImageUploadSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Cover Image
      </label>
      <FileUploader onFieldChange={onImageChange} imageUrl={imageUrl} />
      <input type="hidden" name="image" value={imageUrl || ""} />
    </div>
  );
}
