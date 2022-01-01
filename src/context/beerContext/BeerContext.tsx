import React, { createContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { BeerCollection } from '../../interfaces/Beers';

type BeerContextProps = {
  isLoading: boolean;
  beers: BeerCollection[] | [];
  getBeers: () => void;
  uploadBeer: (beer: BeerCollection) => Promise<boolean>;
};

const initialState = {
  isLoading: true,
  beers: [],
};

export const BeerContext = createContext(initialState as BeerContextProps);

export const BeerProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [beers, setBeers] = useState<BeerCollection[]>([]);

  const getBeers = async () => {
    setIsLoading(true);
    const resp = await firestore().collection('beers').orderBy('votes', 'desc').limit(50).get();
    const beersArray = resp.docs.map((beer) => beer.data());

    setBeers([...beersArray] as BeerCollection[]);
    setIsLoading(false);
  };

  const uploadBeer = async (newBeer: BeerCollection) => {
    setIsLoading(true);
    const ref = await firestore().collection('beers');
    const beer = await ref.doc(newBeer.name).get();
    let isBeerUploaded = true;

    if (beer.data()) {
      isBeerUploaded = false;
    } else {
      ref.doc(newBeer.name).set(newBeer);
      setBeers([...beers, newBeer]);
    }

    setIsLoading(false);
    return isBeerUploaded;
  };

  return (
    <BeerContext.Provider value={{
      isLoading,
      beers,
      getBeers,
      uploadBeer
    }}>
      {children}
    </BeerContext.Provider>
  );
};