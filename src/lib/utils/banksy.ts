import { Banksy } from "@nest25/banksy-sdk";
//import { BANKSY_CLIENT_KEY } from "$env/dynamic/private"
//const BANKSY_CLIENT_KEY = import.meta.env.VITE_BANKSY_CLIENT_KEY;
const BANKSY_CLIENT_KEY = "ck_test_f39f8a74-1267-4ce8-a0cb-e19e2597c105";
console.info("Banksy client key:", BANKSY_CLIENT_KEY);
const banksy = new Banksy(BANKSY_CLIENT_KEY);
export default banksy;
