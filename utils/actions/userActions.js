import { child, get, getDatabase, ref } from "firebase/database";
import { getFirebaseApp } from "../firbaseHelper";

export const getUserData = async (userId) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, `users/${userId}`);

    const snapshot = await get(userRef);
    console.log(snapshot.val());
    return snapshot.val();
  } catch (error) {
    console.log(error);
  }
};