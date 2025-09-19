import { useState } from "react";
import { Container, Grid, Typography, Card, CardContent, TextField, Button, Alert, Box, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { sendEmail } from "../services/email.services";
import { initialEmail, type ContactEmail } from "../types/types";

function ContactPage() {
  const [form, setForm] = useState<ContactEmail>(initialEmail);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      await sendEmail(form);
      setForm(initialEmail);
      setStatus("success");
      setTimeout(() => setStatus(null), 10000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </Typography>

      <Divider sx={{ my: 6 }} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card elevation={0} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom >
                Get in Touch
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3, }}>
                  <LocationOnIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Where are we?
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Avenida Plutarco, 75
                      <br />
                      Málaga, Spain
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <PhoneIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      How to talk with us?
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      +34 123 456 789
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Where can you write us?
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      info@academiagauss.es
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Office Hours
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Monday - Friday: 9:00 - 20:00
                      <br />
                      Saturday: 9:00 - 13:00
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField name="name" label="Full Name" value={form.name} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid size={12}>
                  <TextField name="subject" label="Subject" value={form.subject} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid size={12}>
                  <TextField name="message" label="Message" value={form.message} onChange={handleChange} multiline rows={4} fullWidth required />
                </Grid>
                <Grid size={12}>
                  <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
            {status === "success" && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Thank you for your message. We'll get back to you soon!
              </Alert>
            )}
            {status === "error" && (
              <Alert severity="error" sx={{ mt: 2 }}>
                There was an error sending your message. Please try again.
              </Alert>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;
