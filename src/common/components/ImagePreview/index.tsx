import { Box } from "@mui/material";
import { useState } from "react";
import ImageViewer from "react-simple-image-viewer";

interface Props {
  imageUrl: string;
  isLocal: boolean;
}
const ImagePreview = (props: Props) => {
  const { imageUrl, isLocal } = props;
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const baseImageURL = import.meta.env.VITE_BACKEND_URL + "/v1/file/images/";

  return (
    <>
      <Box
        component="img"
        sx={{
          maxHeight: "6rem",
          cursor: "pointer",
          color: "gray",
        }}
        onClick={() => setIsViewerOpen(true)}
        alt={imageUrl}
        src={isLocal ? imageUrl : baseImageURL + imageUrl}
      />
      {isViewerOpen && (
        <ImageViewer
          src={[isLocal ? imageUrl : baseImageURL + imageUrl]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={() => setIsViewerOpen(false)}
          backgroundStyle={{
            backgroundColor: "rgba(100, 100, 100, 0.1)",
            backdropFilter: "blur(1px)",
          }}
        />
      )}
    </>
  );
};

export default ImagePreview;
