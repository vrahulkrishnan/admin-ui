export const getMappedProfileImage = (file: File) => {
  const formData = new FormData();
  if (file instanceof File) {
    formData.append('userImage', file);
  }
  return formData;
};
