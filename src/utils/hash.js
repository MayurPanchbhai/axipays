/** @format */

import CryptoJS from "crypto-js";

export function generateHash(cardNumber, email) {
  const cleanCard = cardNumber.replace(/\s/g, "");

  const first6 = cleanCard.slice(0, 6);
  const last4 = cleanCard.slice(-4);

  const combined = first6 + last4;

  const reversedCard = combined.split("").reverse().join("");
  const reversedEmail = email.split("").reverse().join("");

  const message = (reversedEmail + "AXIPAYS" + reversedCard).toUpperCase();

  const hash = CryptoJS.HmacSHA256(message, "AXI2026")
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();

  return hash;
}
