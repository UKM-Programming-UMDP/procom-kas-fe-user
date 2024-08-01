import UploadImage, {
  UploadImageRequest,
  UploadImageResponse,
} from "@services/UploadImage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { APIResponse } from "@types";
import { useCreateKasContext } from "@pages/CreateKas/context/index";

const MySwal = withReactContent(Swal);

const useUploadImage = () => {
  const { state, setState } = useCreateKasContext();
  const uploadService = new UploadImage();

  const uploadFile = async (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      MySwal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please upload a JPG, JPEG, or PNG file.",
      });
      return;
    }

    if (file.size > maxSize) {
      MySwal.fire({
        icon: "error",
        title: "Image size too large",
        text: "Please upload a file that is at most 5 MB in size.",
      });
      return;
    }

    const submission: UploadImageRequest = {
      file: file,
    };

    try {
      const res: APIResponse<UploadImageResponse> =
        await uploadService.post(submission);
      if (res?.status === true) {
        console.log(res?.data.url_id);
        setState((prevState) => ({
          ...prevState,
          uriId: res?.data.url_id,
        }));
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "File uploaded successfully.",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "File upload failed. Please try again.",
        });
      }
    } catch (err: unknown) {
      const error = err as APIResponse;
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error?.message,
      });
    } finally {
      MySwal.fire({
        icon: "info",
        title: "Upload Attempted",
        text: "File upload process has completed.",
      });
    }
  };
  return { uploadFile, uriId: state.uriId };
};
export default useUploadImage;
