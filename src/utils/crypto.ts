import CryptoJS from "crypto-js";
const SECRET_KEY = "SUPER_SECRET_KEY@123"; 
export const encryptData = (data: object) => {
  const strData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(strData, SECRET_KEY).toString();
};
export const decryptData = (cipher: string) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}