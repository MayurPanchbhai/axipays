/** @format */

import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { generateHash } from "../utils/hash";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Checkout() {
  const [redirectUrl, setRedirectUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      const hash = generateHash(data.card_number, data.email);
      const orderId = "ORD_" + Date.now();

      const payload = {
        orderId,
        cardNumber: data.card_number,
        expiryMonth: data.expiry_month,
        expiryYear: data.expiry_year,
        cardCVC: data.cvv,
        amount: Number(data.amount),
        currency: data.currency,
        email: data.email,
        country: data.country,
        address: data.address,
        phone: data.phone,
        cardHolderName: data.card_holder_name,
      };

      const response = await fetch(
        "https://payment-assignment.onrender.com/initiate-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Hash: hash,
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      setLoading(false);

      if (result.redirect_url) {
        setRedirectLoading(true);
        setRedirectUrl(result.redirect_url);
      }
    } catch (error) {
      setLoading(false);
      setRedirectLoading(false);
      console.error("API ERROR:", error);
    }
  };

  useEffect(() => {
    setRedirectLoading(false);
  }, [redirectLoading]);

  return (
    <>
      <Header Link1="/history" Link2="/dashboard" />
      <CheckoutForm onSubmit={handleSubmit} />
      {redirectUrl && (
        <div className="fixed z-56 inset-0 bg-black/80 flex items-center justify-center">
          <div className="w-[90%] h-[90%] bg-white rounded-xl overflow-hidden relative">
            {redirectLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            )}
            <iframe
              src={redirectUrl}
              className="w-full h-full"
              title="Payment"
            />

            <button
              onClick={() => setRedirectUrl(null)}
              className="absolute z-70 top-4 right-4 bg-red-500 text-white px-3 py-1 rounded">
              Close
            </button>
          </div>
        </div>
      )}
      {/* Loading UI */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow">
            Processing Payment...
          </div>
        </div>
      )}
      {/* Status Modal */}
      {status && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            {status === "success" && (
              <h2 className="text-green-600 text-xl">Payment Successful ✅</h2>
            )}

            {status === "failed" && (
              <h2 className="text-red-600 text-xl">Payment Failed ❌</h2>
            )}

            {status === "pending" && (
              <h2 className="text-yellow-600 text-xl">Payment Pending ⏳</h2>
            )}

            <button
              onClick={() => setStatus(null)}
              className="mt-4 absolute z-89 px-4 py-2 bg-blue-600 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
