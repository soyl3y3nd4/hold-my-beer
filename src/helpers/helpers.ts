import { BeerCollection, BeerRatings } from "../interfaces/Beers";

export const calculate_age = (date: Date) => {
  var diff_times = Date.now() - date.getTime();
  var date_diff = new Date(diff_times);

  return Math.abs(date_diff.getUTCFullYear() - 1970);
};

export const getBeerAverage = (beer: BeerCollection) => {
  let average = 0;

  if (beer?.ratings?.length === 0) return average;
  const addition = beer.ratings.reduce((a: number, b: BeerRatings) => a + b.rate, 0);

  return (addition === 0)
    ? average
    : addition / beer?.ratings?.length;
};

export const waitFor = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const orderBeersByRating = (beers: BeerCollection[]) => {
  return beers.sort((a: BeerCollection, b: BeerCollection) => {
    return getBeerAverage(b) - getBeerAverage(a);
  });
}

export const orderBeersByVotes = (beers: BeerCollection[]) => {
  return beers.sort((a: BeerCollection, b: BeerCollection) => {
    return b.votes - a.votes;
  });
}

export const orderBeersByDate = (beers: BeerCollection[]) => {
  return beers.sort((a: BeerCollection, b: BeerCollection) => {
    return new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime();
  });
}
