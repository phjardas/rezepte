import { initializeApp } from "firebase/app";
import { config } from "./config";

export const firebase = initializeApp(config);
