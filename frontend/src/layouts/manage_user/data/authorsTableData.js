/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import EditModal from "layouts/manage_user/data/modal.js";
import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import CreateModal from "./createModal";

function handleDelete(id, event) {
  event.preventDefault();
  fetch("http://localhost:8080/api/user/" + id, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ` + localStorage.getItem("token"),
    }),
  })
    .then((result) => {
      console.log("Success:", result);
      // window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function Data(props) {
  const [openSnack, setOpenSnack] = useState(false);

  const handleSnackClick = () => {
    setOpenSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const [data, setData] = useState([]);
  var api = "";

  useEffect(() => {
    api = "http://localhost:8080/api/user/getAllUsersByRole/" + props.role;
    fetchData();
  }, [props.role]);

  const fetchData = async () => {
    try {
      const response = await fetch(api, {
        method: "get",
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + localStorage.getItem("token"),
        }),
      });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //   data = [{
  //     "id": 1,
  //     "email":"hola1@gmail.com",
  //     "firstname": "first",
  //     "lastname": "last",
  //     "role": "Steward"
  //   },
  //   {
  //     "id": 2,
  //     "email":"holii@gmail.com",
  //     "firstname": "fedi",
  //     "lastname": "tak",
  //     "role": "Pilote"
  //   }

  // ]

  const Author = ({ id, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDTypography display="block" fontWeight="medium" size="sm">
        {id}
      </MDTypography>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "User", accessor: "User", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      // { Header: "status", accessor: "status", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: [
      ...data.map((item) => {
        return {
          User: (
            <Author
              id={item.id}
              name={item.firstname + " " + item.lastname}
              email={item.email}
            />
          ),
          function: <Job title={item.role} description={item.description} />,
          // status: (
          //   <MDBox ml={-1}>
          //     <MDBadge badgeContent={item.status} color="success" variant="gradient" size="sm" />
          //   </MDBox>
          // ),
          // employed: (
          //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          //     {item.date}
          //   </MDTypography>
          // ),
          action: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
              style={{ display: "flex", alignItems: "center" }}
            >
              <EditModal item={item}></EditModal>
              <IconButton
                variant="contained"
                color="error"
                onClick={(e) => {
                  handleDelete(item.id, e).then(() => {
                    // If delete is done successfully then refresh the UI and delete the row in the UI
                    let filteredData = data.filter((el) => el.id !== item.id);
                    setData(filteredData)
                  })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }}
              >
                <Icon fontSize="medium">close</Icon>
              </IconButton>
            </MDTypography>
          ),
        };
      }),
      {
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            <CreateModal role={props.role}></CreateModal>
          </MDTypography>
        ),
      },
    ],
  };
}

export default Data;
