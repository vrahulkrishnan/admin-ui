import * as React from 'react';
import { Image as MantineImage } from '@mantine/core';

import { imageMap, imageMapKeys } from '../../.images'; // .icons is an auto-generated folder

import { ImageProps, ImageState } from './types';

export default class Image extends React.Component<ImageProps, ImageState> {
  constructor(props: ImageProps) {
    super(props);
    this.state = {
      imageSrc: ''
    };
  }

  public setImageSrcFromName = (name: imageMapKeys) => {
    if (typeof imageMap[name] === 'function') {
      const src = imageMap[name]();

      this.setState({ imageSrc: src.default || src });
    } else {
      // eslint-disable-next-line no-console
      console.error(new Error(`Invalid image name: ${name}`));
    }
  };

  public componentDidMount() {
    if (!this.props.src && this.props.name) this.setImageSrcFromName(this.props.name);
  }

  public componentDidUpdate({ name: prevName }: ImageProps) {
    const { name: currName, src = '' } = this.props;
    if (currName && !src && currName !== prevName) {
      this.setImageSrcFromName(currName);
    }
  }

  public render() {
    const { className, name, alt = name, src, ...other } = this.props;
    const { imageSrc } = this.state;

    return <MantineImage src={src || imageSrc} alt={alt} {...other} className={className} />;
  }
}
