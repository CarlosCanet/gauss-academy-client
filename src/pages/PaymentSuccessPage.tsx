// in "src/components/PaymentSuccess.jsx"

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import LoadingGauss from "../components/UI/LoadingGauss";
import { updatePayment } from "../services/payment.services";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    handleUseEffect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUseEffect = async () => {
    // below is a way to extract queries from the search queries.
    // unfortunately, react-router-dom doesn't come with a proper way to extract them, similar to useParams
    const clientSecret = new URLSearchParams(location.search).get("payment_intent_client_secret");
    const paymentIntentId = new URLSearchParams(location.search).get("payment_intent");

    try {
      await updatePayment(clientSecret as string, paymentIntentId as string);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  if (isFetching) {
    return <LoadingGauss />;
  }

  return (
    <div>
      <h1>Thank you for your order!</h1>
      <Link to={"/"}>Go back to Home</Link>
    </div>
  );
};

export default PaymentSuccessPage;
