import { useEffect, useState } from "react";
import { type Course, type Enrollment, type Payment } from "../types/types";
import { getMyPendingPayments } from "../services/payment.services";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Alert, Card, CardActionArea, CardContent, Container, Typography } from "@mui/material";
import CheckoutForm from "../components/payment/CheckoutForm";
import LoadingGauss from "../components/UI/LoadingGauss";

function CheckoutPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setIsLoading(true);
      const foundPayments = await getMyPendingPayments();
      setPayments(foundPayments);
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const options: StripeElementsOptions | undefined =
    payments.length === 0 ? undefined : { clientSecret: payments[0].clientSecret, appearance: { theme: "flat" } };
  const course: Course | undefined = payments.length === 0 ? undefined : ((payments[0].enrollment as Enrollment).course as Course);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", marginTop: "3rem" }}>
      <Card variant="elevation" sx={{ bgcolor: "#f5f5f5", padding: "10px 10px" }}>
        <CardActionArea>
          {isLoading ? (
            <LoadingGauss />
          ) : payments.length === 0 ? (
            <Typography variant="h3">You have no pending payments</Typography>
          ) : (
            <CardContent>
              <Typography variant="h4">{`Payment for ${course?.name ?? "course"}`}</Typography>
              <Typography variant="h5">{`Total: ${payments[0].price}.00 €`}</Typography>
            </CardContent>
          )}
        </CardActionArea>
      </Card>
      {options ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : null}
      {showErrorAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          There was an error loading your pending payments. Please refresh or try again later.
        </Alert>
      )}
    </Container>
  );
}
export default CheckoutPage;
