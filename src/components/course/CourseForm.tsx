import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { COURSE_STATUS, type CourseFormData, type CourseFormErrors } from "../../types/types";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

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
    <Grid container component="form" onSubmit={onSubmit} noValidate sx={{ width: "100%", gap: 2 }} spacing={2}>
      <TextField
        error={Boolean(formErrors.name)}
        helperText={formErrors.name}
        type="name"
        name="name"
        value={formData.name}
        onChange={onChange}
        label="Course name"
        autoFocus
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      />
      {/* <TextField
        error={Boolean(formErrors.imageUrl)}
        helperText={formErrors.imageUrl}
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={onChange}
        label="Course image url"
        autoComplete="url"
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      /> */}
      <Grid
        size={6}
        component={TextField}
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
      <Grid
        size={6}
        component={TextField}
        error={Boolean(formErrors.endDate)}
        helperText={formErrors.endDate}
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={onChange}
        placeholder="01/05/1990"
        label="End date"
        autoComplete="date"
        fullWidth
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true }, input: { readOnly: role === "Student" } }}
      />
      <Grid size={{xs: 4, md: 2}}>
        <Select
          value={formData.status}
          fullWidth
          onChange={(event) => {
            setFormData((prevState) => ({ ...prevState, status: event.target.value }));
          }}
          readOnly={role === "Student"}
        >
          {COURSE_STATUS.map(status => (<MenuItem value={status}>{status}</MenuItem>))}
        </Select>
      </Grid>
      <Grid size={{xs: 4, md: 4}} component={TextField}
        error={Boolean(formErrors.numberOfHours)}
        helperText={formErrors.numberOfHours}
        type="tel"
        name="numberOfHours"
        value={formData.numberOfHours}
        onChange={onChange}
        label="Number of hours"
        autoComplete="number"
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      />
      {/* {role !== "Student" &&
        formData.teachers.map((teacher, index) => (
          <TextField
            error={Boolean(teacher)}
            helperText={formErrors.teachers[index]}
            type="text"
            name="numberOfHours"
            value={formData.numberOfHours}
            onChange={onChange}
            label="Number of hours"
            autoComplete="number"
            fullWidth
            variant="outlined"
            slotProps={{ input: { readOnly: false } }}
          />
        ))} */}
      <Grid size={{xs: 4, md: 6}} component={TextField}
        error={Boolean(formErrors.price)}
        helperText={formErrors.price}
        type="text"
        name="price"
        value={formData.price}
        onChange={onChange}
        label="Price"
        autoComplete="eur"
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
      />

      <Grid size={3} offset={3}>
        <Button type="submit" fullWidth variant="contained">
          {props.actionText}
        </Button>
      </Grid>
      <Grid size={3}>
        <Button variant="outlined" fullWidth color="error" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
export default CourseForm;
