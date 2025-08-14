import { format } from 'date-fns';

const dateFormat = (date: Date | string, pattern: string = 'dd MMM, yyyy'): string => {
  const dateObject = new Date(date);
  const output = format(dateObject, pattern);
  return output;
};

export default dateFormat;
