import range from 'lodash/range';

export const getRange = (start = 0, end: number) => range(start, end + 1);

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const clickToDownload = (url: string, fileName: string) => {
  const aTag = document.createElement('a');
  aTag.href = url;
  aTag.download = fileName;
  document.body.appendChild(aTag);
  aTag.click();
  document.body.removeChild(aTag);
};

export function setFocus(refs: { [key: string]: React.RefObject<any> }, name: string) {
  if (refs[name] && refs[name].current) {
    refs[name].current.focus();
  }
}
