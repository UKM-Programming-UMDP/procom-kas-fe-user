import Dropzone from "@components/Dropzone";
import { Controller, useFormContext } from "react-hook-form";
import { KasSubmissionCreateModel } from "@api/kasSubmission/model";

const UploadImage = () => {
  const { control } = useFormContext<KasSubmissionCreateModel>();
  const { setValue, trigger } = useFormContext();

  const onDropFile = async (files: File[]) => {
    setValue("evidence", files);
    trigger();
  };

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
            onDropFile={onDropFile}
          />
        )}
      />
    </div>
  );
};

export default UploadImage;
