export const calculate_age = (date: Date) => {
  var diff_times = Date.now() - date.getTime();
  var date_diff = new Date(diff_times);

  return Math.abs(date_diff.getUTCFullYear() - 1970);
};