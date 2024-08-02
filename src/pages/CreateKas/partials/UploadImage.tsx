import React, { useState } from "react";
import useUploadImage from "../hooks/useUploadImage";
import { Upload } from "@mui/icons-material";
import useCreateKasSubmission from "../hooks/useCreateKasSubmission";

const UploadImage = () => {
  const { uploadFile, uriId } = useUploadImage();
  const [file, setFile] = useState<File | null>(null);
  const baseImageURL = uriId
    ? new URL(
        `${import.meta.env.VITE_BACKEND_URL}/v1/file/images/${uriId}`,
      ).toString()
    : "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      await uploadFile(uploadedFile);
      setFile(uploadedFile);
    }
  };

  const { errors } = useCreateKasSubmission();

  return (
    <div className="mb-3 w-full">
      <label htmlFor="photo">Evidence</label>
      <input
        id="photo"
        name="photo"
        type="file"
        className="sr-only"
        onChange={handleFileChange}
      />

      <label htmlFor="photo">
        {file && uriId != "" ? (
          <div
            style={{
              backgroundImage: `url(${baseImageURL})`,
            }}
            className="min-h-80 w-full bg-contain bg-no-repeat bg-center mt-3 mb-3"
          ></div>
        ) : (
          <div className="mt-1 p-2 px-2 border-2 border-white-300 border-dashed rounded-md">
            <div className="w-full flex justify-center items-center gap-2 text-neutral-200 hover:text-neutral-100">
              <Upload />
              <div className="flex text-sm mt-auto mb-auto">
                Drag or select files to upload
              </div>
            </div>
          </div>
        )}
      </label>
      {errors?.fileUpload && (
        <div className="text-red-600 mt-1 mb-3">{errors.fileUpload}</div>
      )}
    </div>
  );
};

export default UploadImage;
