import React, { createContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { BeerCollection } from '../../interfaces/Beers';
import { Asset } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

type BeerContextProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  beers: BeerCollection[] | [];
  getBeers: () => void;
  uploadBeer: (beer: BeerCollection) => Promise<boolean>;
  uploadImageBeer: (image: Asset) => Promise<string>;
  favouriteBeers: BeerCollection[] | [];
  getFavouriteBeers: (email: string) => void;
  toggleFavouriteBeer: (email: string, beer: BeerCollection) => void;
  userNewBeers: BeerCollection[] | [];
  getUserNewBeers: (email: string) => void;
  rateBeer: (beer: BeerCollection) => void;
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
  const [userNewBeers, setUserNewBeers] = useState<BeerCollection[]>([]);

  const getBeers = async () => {
    setIsLoading(true);
    try {
      const resp = await firestore().collection('beers').orderBy('votes', 'desc').limit(50).get();
      const beersArray = resp.docs.map((beer) => beer.data());

      setBeers([...beersArray] as BeerCollection[]);
    } catch (error) {
      console.warn(error);
    }
    setIsLoading(false);
  };

  const uploadBeer = async (newBeer: BeerCollection) => {
    try {
      const ref = await firestore().collection('beers');
      const beer = await ref.doc(newBeer.name).get();
      let isBeerUploaded = true;

      if (beer.data()) {
        isBeerUploaded = false;
      } else {
        ref.doc(newBeer.name).set(newBeer);
        addUserNewBeer(newBeer);
        setBeers([...beers, newBeer]);
      }

      return isBeerUploaded;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  const uploadImageBeer = async (file: Asset): Promise<string> => {
    try {
      const fileToUpload = {
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      };

      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append("cloud_name", "dlpvgah6w");
      formData.append("upload_preset", "hold_my_beer");

      const resp = await fetch("https://api.cloudinary.com/v1_1/dlpvgah6w/image/upload", {
        method: "post",
        body: formData
      });

      const data = await resp.json();
      return data.secure_url;
    } catch (error) {
      console.warn(error);
      return '';
    }
  };

  const addUserNewBeer = async (beer: BeerCollection) => {
    try {
      const email = auth().currentUser?.email;
      if (!email) return;

      const ref = await firestore().collection('users');
      const userBeers = await (await ref.doc(email).get()).data()?.new_beers || [];

      ref.doc(email).set(
        {
          new_beers: [...userBeers, beer],
        }, { merge: true }
      );

    } catch (error) {
      console.warn(error);
    }
  };

  const getUserNewBeers = async (email: string) => {
    setIsLoading(true);
    try {
      const userRef = await firestore().collection('users').doc(email).get();

      const newBeers = userRef.data()?.new_beers;
      setUserNewBeers([...newBeers]);
    } catch (error) {
      console.warn(error);
    }
    setIsLoading(false);
  };

  const getFavouriteBeers = async (email: string) => {
    setIsLoading(true);
    try {
      const userRef = await firestore().collection('users').doc(email).get();

      const favourites = userRef.data()?.favourites;
      setFavouriteBeers([...favourites]);
    } catch (error) {
      console.warn(error);
    }
    setIsLoading(false);
  };

  const toggleFavouriteBeer = async (email: string, beer: BeerCollection) => {
    try {
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
    } catch (error) {
      console.warn(error);
    }
  };

  const rateBeer = async (updatedBeer: BeerCollection) => {
    try {
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
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <BeerContext.Provider value={{
      isLoading,
      setIsLoading,
      beers,
      getBeers,
      uploadBeer,
      uploadImageBeer,
      favouriteBeers,
      getFavouriteBeers,
      toggleFavouriteBeer,
      userNewBeers,
      getUserNewBeers,
      rateBeer,
    }}>
      {children}
    </BeerContext.Provider>
  );
};