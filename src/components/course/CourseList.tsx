import { Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import { COURSE_STATUS, type Course } from "../../types/types";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SchoolIcon from '@mui/icons-material/School';

type PropsCourseList = {
  courseList: Course[];
  onDelete: (courseId: string) => Promise<void>;
};

function CourseList(props: PropsCourseList) {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Course Name" },
    { field: "status", headerName: "status", editable: true, valueOptions: COURSE_STATUS, type: "singleSelect" },
    { field: "startDate", headerName: "Start date" },
    { field: "endDate", headerName: "End date" },
    { field: "numberOfHours", headerName: "Hours num" },
    { field: "price", headerName: "Price" },
    {
      field: "classes",
      headerName: "Classes",
      sortable: false,
      renderCell: (params) => (
        // <Button variant="contained" onClick={() => navigate(`/course/${params.row.id}/classes`)}>
        //   Classes
        // </Button>

        <GridActionsCellItem icon={<SchoolIcon />} label="Classes" onClick={() => navigate(`/course/${params.row.id}/classes`)} />
      ),
    },
  ];
  if (role !== "Student" || role === "Student") {
    columns.push({
      field: "actions",
      type: "actions",
      headerName: "Actions",
      sortable: false,
      getActions: ({id}) => {
        // <Button variant="contained" onClick={() => navigate(`/course/${params.row.id}`)}>
        //   Details
        // </Button>
          return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => navigate(`/course/${id}`)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => props.onDelete(id.toString())} />]
        }
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
