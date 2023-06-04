import { mapAPIDropdown } from 'utils';
import { DropdownAPIOption, ServerFileType } from 'types';
import { ActivityFormTypes, IActivityResponse } from './types';

export const getMappedActivityForm = (data: ActivityFormTypes & { deletedImages?: ServerFileType[] }) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('restaurant', data.restaurant?.value);
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

export const getMappedActivities = (data: IActivityResponse[]): ActivityFormTypes[] => {
  return (data || []).map(item => getMappedActivity(item));
};

export const getMappedActivity = (data: IActivityResponse): ActivityFormTypes => {
  const reducedImage = (data.images || []).reduce(
    (acc, it) => (it.isMainImage ? { ...acc, mainImage: it } : { ...acc, galleryImages: [...acc.galleryImages, it] }),
    {
      mainImage: {} as ServerFileType,
      galleryImages: []
    }
  );
  return {
    id: data?.id || '',
    title: data?.title || '',
    restaurant: mapAPIDropdown(data?.restaurant),
    description: data?.description || '',
    mainImage: reducedImage.mainImage,
    galleryImages: reducedImage.galleryImages
  };
};

export const getMappedRestaurants = (data: DropdownAPIOption[]) => {
  return data.map(item => mapAPIDropdown(item));
};
