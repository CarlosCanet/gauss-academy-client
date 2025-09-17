import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import type { ClassFormData, ClassFormErrors } from "../../../types/types";
import { CLASS_TYPES } from "../../../types/types";
import { AuthContext } from "../../../context/auth.context";

type PropsClassForm = {
  handleSubmit: (formData: ClassFormData) => Promise<ClassFormErrors | null>;
  actionText?: string;
  formData: ClassFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClassFormData>>;
};

function ClassForm(props: PropsClassForm) {
  const { formData, setFormData } = props;
  const [formErrors, setFormErrors] = useState<ClassFormErrors>({});
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
        error={Boolean(formErrors.numberOfHours)}
        helperText={formErrors.numberOfHours}
        type="numberOfHours"
        name="numberOfHours"
        value={formData.numberOfHours}
        onChange={onChange}
        label="Hours"
        autoFocus
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: true } }}
      />
      <TextField
        error={Boolean(formErrors.date)}
        helperText={formErrors.date}
        type="date"
        name="date"
        value={formData.date}
        onChange={onChange}
        label="Date"
        autoComplete="date"
        required
        fullWidth
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true }, input: { readOnly: role === "Student" } }}
      />
      <Autocomplete
        options={CLASS_TYPES}
        value={formData.type}
        onChange={(_, newValue) => {
          if (newValue) {
            setFormData((prevState) => ({ ...prevState, type: newValue }));
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Class Type"
            name="type"
            error={Boolean(formErrors.type)}
            helperText={formErrors.type}
            slotProps={{ input: { readOnly: role === "Student" } }}
          />
        )}
      />
      {formData.type === "In-Person" ? 
        <TextField
        error={Boolean(formErrors.classroomName)}
        helperText={formErrors.classroomName}
        type="text"
        name="classroomName"
        value={formData.classroomName}
        onChange={onChange}
        label="Classroom name"
        autoComplete="name"
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
        />
        :
        <TextField
        error={Boolean(formErrors.onlineUrl)}
        helperText={formErrors.onlineUrl}
        type="text"
        name="onlineUrl"
        value={formData.onlineUrl}
        onChange={onChange}
        label="URL"
        autoComplete="url"
        required
        fullWidth
        variant="outlined"
        slotProps={{ input: { readOnly: role === "Student" } }}
        />
      }

      {props.actionText && (
        <Button type="submit" fullWidth variant="contained">
          {props.actionText}
        </Button>
      )}
    </Box>
  );
}
export default ClassForm;
