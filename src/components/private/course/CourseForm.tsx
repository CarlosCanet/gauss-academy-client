import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { COURSE_STATUS, type CourseFormData, type CourseFormErrors } from "../../../types/types";
import { AuthContext } from "../../../context/auth.context";

type PropsCourseForm = {
  handleSubmit: (formData: CourseFormData) => Promise<CourseFormErrors | null>;
  actionText?: string;
  formData: CourseFormData;
  setFormData: React.Dispatch<React.SetStateAction<CourseFormData>>;
};

function CourseForm(props: PropsCourseForm) {
  const { formData, setFormData } = props;
  const [formErrors, setFormErrors] = useState<CourseFormErrors>({});
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
        error={Boolean(formErrors.name)}
        helperText={formErrors.name}
        type="name"
        name="name"
        value={formData.name}
        onChange={onChange}
        label="name"
        autoFocus
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      />
      {role !== "Student" && (
        <TextField
          error={Boolean(formErrors.slug)}
          helperText={formErrors.slug}
          type="slug"
          name="slug"
          value={formData.slug}
          onChange={onChange}
          label="slug"
          autoFocus
          required
          fullWidth
          variant="outlined"
          slotProps={{ input: { readOnly: false } }}
        />
      )}
      <Autocomplete
        options={COURSE_STATUS}
        value={formData.status}
        onChange={(_, newValue) => {
          if (newValue === "Planned" || newValue === "Active" || newValue === "Finished") {
            setFormData((prevState) => ({ ...prevState, status: newValue }));
          }
        }}
        renderInput={(params) => <TextField {...params} label="Status" name="status" slotProps={{ input: { readOnly: role === "Student" } }} />}
      />
      <TextField
        error={Boolean(formErrors.imageUrl)}
        helperText={formErrors.imageUrl}
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={onChange}
        label="Course image url"
        autoComplete="url"
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      />
      <TextField
        error={Boolean(formErrors.startDate)}
        helperText={formErrors.startDate}
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={onChange}
        placeholder="01/05/1990"
        label="Start date"
        autoComplete="date"
        required
        fullWidth
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true }, input: { readOnly: role === "Student" } }}
      />
      <TextField
        error={Boolean(formErrors.endDate)}
        helperText={formErrors.endDate}
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={onChange}
        placeholder="01/05/1990"
        label="End date"
        autoComplete="date"
        required
        fullWidth
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true }, input: { readOnly: role === "Student" } }}
      />
      <TextField
        error={Boolean(formErrors.numberOfHours)}
        helperText={formErrors.numberOfHours}
        type="tel"
        name="numberOfHours"
        value={formData.numberOfHours}
        onChange={onChange}
        label="Number of hours"
        autoComplete="number"
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      />
      {role !== "Student" &&
        formData.teachers.map((teacher, index) => (
          <TextField
            error={Boolean(teacher)}
            helperText={formErrors.teachers![index]}
            type="text"
            name="numberOfHours"
            value={formData.numberOfHours}
            onChange={onChange}
            label="Number of hours"
            autoComplete="number"
            required
            fullWidth
            variant="outlined"
            slotProps={{ input: { readOnly: false } }}
          />
        ))}
      <TextField
        error={Boolean(formErrors.price)}
        helperText={formErrors.price}
        type="text"
        name="price"
        value={formData.price}
        onChange={onChange}
        label="Price"
        autoComplete="eur"
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      />

      {props.actionText && (
        <Button type="submit" fullWidth variant="contained">
          {props.actionText}
        </Button>
      )}
    </Box>
  );
}
export default CourseForm;
