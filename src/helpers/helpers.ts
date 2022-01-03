import { BeerCollection, BeerRatings } from "../interfaces/Beers";

export const calculate_age = (date: Date) => {
  var diff_times = Date.now() - date.getTime();
  var date_diff = new Date(diff_times);

  return Math.abs(date_diff.getUTCFullYear() - 1970);
};

export const getBeerAverage = (beer: BeerCollection) => {
  let average = 0;

  if (beer.ratings.length === 0) return average;
  const addition = beer.ratings.reduce((a: number, b: BeerRatings) => a + b.rate, 0);

  return (addition === 0)
    ? average
    : addition / beer.ratings.length;
};

export const waitFor = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
