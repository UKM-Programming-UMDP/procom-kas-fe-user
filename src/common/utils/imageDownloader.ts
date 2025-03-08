export const getImageFilename = (url: string): string => {
  const urlParts = url.split("-");
  if (urlParts.length === 1) return urlParts[0];
  urlParts.shift();
  return urlParts.join("-");
};

export const downloadImage = async (url: string): Promise<void> => {
  const baseImageURL = import.meta.env.VITE_BACKEND_URL + "/v1/file/images/";

  const response = await fetch(baseImageURL + url);
  const blob = await response.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = getImageFilename(url);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
