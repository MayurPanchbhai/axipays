/** @format */

import { useState } from "react";

export default function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
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
  });

  const [errors, setErrors] = useState({});
  const [isCardFocused, setIsCardFocused] = useState(false);

  // Format card number (1234 5678 9012 3456)
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  // Mask card number (123456******3456)
  const maskCardNumber = (card) => {
    const clean = card.replace(/\s/g, "");
    if (clean.length < 10) return card;

    const first6 = clean.slice(0, 6);
    const last4 = clean.slice(-4);

    return first6 + "******" + last4;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "card_number") {
      value = formatCardNumber(value);
    }

    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData({ ...formData, [name]: value });
  };

  // Basic validation
  const validate = () => {
    let newErrors = {};

    if (!formData.card_holder_name) newErrors.card_holder_name = "Required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.card_number.replace(/\s/g, "").length !== 16)
      newErrors.card_number = "Invalid card number";
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = "Invalid CVV";
    if (!formData.amount) newErrors.amount = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Send CLEAN card number (no spaces)
    const cleanData = {
      ...formData,
      card_number: formData.card_number.replace(/\s/g, ""),
    };

    onSubmit(cleanData);
  };

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

          {/* 🔥 SPECIAL CARD INPUT */}
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
            />
            <Input
              label="YYYY"
              name="expiry_year"
              value={formData.expiry_year}
              onChange={handleChange}
            />
          </div>

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

            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="input">
              <option>USD</option>
              <option>INR</option>
              <option>EUR</option>
            </select>
          </div>

          <Input
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="input"
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", error }) {
  return (
    <div>
      <label className="block text-sm mb-1 ">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`input ${error ? "border-red-500" : ""} border`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
