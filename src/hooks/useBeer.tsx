import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { BeerCollection } from '../interfaces/Beers';

export const useBeer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [beers, setBeers] = useState<BeerCollection[]>([]);

  const getBeers = async () => {
    const resp = await firestore().collection('beers').orderBy('votes', 'desc').limit(50).get();
    const beersArray = resp.docs.map((beer) => beer.data());

    setBeers([...beersArray] as BeerCollection[]);
    setIsLoading(false);
  };

  useEffect(() => {
    getBeers();
  }, []);

  return {
    isLoading,
    beers,
    getBeers,
  };
};
