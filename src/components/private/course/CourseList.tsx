import { Button, Typography } from "@mui/material";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import type { Course } from "../../../types/types";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { useNavigate } from "react-router";

type PropsCourseList = {
  courseList: Course[];
};

function CourseList(props: PropsCourseList) {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Course Name" },
    { field: "status", headerName: "status" },
    { field: "startDate", headerName: "Start date" },
    { field: "endDate", headerName: "End date" },
    { field: "numberOfHours", headerName: "Hours num" },
    { field: "price", headerName: "Price" },
  ];
  if (role !== "Student" || role === "Student") {
    columns.push({
      field: "details",
      headerName: "More details",
      sortable: false,
      renderCell: (params) => (
        <Button variant="contained" onClick={() => navigate(`/course/${params.row.id}`)}>
          More details
        </Button>
      ),
    });
  }

  const rows: GridRowsProp = props.courseList.map((course) => {
    return {
      id: course._id,
      name: course.name,
      status: course.status,
      startDate: course.startDate,
      endDate: course.endDate,
      numberOfHours: course.numberOfHours,
      price: `${course.price} €`,
    };
  });

  return (
    <div>
      <Typography variant="h3" align="center">
        Courses
      </Typography>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
export default CourseList;
