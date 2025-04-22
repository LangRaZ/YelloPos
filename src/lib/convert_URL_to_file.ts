export async function convertURLToFile(url: string) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = url.split("/").pop() || "product-image";
        const file = new File([blob], filename, { type: blob.type });

        return file
      } catch (error) {
        console.error("Error converting URL to file:", error);
      }
}

export async function convertURLToFileBusiness(url: string) {
  try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split("/").pop() || "profile_image_url";
      const file = new File([blob], filename, { type: blob.type });

      return file
    } catch (error) {
      console.error("Error converting URL to file:", error);
    }
}

export async function convertURLToFileQR(url: string) {
  try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split("/").pop() || "qr_image_url";
      const file = new File([blob], filename, { type: blob.type });

      return file
    } catch (error) {
      console.error("Error converting URL to file:", error);
    }
}