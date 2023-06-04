import React from 'react';
import { useForm } from '@mantine/form';
import { useShallowEffect } from '@mantine/hooks';

import {
  Grid,
  GridCol,
  TextInput,
  Select,
  Textarea,
  SingleFileInput,
  MultipleFileInput,
  GroupButton
} from 'components';
import { dropDown } from 'config';
import { ServerFileType } from 'types';

import { ActivityFormTypes } from '../../types';
import messages from './messages';
import { ActivityFormProps } from './types';

const ActivityForm = ({ onView, onSubmit, isEdit, data, restaurants }: ActivityFormProps) => {
  const form = useForm<ActivityFormTypes>({
    initialValues: {
      title: '',
      restaurant: dropDown,
      description: '',
      mainImage: null,
      galleryImages: []
    },
    validate: {
      title: value => (!value.length ? messages.error.title : null),
      restaurant: value => (!value.value ? messages.error.restaurant : null),
      description: value => (!value.length ? messages.error.description : null),
      mainImage: value => (!value ? messages.error.mainImage : null)
    }
  });

  const [deletedImages, setDeletedImages] = React.useState<ServerFileType[]>([]);

  useShallowEffect(() => {
    if (isEdit) {
      form.setValues({ ...data });
    }
  }, [isEdit, data]);

  const handleSubmit = () => {
    onSubmit(form.values, deletedImages);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Grid>
        <GridCol span={6}>
          <TextInput
            size="md"
            placeholder={messages.label.title}
            radius="xl"
            required
            styles={() => ({ input: { backgroundColor: '#f5f5f5', boxShadow: 'none', padding: '0 2rem' } })}
            {...form.getInputProps('title')}
          />
        </GridCol>
        <GridCol span={6}>
          <Select
            size="md"
            placeholder={messages.label.restaurant}
            radius="xl"
            required
            data={restaurants}
            styles={() => ({ input: { backgroundColor: '#f5f5f5', boxShadow: 'none', padding: '0 2rem' } })}
            {...form.getInputProps('restaurant')}
            value={form.values.restaurant?.value}
            onChange={(val: string) => {
              const selected = restaurants.find(it => String(it.value) === String(val));
              if (selected) {
                form.setFieldValue('restaurant', selected);
              }
            }}
          />
        </GridCol>
        <GridCol span={12}>
          <Textarea
            size="md"
            placeholder={messages.label.description}
            radius="xl"
            required
            minRows={8}
            styles={() => ({
              input: { backgroundColor: '#f5f5f5', boxShadow: 'none', padding: '1rem 2rem !important' }
            })}
            {...form.getInputProps('description')}
          />
        </GridCol>
        <GridCol span={12}>
          <SingleFileInput
            label={messages.label.mainImage}
            icon="attachment"
            onClose={(item: ServerFileType | null) => {
              if (item) {
                setDeletedImages([...deletedImages, item]);
              }
              form.setFieldValue('mainImage', null);
            }}
            {...form.getInputProps('mainImage')}
          />
        </GridCol>
        <GridCol span={12}>
          <MultipleFileInput
            label={messages.label.galleryImages}
            icon="attachment"
            onChange={(files: File[]) => {
              form.setFieldValue('galleryImages', [...form.values.galleryImages, ...files]);
            }}
            value={form.values.galleryImages}
            onClose={(item: File | ServerFileType) => {
              if (!(item instanceof File)) {
                setDeletedImages([...deletedImages, item]);
                const filterFiles = form.values.galleryImages.filter((it: ServerFileType) => it.id !== item.id);
                form.setFieldValue('galleryImages', filterFiles);
              } else {
                const filterFiles = form.values.galleryImages.filter((it: File) => it.name !== item.name);
                form.setFieldValue('galleryImages', filterFiles);
              }
            }}
          />
        </GridCol>
        <GridCol span={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GroupButton
            left={{
              label: 'View All',
              onClick: onView
            }}
            right={{
              label: 'Submit',
              type: 'submit'
            }}
          />
        </GridCol>
      </Grid>
    </form>
  );
};

export default ActivityForm;
