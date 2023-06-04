import { ImageProps as MantineImageProps } from '@mantine/core';
import { imageMapKeys } from '../../.images'; // .icons is an auto-generated folder

export interface ImageProps extends MantineImageProps {
  alt?: string;
  name?: imageMapKeys;
  className?: string;
  src?: string;
}

export interface ImageState {
  imageSrc: string;
}
