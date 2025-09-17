import type { Enrollment } from "../../../types/types";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

type PropsCourseList = {
  enrollmentList: Enrollment[];
};

function EnrollmentList(props: PropsCourseList) {
  const columns: GridColDef[] = [
    { field: "student", headerName: "Student" },
    { field: "course", headerName: "Course" },
    { field: "endDate", headerName: "End date" },
    { field: "discountPercent", headerName: "Discount" },
    { field: "createdAt", headerName: "Created at" },
    { field: "updatedAt", headerName: "Updated at" },
  ];

  const rows: GridRowsProp = props.enrollmentList.map((enrollment) => {
    return {
      id: enrollment._id,
      student: enrollment.student,
      course: typeof enrollment.course === "string" ? enrollment.course : enrollment.course.name,
      endDate: enrollment.endDate,
      discountPercent: enrollment.discountPercent,
      createdAt: enrollment.createdAt,
      updatedAt: enrollment.updatedAt,
    };
  });

  return (
    <div>
      <Typography variant="h3" align="center">
        Enrollments
      </Typography>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
export default EnrollmentList;
