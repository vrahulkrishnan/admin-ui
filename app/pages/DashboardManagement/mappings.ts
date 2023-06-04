import { DateTime } from 'luxon';

export const getMappedDasboardData = ({ userRegData, ...data }) => {
  return {
    userRegData: (userRegData || []).map(item => ({
      x: DateTime.fromJSDate(new Date(item.x)).toFormat('yyyy-mm-dd'),
      y: item.y
    })),
    ...data
  };
};
