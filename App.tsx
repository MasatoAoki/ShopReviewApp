import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import  firebase from 'firebase/app';
import  "firebase/firestore";
import { StyleSheet, Text, View } from 'react-native';

if(!firebase.apps.length) {
const firebaseConfig = {
  apiKey: "AIzaSyAVOPwf_51bm__x6p0m1gmwGPfLBwwVavQ",
  authDomain: "shop-review-f0788.firebaseapp.com",
  projectId: "shop-review-f0788",
  storageBucket: "shop-review-f0788.appspot.com",
  messagingSenderId: "714460507341",
  appId: "1:714460507341:web:73743e934d41f49bfbcd84",
  measurementId: "G-BY3K4LYTF9"
};
firebase.initializeApp(firebaseConfig);
}

type Shop ={
  name: string;
  place: string;   //TSのため型を定義している useStateで使う
}

export default function App() {
  const [shops, setShops] =useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  },[]);   //第二引数を空にすることで一番最初の画面描画の時のみにfirebaseから情報を持ってくることとなる

  const getFirebaseItems = async() => {
    const snapshot = await firebase.firestore().collection("shops").get();
    const shops = snapshot.docs.map(doc => doc.data() as Shop);
    setShops(shops) //shopsの値を　setShops に入れた
  };


  const shopItems = shops.map((shop, index) => (
    <View style={{margin: 10}}  key={index.toString()}>
      <Text>{shop.name}</Text>
      <Text>{shop.place}</Text>
    </View>
  ))

  return (
    <View style={styles.container}>
     {shopItems}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//main
//develop
//M_01
//M_02