import { Typography } from "@mui/material";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import type { CourseClass } from "../../types/types";

type PropsClassList = {
  classList: CourseClass[];
};

function ClassList(props: PropsClassList) {

  const columns: GridColDef[] = [
    { field: "course", headerName: "Course Name" },
    { field: "numberOfHours", headerName: "Hours" },
    { field: "date", headerName: "Date" },
    { field: "type", headerName: "Type" },
    { field: "onlineUrl", headerName: "URL" },
    { field: "classroomName", headerName: "Classroom name" },
  ];

  const rows: GridRowsProp = props.classList.map((oneClass) => {
    return {
      id: oneClass._id,
      course: oneClass.course,
      numberOfHours: oneClass.numberOfHours,
      date: oneClass.date,
      type: oneClass.classType,
      onlineUrl: oneClass.onlineUrl,
      classroomName: oneClass.classroomName,
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
export default ClassList;
