import React, { useState } from "react";
import { Upload } from "@mui/icons-material";
import useCreateKasSubmission from "../Create/hooks/useCreateKasSubmission";
import { Controller, useFormContext } from "react-hook-form";

const UploadImage = () => {
  const { handleFile } = useCreateKasSubmission();
  const [file, setFile] = useState<File | null>(null);
  const { control, getValues } = useFormContext();
  const urlId = getValues("evidence");
  const baseImageURL = urlId
    ? new URL(
        `${import.meta.env.VITE_BACKEND_URL}/v1/file/images/${urlId}`,
      ).toString()
    : "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      await handleFile(uploadedFile);
      setFile(uploadedFile);
    }
  };

  return (
    <div className="mb-3 w-full">
      <label htmlFor="photo">Evidence</label>
      <label htmlFor="photo">
        {file && urlId != "" ? (
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
      <input
        id="photo"
        type="file"
        className="sr-only"
        onChange={handleFileChange}
      />
      <Controller
        name="evidence"
        control={control}
        defaultValue={""}
        render={({ fieldState }) => (
          <div className="text-red-500 text-sm mt-1">
            {fieldState.error?.message}
          </div>
        )}
      />
    </div>
  );
};

export default UploadImage;
