import { useState } from "react";
import UploadImage, {
  UploadImageRequest,
  UploadImageResponse,
} from "@services/UploadImage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { APIResponse } from "@types";

const MySwal = withReactContent(Swal);

const useUploadImage = () => {
  const [uriId, setUriId] = useState<string>("");
  const uploadService = new UploadImage();

  const uploadFile = async (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // max 5 MB

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
        await uploadService.upload(submission);
      if (res?.status === true) {
        console.log(res?.data.url_id);
        setUriId(res?.data.url_id);
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
    } catch (err: any) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during the file upload.",
      });
    } finally {
      MySwal.fire({
        icon: "info",
        title: "Upload Attempted",
        text: "File upload process has completed.",
      });
    }
  };

  return { uploadFile, uriId };
};

export default useUploadImage;
