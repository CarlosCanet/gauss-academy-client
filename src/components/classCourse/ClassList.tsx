import { Alert, Box, Button, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  type GridColDef,
  type GridRowsProp,
  type GridRowModesModel,
  GridRowModes,
  GridActionsCellItem,
  type GridEventListener,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { CLASS_TYPES, initialClassForm, type ClassFormData } from "../../types/types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import type { GridRowId, GridRowModel } from "@mui/x-data-grid";
import { createClass, deleteClass, editClass, getClassesFromCourse } from "../../services/class.services";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router";

type PropsClassList = {
  courseId: string;
};

function ClassList(props: PropsClassList) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await getClassesFromCourse(props.courseId);
      setRows(
        data.map((oneClass) => ({
          id: oneClass._id,
          course_id: typeof oneClass.course === "object" ? oneClass.course._id : oneClass.course,
          course: typeof oneClass.course === "object" ? oneClass.course.name : oneClass.course,
          numberOfHours: oneClass.numberOfHours,
          date: oneClass.date,
          classType: oneClass.classType,
          onlineUrl: oneClass.onlineUrl,
          classroomName: oneClass.classroomName,
        }))
      );
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    }
  };

  const columns: GridColDef[] = [
    { field: "course", headerName: "Course Name", type: "string", editable: true, minWidth: 120, flex: 2 },
    { field: "numberOfHours", headerName: "Hours", type: "number", editable: true, minWidth: 70, flex: 1 },
    { field: "date", headerName: "Date", type: "date", editable: true, minWidth: 100, flex: 1 },
    { field: "classType", headerName: "Type", type: "singleSelect", valueOptions: CLASS_TYPES, editable: true, minWidth: 150, flex: 1 },
    {
      field: "onlineUrl",
      headerName: "URL",
      type: "string",
      editable: true,
      minWidth: 300,
      flex: 2,
      renderCell: (params) =>
        params.value ? (
          <a href={params.value} target="_blank">
            {params.value}
          </a>
        ) : (
          " - "
        ),
    },
    { field: "classroomName", headerName: "Classroom name", type: "string", editable: true, minWidth: 100, flex: 2 },
  ];

  if (role !== "Student") {
    columns.push({
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      sortable: false,
      filterable: false,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: "primary.main",
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />,
        ];
      },
    });
  }

  // Action handlers
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteClass(id as string);
      getData();
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow && editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    try {
      if (newRow.isNew) {
        await createClass(props.courseId, newRow as ClassFormData);
      } else {
        await editClass(newRow.id, { ...newRow, course: newRow.course_id });
      }
      await getData();
      return newRow;
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  function CustomToolbar() {
    const onAddRow = () => {
      const id = crypto.randomUUID();
      setRows((oldRows) => [...oldRows, { ...initialClassForm, id, course: props.courseId, isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit },
      }));
    };

    return (
      <Toolbar>
        <Tooltip title="Add record">
          <ToolbarButton onClick={onAddRow}>
            <AddIcon fontSize="small" />
          </ToolbarButton>
        </Tooltip>
      </Toolbar>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: { xs: 2, md: 4 },
        height: "100%",
        maxWidth: "100%",
      }}>
      <Typography variant="h3" align="center">
        {rows.length > 0 && rows[0].course ? `Classes for ${rows[0].course}` : "Classes"}
      </Typography>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{ toolbar: CustomToolbar }}
          showToolbar={role !== "Student"}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" color="warning" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
      {showErrorAlert && (
        <Alert severity="warning" sx={{ my: 2 }}>
          There was an error with the classes. Please try again.
        </Alert>
      )}
    </Box>
  );
}
export default ClassList;
