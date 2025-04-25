export const useDateUtils = () => {
  const formatDate = (date, format = 'YYYY-MM-DD') => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  };

  return { formatDate };
};
