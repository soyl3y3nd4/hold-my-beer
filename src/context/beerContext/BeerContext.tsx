import React, { createContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { BeerCollection } from '../../interfaces/Beers';

type BeerContextProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  beers: BeerCollection[] | [];
  getBeers: () => void;
  uploadBeer: (beer: BeerCollection) => Promise<boolean>;
  favouriteBeers: BeerCollection[] | [];
  getFavouriteBeers: (email: string) => void;
  toggleFavouriteBeer: (email: string, beer: BeerCollection) => void;
  rateBeer: (beer: BeerCollection, rate: number) => void;
};

const initialState = {
  isLoading: true,
  beers: [],
  favouriteBeers: [],
};

export const BeerContext = createContext(initialState as BeerContextProps);

export const BeerProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [beers, setBeers] = useState<BeerCollection[]>([]);
  const [favouriteBeers, setFavouriteBeers] = useState<BeerCollection[]>([]);

  const getBeers = async () => {
    setIsLoading(true);
    const resp = await firestore().collection('beers').orderBy('votes', 'desc').limit(50).get();
    const beersArray = resp.docs.map((beer) => beer.data());

    setBeers([...beersArray] as BeerCollection[]);
    setIsLoading(false);
  };

  const uploadBeer = async (newBeer: BeerCollection) => {
    const ref = await firestore().collection('beers');
    const beer = await ref.doc(newBeer.name).get();
    let isBeerUploaded = true;

    if (beer.data()) {
      isBeerUploaded = false;
    } else {
      ref.doc(newBeer.name).set(newBeer);
      setBeers([...beers, newBeer]);
    }

    return isBeerUploaded;
  };

  const getFavouriteBeers = async (email: string) => {
    setIsLoading(true);
    const ref = await firestore().collection('users');
    const userRef = await ref.doc(email).get();

    const favourites = userRef.data()?.favourites;
    setFavouriteBeers([...favourites]);
    setIsLoading(false);
  };

  const toggleFavouriteBeer = async (email: string, beer: BeerCollection) => {
    const ref = await firestore().collection('users');
    const userRef = await ref.doc(email).get();

    const favourites = userRef.data()?.favourites;
    const isFavorite = favourites?.some((favouriteBeer: BeerCollection) => favouriteBeer.name === beer.name);

    if (isFavorite) {
      const filteredFavourites = favourites?.filter((favouriteBeer: BeerCollection) => favouriteBeer.name !== beer.name);
      ref.doc(email).set({
        favourites: [...filteredFavourites],
      }, { merge: true });
      setFavouriteBeers([...filteredFavourites]);
    } else {
      ref.doc(email).set({
        favourites: [...favourites, beer]
      }, { merge: true });
      setFavouriteBeers([...favourites, beer]);
    }
  };

  const rateBeer = async (updatedBeer: BeerCollection, rate: number) => {
    const ref = await firestore().collection('beers');

    ref.doc(updatedBeer.name).set({
      ratings: [...updatedBeer.ratings]
    }, { merge: true });

    const beerss = beers.map((beer: BeerCollection) =>
      beer.name === updatedBeer.name
        ? updatedBeer
        : beer
    );

    setBeers([...beerss]);
  };

  return (
    <BeerContext.Provider value={{
      isLoading,
      setIsLoading,
      beers,
      getBeers,
      uploadBeer,
      favouriteBeers,
      getFavouriteBeers,
      toggleFavouriteBeer,
      rateBeer,
    }}>
      {children}
    </BeerContext.Provider>
  );
};