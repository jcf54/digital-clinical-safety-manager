const dateToHtmlInput = (date: Date | null | undefined): Date | null => {
  if (!date) return null;
  const year = date.getFullYear();
  // month needs to be padded with a 0 if it's less than 10
  // the month needs to be incremented by 1 because it's 0-indexed
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  // day needs to be padded with a 0 if it's less than 10
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}` as unknown as Date;
};

export default dateToHtmlInput;
