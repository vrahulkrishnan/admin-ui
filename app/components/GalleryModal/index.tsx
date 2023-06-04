import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';

import Image from '../Image';
import { GalleryModalProps } from './types';

const TRANSITION_DURATION = 200;
export default function GalleryModal({ onClose, opened, images, ...other }: GalleryModalProps) {
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      {...other}
      title="Gallery"
      transitionDuration={TRANSITION_DURATION}
    >
      <Carousel withIndicators loop height="100%" getEmblaApi={setEmbla}>
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            <Image src={image.imageUrl} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Modal>
  );
}
