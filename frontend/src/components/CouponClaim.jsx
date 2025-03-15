import { useState } from "react";

const CouponClaim = () => {
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    setLoading(true);
    setMessage("");
    setCoupon(null);

    try {
      const res = await fetch("http://localhost:5000/api/claim", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 400) {
        setMessage("❌ " + data.message);
      } else {
        setMessage("✅ " + data.message);
        setCoupon(data.coupon); // Store coupon name
      }
    } catch (error) {
      setMessage("❌ Error claiming coupon. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-4 py-8 rounded-2xl">
      <h1 className="text-3xl font-bold mb-2">🎟️ Coupon Distribution System</h1>
      <p className="text-gray-600 mb-6">
        Claim your coupon below. One coupon per user within the time limit.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold">Claim Your Coupon</h2>
        <p className="text-gray-500 mb-4">
          Coupons are distributed in a round-robin fashion to ensure fairness.
        </p>

        {message && (
          <div
            className={`p-3 text-lg font-medium rounded-md ${
              coupon ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {coupon && (
          <div className="p-4 mt-2 text-lg bg-green-200 border border-green-500 rounded-md text-center">
            🎉 Your Coupon: <strong>{coupon}</strong>
          </div>
        )}

        <button
          onClick={handleClaim}
          disabled={loading}
          className="mt-4 w-full py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900 transition-all"
        >
          {loading ? "⏳ Claiming..." : "Claim Coupon"}
        </button>
      </div>
    </div>
  );
};

export default CouponClaim;
