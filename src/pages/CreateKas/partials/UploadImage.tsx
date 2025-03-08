import Dropzone from "@components/Dropzone";
import { Controller, useFormContext } from "react-hook-form";
import { KasSubmissionCreateModel } from "@api/kasSubmission/model";

const UploadImage = () => {
  const { control } = useFormContext<KasSubmissionCreateModel>();

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
          />
        )}
      />
    </div>
  );
};

export default UploadImage;
