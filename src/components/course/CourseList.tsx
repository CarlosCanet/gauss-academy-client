import { Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, type GridColDef, type GridRowParams, type GridRowsProp } from "@mui/x-data-grid";
import { COURSE_STATUS, type Course, type Enrollment, type EnrollmentFormData } from "../../types/types";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SchoolIcon from "@mui/icons-material/School";
// import CancelIcon from '@mui/icons-material/Cancel';
import { createEnrollment } from "../../services/enrollment.services";
import { createNewPayment } from "../../services/payment.services";

type PropsCourseList = {
  titleList: string;
  courseList: Course[];
  enrollmentList?: Enrollment[];
  onDelete?: (courseId: string) => Promise<void>;
};

function CourseList(props: PropsCourseList) {
  const navigate = useNavigate();
  const { role, loggedUserId } = useContext(AuthContext);

  const handleCreateEnrollment = async (params: GridRowParams) => {
    const enrollmentData: EnrollmentFormData = {
      course: params.row.id,
      student: loggedUserId as string,
      endDate: "",
    };
    try {
      const newEnrollment = await createEnrollment(params.row.id, enrollmentData);
      await createNewPayment(newEnrollment._id);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCancelEnrollment = async (params: GridRowParams) => {
  //   try {
  //     await deleteEnrollment(params.row.id);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
        <GridActionsCellItem icon={<SchoolIcon />} label="Classes" onClick={() => navigate(`/course/${params.row.id}/classes`)} />
      ),
    },
  ];
  if (role === "Student") {
    if (props.titleList === "My courses") {
      console.log("A");
    } else {
      columns.push({
        field: "enrollment",
        headerName: "Enroll",
        sortable: false,
        type: "actions",
        getActions: (params) => {
          return [<GridActionsCellItem icon={<EditIcon />} label="Enroll" onClick={() => handleCreateEnrollment(params)} />];
        },
      });
    }
  } else {
    columns.push({
      field: "actions",
      type: "actions",
      headerName: "Actions",
      sortable: false,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => navigate(`/course/${id}`)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => props.onDelete!(id.toString())} />,
        ];
      },
    });
  }

  const rows: GridRowsProp = props.enrollmentList
    ? props.enrollmentList.map((enrollment) => {
        const course = enrollment.course as Course;
        return {
          id: course._id,
          name: course.name,
          status: course.status,
          startDate: course.startDate,
          endDate: course.endDate,
          numberOfHours: course.numberOfHours,
          price: `${course.price} €`,
        };
      })
    : props.courseList.map((course) => {
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
        {props.titleList}
      </Typography>
      <div style={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      {/* {showPaymentIntent && <PaymentIntent productDetails={{ amount: 1500, currency: "eur" }} />} */}
    </div>
  );
}
export default CourseList;
