import { Button, Typography } from "@mui/material";
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import type { Course, Enrollment } from "../../types/types";
import { service } from "../../services/config.services";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/auth.context";

function MyCoursesPage() {
  const [myEnrollments, setMyEnrollments] = useState<Enrollment[]>([]);
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/enrollment/my-enrollments");
      setMyEnrollments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Course Name" },
    { field: "status", headerName: "status" },
    { field: "startDate", headerName: "Start date" },
    { field: "endDate", headerName: "End date" },
    { field: "numberOfHours", headerName: "Hours num" },
    { field: "price", headerName: "Price" },
  ];
  // if (role !== "Student") {
    columns.push({ field: "details", headerName: "More details", sortable: false, renderCell: (params) => (<Button variant="contained" onClick={() => navigate(`/course/${params.row.id}`)}>More details</Button>) });
  // }

  const rows: GridRowsProp = myEnrollments
    .map((enrollment) => {
      const course = enrollment.course as Course;
      return ({ id: course._id, name: course.name, status: course.status, startDate: course.startDate, endDate: course.endDate, numberOfHours: course.numberOfHours, price: `${course.price} €` })
    });

  return (
    <div>
      <Typography variant="h3" align="center">
        My Courses
      </Typography>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
export default MyCoursesPage;
