import { Check, Download } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { downloadImage } from "@utils/imageDownloader";
import { useState } from "react";

interface Props {
  className?: string;
  url: string;
}
function DownloadButton(props: Props): JSX.Element {
  const { className, url } = props;
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");

  const handleDownload = async () => {
    if (downloadState !== "idle") return;

    setDownloadState("loading");
    await downloadImage(url);

    setTimeout(() => {
      setDownloadState("idle");
    }, 2000);
  };

  return (
    <button className={className} onClick={handleDownload}>
      {downloadState === "idle" ? (
        <Download style={{ fontSize: "1rem", color: "gray" }} />
      ) : downloadState === "loading" ? (
        <CircularProgress
          size={10}
          style={{
            color: "gray"
          }}
        />
      ) : (
        <Check style={{ fontSize: "1rem", color: "gray" }} />
      )}
    </button>
  );
}

type DownloadState = "idle" | "loading";

export default DownloadButton;
