import { DropdownAPIOption, ServerFileType } from 'types';
import { mapAPIDropdown } from 'utils';
import { IRestaurantResponse, RestaurantFormTypes } from './types';

export const getMappedRestaurantForm = (data: RestaurantFormTypes & { deletedImages?: ServerFileType[] }) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('location', data.location?.value);
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

export const getMappedRestaurants = (data: IRestaurantResponse[]): RestaurantFormTypes[] => {
  return (data || []).map(item => getMappedRestaurant(item));
};

export const getMappedRestaurant = (data: IRestaurantResponse): RestaurantFormTypes => {
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
    location: mapAPIDropdown(data?.location),
    description: data?.description || '',
    mainImage: reducedImage.mainImage,
    galleryImages: reducedImage.galleryImages
  };
};

export const getMappedLocations = (data: DropdownAPIOption[]) => {
  return data.map(item => mapAPIDropdown(item));
};
