import Dropzone from "@components/Dropzone";
import { Controller, useFormContext } from "react-hook-form";
import useCreateKasSubmission from "../Create/hooks/useCreateKasSubmission";
import { KasSubmissionCreateModel } from "@api/kasSubmission/model";

const UploadImage = () => {
  const { control } = useFormContext<KasSubmissionCreateModel>();
  const { handleChangeFile } = useCreateKasSubmission();

  return (
    <div className="mb-3 w-full">
      <label htmlFor="photo">Evidence</label>
      <Controller
        name="evidence"
        control={control}
        render={({ fieldState }) => (
          <Dropzone
            acceptTypeFile={["jpg", "png"]}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            onChangeFile={handleChangeFile}
          />
        )}
      />
    </div>
  );
};

export default UploadImage;
