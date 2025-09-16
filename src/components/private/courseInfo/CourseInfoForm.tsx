import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { service } from "../../../services/config.services";
import { initialCourse, type CourseInfoFormData, type CourseInfoFormErrors } from "../../../types/types";

type PropsUserInfo = {
  handleSubmit: (formData: CourseInfoFormData) => Promise<CourseInfoFormErrors | null>;
  actionText: string;
};

function CourseInfoForm(props: PropsUserInfo) {
  const [formData, setFormData] = useState<CourseInfoFormData>(initialCourse);
  const [formErrors, setFormErrors] = useState<CourseInfoFormErrors>({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/user/profile");
      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
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
        // color={formErrors.email ? "primary" : "error"}
      />
      <Autocomplete
        options={["Planned", "Active", "Finished"]}
        value={formData.status}
        onChange={(_, newValue) => {
          if (newValue === "Planned" || newValue === "Active" || newValue === "Finished") {
            setFormData(prevState => ({...prevState, status: newValue}));
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Status" name="status" />
        )}
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
        slotProps={{ inputLabel: { shrink: true } }}
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
      />
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
      />

      <Button type="submit" fullWidth variant="contained">
        {props.actionText}
      </Button>
    </Box>
  );
}
export default CourseInfoForm;