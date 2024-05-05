import { initializeApp } from "firebase/app";
export const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCNlGOBzW7S-VxbuF2FT9vI1Mq1wHeGesw",
    authDomain: "react-native-whatsapp-5ac8f.firebaseapp.com",
    projectId: "react-native-whatsapp-5ac8f",
    storageBucket: "react-native-whatsapp-5ac8f.appspot.com",
    messagingSenderId: "307408745156",
    appId: "1:307408745156:web:9392fb00ce68dae3658f91",
    measurementId: "G-BW4NHF0WG8",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
