import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import type { EnrollmentFormData, EnrollmentFormErrors } from "../../../types/types";
import { AuthContext } from "../../../context/auth.context";

type PropsEnrollmentForm = {
  handleSubmit: (formData: EnrollmentFormData) => Promise<EnrollmentFormErrors | null>;
  actionText?: string;
  formData: EnrollmentFormData;
  setFormData: React.Dispatch<React.SetStateAction<EnrollmentFormData>>;
};

function EnrollmentForm(props: PropsEnrollmentForm) {
  const { formData, setFormData } = props;
  const [formErrors, setFormErrors] = useState<EnrollmentFormErrors>({});
  const { role } = useContext(AuthContext);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = await props.handleSubmit(formData);
    if (errors) {
      setFormErrors(errors);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
      <TextField
        error={Boolean(formErrors.student)}
        helperText={formErrors.student}
        type="student"
        name="student"
        value={formData.student}
        onChange={onChange}
        label="Student"
        autoFocus
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: true } }}
      />
      <TextField
        error={Boolean(formErrors.course)}
        helperText={formErrors.course}
        type="course"
        name="course"
        value={formData.course}
        onChange={onChange}
        label="Course"
        autoFocus
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: true } }}
      />
      <TextField
        error={Boolean(formErrors.endDate)}
        helperText={formErrors.endDate}
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={onChange}
        label="End date"
        autoComplete="date"
        required
        fullWidth
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true }, input: { readOnly: role === "Student" } }}
      />
      <TextField
        error={Boolean(formErrors.discountPercent)}
        helperText={formErrors.discountPercent}
        type="number"
        name="discountPercent"
        value={formData.discountPercent}
        onChange={onChange}
        label="Discount percent"
        autoComplete="number"
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      />
     <TextField
        error={Boolean(formErrors.createdAt)}
        helperText={formErrors.createdAt}
        type="text"
        name="createdAt"
        value={formData.createdAt}
        onChange={onChange}
        label="Created at"
        autoComplete="eur"
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: true } }}
      />
      <TextField
        error={Boolean(formErrors.updatedAt)}
        helperText={formErrors.updatedAt}
        type="text"
        name="updatedAt"
        value={formData.updatedAt}
        onChange={onChange}
        label="Updated at"
        autoComplete="eur"
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: true } }}
      />

      {props.actionText && (
        <Button type="submit" fullWidth variant="contained">
          {props.actionText}
        </Button>
      )}
    </Box>
  );
}
export default EnrollmentForm;
