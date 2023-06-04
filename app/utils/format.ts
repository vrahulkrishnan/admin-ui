import { dropDown } from 'config';
import { DropdownAPIOption, DropdownOption } from 'types';

export const formatStateObject = (obj: any, keyString = '', v: any) => {
  const keys = keyString.split('.');
  if (keys.length === 1) {
    obj = {
      ...obj,
      [keys[0]]: v
    };
  } else {
    const key = keys.shift();
    if (key) {
      obj = {
        ...obj,
        [key]: formatStateObject(typeof obj[key] === 'undefined' ? {} : obj[key], keys.join('.'), v)
      };
    }
  }

  return obj;
};

export const formatBreadcrumbUrl = (item: string) => {
  return location.pathname.split(item)[0] + item;
};

export const formatExperience = (data: number) => {
  const years = Math.floor(data / 12);
  const months = data % 12;
  return !years && !months
    ? 'Fresher'
    : `${!months ? `${years}` : `${years}.${months}`} ${!months && years === 1 ? 'year' : 'years'}`;
};

export const formatISOtoDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toDateString().replace(/^\S+\s/, '');
};

export const roundTimeUpto = (step: number, currentTime = new Date()) => {
  const timeSteps = 1000 * 60 * step;
  const roundedTime = new Date(Math.ceil(currentTime.getTime() / timeSteps) * timeSteps);
  return roundedTime;
};

export const formatTime = time =>
  `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;

export const mapAPIDropdown = (data?: DropdownAPIOption): DropdownOption =>
  data ? { label: data.name, value: String(data.id) } : dropDown;
