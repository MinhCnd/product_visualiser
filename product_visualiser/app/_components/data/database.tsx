// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, DataSnapshot, DatabaseReference, Database, Unsubscribe, get  } from "firebase/database";
import { textConfig } from "./textConfig";
import { RGBColor } from "react-color";
require('dotenv').config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "prod-configurator.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: "prod-configurator",
  storageBucket: "prod-configurator.appspot.com",
  messagingSenderId: "619955778745",
  appId: "1:619955778745:web:b3b20fd7a68c5e67da5768"
};

interface UnsubscribeRef {
  reference: string
  callback: Unsubscribe
}

// Initialize Firebase
const APP = initializeApp(firebaseConfig);

class FirebaseService {
  private db: Database;
  private unsubscribeList: UnsubscribeRef[];
  constructor() {
    this.db = getDatabase(APP);
    this.unsubscribeList = [];
  }

  private getTextConfigRef(textConfigId: string): DatabaseReference {
    return ref(this.db, `textConfig/${textConfigId}`);
  }

  unsubscribe(reference: string) {
    this.unsubscribeList.find((item) => item.reference === reference)?.callback();
  }

  subscribe(reference: string, callback:(value: any) => void) {
    const value = onValue(ref(this.db, reference), (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });

    this.unsubscribeList.push({reference, callback: value});
  }

  updateConfig(textConfigId: string, newConfig: textConfig) {
    set(this.getTextConfigRef(textConfigId), newConfig);
  }

  updateText(textConfigId: string, newValue: string) {
    set(this.getTextConfigRef(textConfigId), {
      text: newValue
    });
  }

  updateTextSize(textConfigId: string, newValue: number) {
    set(this.getTextConfigRef(textConfigId), {
      size: newValue
    });
  }

  updateTextAlignment (textConfigId: string, newValue: string) {
    set(this.getTextConfigRef(textConfigId), {
      alignment: newValue
    });
  }

  updateTextColor (textConfigId: string, newValue: RGBColor) {
    set(this.getTextConfigRef(textConfigId), {
      color: newValue
    });
  }

  updateTextFont (textConfigId: string, newValue: string) {
    set(this.getTextConfigRef(textConfigId), {
      font: newValue
    });
  }

  updateEditPath (textConfigId: string, newValue: boolean) {
    set(this.getTextConfigRef(textConfigId), {
      editPath: newValue
    });
  }

}

const firebaseService = new FirebaseService();


export default firebaseService;
