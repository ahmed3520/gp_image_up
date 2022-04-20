
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    "apiKey": "AIzaSyBnR2KYud3YIFXhJ63oIkEI4KCrSO-tKu8",
    "authDomain": "parkinson-demo.firebaseapp.com",
    "projectId": "parkinson-demo",
    "storageBucket": "parkinson-demo.appspot.com",
    "messagingSenderId": "453871934145",
    "appId": "1:453871934145:web:b14de15a8e0f1e35961240",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };