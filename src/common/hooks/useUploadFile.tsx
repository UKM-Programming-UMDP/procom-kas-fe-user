import FileServices from "@api/file/file";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";

const useUploadFile = () => {
  const fileService = new FileServices();
  const { trigger, setValue, getValues } = useFormContext();

  const handleUploadImage = async (file: File[]) => {
    const formData = new FormData();
    formData.append("file", file[0]);

    await fileService.post(formData, {
      onSuccess: (data) => {
        setValue("evidence", data.url_id);
        trigger("evidence");
        console.log(data.url_id);
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
      },
    });
    console.log(getValues("evidence"));
  };
  return {
    handleUploadImage,
  };
};
export default useUploadFile;
