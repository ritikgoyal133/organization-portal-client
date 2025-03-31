// src/utils/imageUtils.js
import imageCompression from "browser-image-compression";

/**
 * Compress image to be less than 1MB
 * @param {File} file - Original image file
 * @returns {Promise<File | null>} - Compressed file or null if failed
 */
export const compressImage = async (file) => {
  if (!file) return null;

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, JPEG, and PNG images are allowed.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File is too large! Maximum 10MB allowed.");
  }

  try {
    const options = {
      maxSizeMB: 1, // Compress to ~1MB
      maxWidthOrHeight: 1024, // Resize if needed
      useWebWorker: true, // Avoid blocking UI
    };

    const compressedBlob = await imageCompression(file, options);
    console.log("Compressed File:", compressedBlob.size, compressedBlob.type);

    //Convert Blob back to File (Fixes 'blob image/png' issue)
    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });

    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error("Failed to compress image. Try again.");
  }
};
