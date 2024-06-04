import { Banksy } from "@nest25/banksy-sdk";
//import { BANKSY_CLIENT_KEY } from "$env/dynamic/private"
const BANKSY_CLIENT_KEY = import.meta.env.VITE_BANKSY_CLIENT_KEY;
const banksy = new Banksy(BANKSY_CLIENT_KEY);
export default banksy;
