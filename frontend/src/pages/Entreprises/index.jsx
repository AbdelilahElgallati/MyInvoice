// import React from "react";
// import { Box, useTheme, IconButton } from "@mui/material";
// import { useGetAllEntreprisesQuery, useRemoveEntrepriseMutation } from "state/api";
// import Header from "componentsAdmin/Header";
// import { DataGrid } from "@mui/x-data-grid";
// import DeleteIcon from "@mui/icons-material/Delete";
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import { useNavigate } from "react-router-dom";

// const Entreprises = () => {
//   const navigate = useNavigate()
//   if(!localStorage.getItem('userId')) {
//     navigate('/');
//   }
//   const theme = useTheme();
//   const { data, isLoading } = useGetAllEntreprisesQuery();
//   const [removeEntreprise] = useRemoveEntrepriseMutation();
//   const columns = [
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 0.5,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 0.7,
//     },
//     {
//       field: "phone",
//       headerName: "Phone Number",
//       flex: 0.5,
//     },
//     {
//       field: "address",
//       headerName: "Address",
//       flex: 0.8,
//     },
//     {
//       field: "role",
//       headerName: "Role",
//       flex: 0.4,
//     },
//     // {
//     //   field: "status",
//     //   headerName: "Status",
//     //   flex: 0.4,
//     // },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.3,
//       sortable: false,
//       renderCell: (params) => (
//         <Box>
//           <IconButton
//             onClick={() => handleEdit(params.row._id)}
//             aria-label="edit"
//           >
//             <InfoOutlinedIcon />
//           </IconButton>
          
//           <IconButton
//             onClick={() => handleDelete(params.row._id)}
//             aria-label="delete"
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   const handleEdit = (id) => {
//     window.location.href = `/Enterprises/Details/${id}`;
//   };

//   const handleDelete = async (id) => {
//     try {
//       await removeEntreprise(id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Box m="1.5rem 2.5rem" >
//       <Header title="ENTREPRISES" subtitle="Liste d'entreprises" />
//       <Box
//         mt="40px"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//             backgroundColor: theme.palette.background.test,
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: theme.palette.primary.light,
//           },
//           "& .MuiDataGrid-footerContainer": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderTop: "none",
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${theme.palette.secondary[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           loading={isLoading || !data}
//           getRowId={(row) => row._id}
//           rows={data || []}
//           columns={columns}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Entreprises;

import React from "react";
import { Box, useTheme, IconButton, Avatar } from "@mui/material";
import { useGetAllEntreprisesQuery, useRemoveEntrepriseMutation } from "state/api";
import Header from "componentsAdmin/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from "react-router-dom";

const Entreprises = () => {
  const navigate = useNavigate()
  if(!localStorage.getItem('userId')) {
    navigate('/');
  }
  const theme = useTheme();
  const { data, isLoading } = useGetAllEntreprisesQuery();
  const [removeEntreprise] = useRemoveEntrepriseMutation();

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={`http://localhost:3001/Images/${params.row.logo}`} alt={params.row.name} />
          <Box ml={1}>
            <div>{params.row.name}</div>
            <div>{params.row.email}</div>
          </Box>
        </Box>
      )
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.4,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex: 0.4,
    // },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleEdit(params.row._id)}
            aria-label="edit"
          >
            <InfoOutlinedIcon />
          </IconButton>
          
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

  const handleEdit = (id) => {
    window.location.href = `/Enterprises/Details/${id}`;
  };

  const handleDelete = async (id) => {
    try {
      await removeEntreprise(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem" >
      <Header title="ENTREPRISES" subtitle="Liste d'entreprises" />
      <Box
        mt="40px"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            backgroundColor: theme.palette.background.test,
            lineHeight: '1.5rem', // Ajustement de la hauteur de ligne
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Entreprises;
