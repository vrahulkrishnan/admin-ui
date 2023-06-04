import { ServerFileType } from 'types';
import { ILocationResponse, LocationFormTypes } from './types';

export const getMappedLocationForm = (data: LocationFormTypes & { deletedImages?: ServerFileType[] }) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  if (data.mainImage instanceof File) {
    formData.append('mainImage', data.mainImage);
  }
  (data.galleryImages || []).forEach(item => {
    if (item instanceof File) {
      formData.append('galleryImages', item);
    }
  });
  if (data.deletedImages && data.deletedImages.length > 0) {
    formData.append(
      'deletedImages',
      JSON.stringify(data.deletedImages.map(it => ({ id: it.id, serverFileName: it.serverFileName })))
    );
  }
  return formData;
};

export const getMappedLocations = (data: ILocationResponse[]): LocationFormTypes[] => {
  return (data || []).map(item => getMappedLocation(item));
};

export const getMappedLocation = (data: ILocationResponse): LocationFormTypes => {
  const reducedImage = (data.images || []).reduce(
    (acc, it) => (it.isMainImage ? { ...acc, mainImage: it } : { ...acc, galleryImages: [...acc.galleryImages, it] }),
    {
      mainImage: {} as ServerFileType,
      galleryImages: []
    }
  );
  return {
    id: data?.id || '',
    name: data?.name || '',
    description: data?.description || '',
    mainImage: reducedImage.mainImage,
    galleryImages: reducedImage.galleryImages
  };
};
