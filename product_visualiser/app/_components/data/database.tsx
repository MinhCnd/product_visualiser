import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, DataSnapshot, DatabaseReference, Database, Unsubscribe, get  } from "firebase/database";
import { Config } from "./Config";
import { RGBColor } from "react-color";

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

  private getConfigRef(textConfigId: string): DatabaseReference {
    return ref(this.db, `config/${textConfigId}`);
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

  updateConfig(textConfigId: string, newConfig: Config) {
    set(this.getConfigRef(textConfigId), newConfig);
  }

  updateText(textConfigId: string, newValue: string) {
    set(this.getConfigRef(textConfigId), {
      text: newValue
    });
  }

  updateTextSize(textConfigId: string, newValue: number) {
    set(this.getConfigRef(textConfigId), {
      size: newValue
    });
  }

  updateTextAlignment (textConfigId: string, newValue: string) {
    set(this.getConfigRef(textConfigId), {
      alignment: newValue
    });
  }

  updateTextColor (textConfigId: string, newValue: RGBColor) {
    set(this.getConfigRef(textConfigId), {
      color: newValue
    });
  }

  updateTextFont (textConfigId: string, newValue: string) {
    set(this.getConfigRef(textConfigId), {
      font: newValue
    });
  }

  updateEditPath (textConfigId: string, newValue: boolean) {
    set(this.getConfigRef(textConfigId), {
      editPath: newValue
    });
  }

}

const firebaseService = new FirebaseService();


export default firebaseService;
