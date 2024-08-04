import UploadImage from "@api/upload/UploadImage";
import { UploadFileModel, UploadModel } from "@api/upload/model";
import { APIResponse } from "@types";
import { snackbar } from "@utils/snackbar";
import { useCreateKasContext } from "@pages/CreateKas/context/index";

const useUploadImage = () => {
  const { state, setState } = useCreateKasContext();
  const uploadService = new UploadImage();

  const uploadFile = async (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024;
    if (!validTypes.includes(file.type)) {
      snackbar.warning("Please upload a JPG, JPEG, or PNG file");
      return;
    }

    if (file.size > maxSize) {
      snackbar.warning("File is too large, max 2 MB");
      return;
    }

    const submission: UploadFileModel = {
      file: file,
    };

    try {
      const res: APIResponse<UploadModel> =
        await uploadService.post(submission);
      if (res?.status === true) {
        setState((prevState) => ({
          ...prevState,
          uriId: res?.data.url_id,
        }));
        snackbar.success(res?.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        snackbar.error(error?.message);
      } else {
        snackbar.error("An unexpected error occurred");
      }
    }
  };

  return { uploadFile, uriId: state.uriId };
};

export default useUploadImage;
