/** @format */

import CryptoJS from "crypto-js";

export function generateHash(cardNumber, email) {
  const secret = "AXI2026";

  const first6 = cardNumber.slice(0, 6);
  const last4 = cardNumber.slice(-4);

  const combined = first6 + last4;
  const reversedCombined = combined.split("").reverse().join("");
  const reversedEmail = email.split("").reverse().join("");

  const message = (reversedEmail + "AXIPAYS" + reversedCombined).toUpperCase();
  console.log(message);

  const hash = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);

  return hash.toUpperCase();
}

// 🔥 Test it
// const result1 = generateHash("4111657687654565", "mayurpanchbhai@gmail.com");
// console.log(result1);

// const result = generateHash("4111657687654565", "mayurpanchbhai@gmail.com");
// console.log(result);

// console.log("Hash:", result);
