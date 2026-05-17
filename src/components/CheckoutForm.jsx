/** @format */

import { useState } from "react";

export default function CheckoutForm({ onSubmit }) {
  const initialFormState = {
    card_holder_name: "",
    email: "",
    card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
    amount: "",
    currency: "USD",
    country: "",
    address: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState({});
  const [isCardFocused, setIsCardFocused] = useState(false);

  // Format card number
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  // Mask card number
  const maskCardNumber = (card) => {
    const clean = card.replace(/\s/g, "");
    if (clean.length < 10) return card;

    const first6 = clean.slice(0, 6);
    const last4 = clean.slice(-4);

    return first6 + "******" + last4;
  };

  //  Luhn Algorithm
  function isValidCard(card) {
    const digits = card.replace(/\D/g, "").split("").reverse();
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
      let num = parseInt(digits[i]);

      if (i % 2 === 1) {
        num *= 2;
        if (num > 9) num -= 9;
      }

      sum += num;
    }

    return sum % 10 === 0;
  }

  // Handle input change
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "card_number") {
      value = formatCardNumber(value);

      const clean = value.replace(/\s/g, "");

      // validating luhn on input change
      if (clean.length === 16 && !isValidCard(clean)) {
        setErrors((prev) => ({
          ...prev,
          card_number: "Invalid card number",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          card_number: "",
        }));
      }
    }

    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData({ ...formData, [name]: value });
  };

  // Validate before submit
  const validate = () => {
    let newErrors = {};

    const cleanCard = formData.card_number.replace(/\s/g, "");

    if (!formData.card_holder_name) newErrors.card_holder_name = "Required";

    if (!formData.email.includes("@")) newErrors.email = "Invalid email";

    // card validation
    if (cleanCard.length !== 16) {
      newErrors.card_number = "Card must be 16 digits";
    } else if (!isValidCard(cleanCard)) {
      newErrors.card_number = "Invalid card number";
    }

    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = "Invalid CVV";

    if (!formData.amount) newErrors.amount = "Required";

    const month = Number(formData.expiry_month);
    if (!month || month < 1 || month > 12) {
      newErrors.expiry_month = "Invalid month";
    }

    if (isCardExpired(formData.expiry_month, formData.expiry_year)) {
      newErrors.expiry = "Card is expired";
    }
    if (!formData.phone && formData.phone.length == 10)
      newErrors.phone = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const cleanData = {
      ...formData,
      card_number: formData.card_number.replace(/\s/g, ""),
    };

    onSubmit(cleanData);

    // clearing the data
    // setFormData(initialFormState);
  };

  function isCardExpired(month, year) {
    if (!month || !year) return true;

    const now = new Date();
    const inputDate = new Date(year, month - 1);
    inputDate.setMonth(inputDate.getMonth() + 1);

    return inputDate <= now;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Secure Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Card Holder Name"
            name="card_holder_name"
            value={formData.card_holder_name}
            onChange={handleChange}
            error={errors.card_holder_name}
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div>
            <label className="block text-sm mb-1">Card Number</label>
            <input
              name="card_number"
              value={
                isCardFocused
                  ? formData.card_number
                  : maskCardNumber(formData.card_number)
              }
              onFocus={() => setIsCardFocused(true)}
              onBlur={() => setIsCardFocused(false)}
              onChange={handleChange}
              className={`input ${errors.card_number ? "border-red-500" : ""}`}
            />
            {errors.card_number && (
              <p className="text-red-500 text-xs">{errors.card_number}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="MM"
              name="expiry_month"
              value={formData.expiry_month}
              onChange={handleChange}
              error={errors.expiry_month}
            />
            <Input
              label="YYYY"
              name="expiry_year"
              value={formData.expiry_year}
              onChange={handleChange}
            />
          </div>

          {errors.expiry && (
            <p className="text-red-500 text-xs">{errors.expiry}</p>
          )}

          <Input
            label="CVV"
            name="cvv"
            type="password"
            value={formData.cvv}
            onChange={handleChange}
            error={errors.cvv}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={errors.amount}
            />
            <div className="flex flex-col">
              <label className="block text-sm mb-1">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="input">
                <option>USD</option>
                <option>INR</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          <Input
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm mb-1">Address</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="input"
            />
          </div>

          <Input
            label="Phone"
            placeholder="Enter your address"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <button className="w-full  bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

// Handeling inputs
function Input({ label, name, value, onChange, type = "text", error }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`input border ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
