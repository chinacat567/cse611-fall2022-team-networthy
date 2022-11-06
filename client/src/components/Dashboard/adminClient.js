import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../../styles/adminDashboard.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteClientProfile,
  getAllClients,
} from "../../redux/slices/clientSlice";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ROUTES } from "../App/routeConfig";

function createClientData(allClients) {
  return allClients.map(
    ({
      clientProfile: {
        firstName,
        lastName,
        username,
        dateOfBirth,
        financialLevel,
        emailId,
        gender,
        debt,
        education,
        general,
        income,
        location,
        occupation,
        learningMethod,
        secondaryLearningMethod,
        university,
      },
      clientCoachRelation,
    }) => ({
      firstName,
      lastName,
      username,
      dateOfBirth,
      financialLevel,
      emailId,
      gender,
      debt,
      education,
      general,
      income,
      location,
      occupation,
      learningMethod,
      secondaryLearningMethod,
      university,
      coachUserName: clientCoachRelation?.coachUserId || null,
    })
  );
}

const AdminClient = () => {
  const dispatch = useDispatch();
  const allClients = useSelector((state) => state?.client?.allClients);
  const clientData = createClientData(allClients);

  useEffect(() => {
    dispatch(getAllClients());
  }, []);

  const onEditClick = (clientProfile) => {
    localStorage.setItem(
      "ADMIN_CLIENT_PROFILE_EDIT",
      JSON.stringify(clientProfile)
    );
    window.location.href = "/" + ROUTES.CLIENT_PROFILE_SURVEY;
  };

  const onDeleteClick = (username) => {
    dispatch(deleteClientProfile({ username }));
  };

  return (
    <div className="adminDashboard">
      <div className="adminDashboard__client">
        <h2>Client Profiles</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Firstname</TableCell>
                <TableCell align="right">Lastname</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">DOB</TableCell>
                <TableCell align="right">Financial Level</TableCell>
                <TableCell align="right">EmailID</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Debt</TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  Education
                </TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  What is your why?
                </TableCell>
                <TableCell align="right">Income</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Occupation</TableCell>
                <TableCell align="right">Learning Method</TableCell>
                <TableCell align="right">Secondary Learning Method</TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  University
                </TableCell>
                <TableCell align="right">Assigned Coach</TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientData &&
                clientData.map((row) => (
                  <TableRow
                    key={row.username + row.firstName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.firstName}
                    </TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.dateOfBirth}</TableCell>
                    <TableCell align="right">{row.financialLevel}</TableCell>
                    <TableCell align="right">{row.emailId}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">{row.debt}</TableCell>
                    <TableCell align="right" className="tableCell--xxl">
                      {row.education}
                    </TableCell>
                    <TableCell align="right" className="tableCell--xxl">
                      {row.general}
                    </TableCell>
                    <TableCell align="right">{row.income}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.occupation}</TableCell>
                    <TableCell align="right">{row.learningMethod}</TableCell>
                    <TableCell align="right">
                      {row.secondaryLearningMethod}
                    </TableCell>
                    <TableCell align="right">{row.university}</TableCell>
                    <TableCell align="right">{row.coachUserName}</TableCell>
                    <TableCell align="right">
                      <Button
                        align="right"
                        variant="contained"
                        onClick={() => onEditClick(row)}
                        sx={{ marginRight: "5px" }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        align="right"
                        variant="contained"
                        color="error"
                        onClick={() => onDeleteClick(row.username)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminClient;
