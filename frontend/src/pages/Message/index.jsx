import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { useGetMessagesQuery, useRemoveMessageMutation } from "state/api";
import Header from "componentsAdmin/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("userId")) {
    navigate("/");
  }
  const [messages, setMessages] = useState([]);
  const theme = useTheme();
  // hadi
  const { data, isLoading } = useGetMessagesQuery();
  const [removeMessage] = useRemoveMessageMutation();
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const columns = [
    {
      field: "enterpriseName",
      headerName: "Entreprise",
      flex: 1,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date d'envoie",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleDelete(params.row._id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await removeMessage(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MESSAGES" subtitle="Liste de messages" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !messages}
          getRowId={(row) => row._id}
          rows={messages || []} 
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Messages;
