import { useEffect, useState } from "react";
import { type Course, type Enrollment, type Payment } from "../types/types";
import { getMyPendingPayments } from "../services/payment.services";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Card, CardActionArea, CardContent, Container, Typography } from "@mui/material";
import CheckoutForm from "../components/payment/CheckoutForm";

function CheckoutPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const foundPayments = await getMyPendingPayments();
      setPayments(foundPayments);
      console.log(foundPayments);
    } catch (error) {
      console.error(error);
    }
  }

  if (payments.length === 0) {
    return <Typography variant="h3">You have no pending payments</Typography>
  }
  
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const options: StripeElementsOptions = { clientSecret: payments[0].clientSecret, appearance: { theme: "flat" } };
  const course = (payments[0].enrollment as Enrollment).course as Course;

  return (
    <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", marginTop: "3rem"}}>
      <Card variant="elevation" sx={{ bgcolor: "#f5f5f5", padding: "10px 10px"}}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4">{`Payment for ${course.name}` }</Typography>
            <Typography variant="h5">{`Total: ${payments[0].price}.00 €`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  )
}
export default CheckoutPage