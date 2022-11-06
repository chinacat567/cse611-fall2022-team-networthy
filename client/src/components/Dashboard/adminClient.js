import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#414040",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
        <div className="actionNav">
          <h2 className="actionNav--current">Client Profiles&nbsp;| </h2>
          <h2
            onClick={() =>
              (window.location.href = "/" + ROUTES.ADMIN_COACH_DASHBOARD)
            }
          >
            &nbsp; Coach Profiles
          </h2>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell>
                <StyledTableCell align="right">Username</StyledTableCell>
                <StyledTableCell align="right">DOB</StyledTableCell>
                <StyledTableCell align="right">Financial Level</StyledTableCell>
                <StyledTableCell align="right">Email ID</StyledTableCell>
                <StyledTableCell align="right">Gender</StyledTableCell>
                <StyledTableCell align="right">Debt</StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  Education
                </StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  What is your why?
                </StyledTableCell>
                <StyledTableCell align="right">Income</StyledTableCell>
                <StyledTableCell align="right">Location</StyledTableCell>
                <StyledTableCell align="right">Occupation</StyledTableCell>
                <StyledTableCell align="right">Learning Method</StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  Secondary Learning Method
                </StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  University
                </StyledTableCell>
                <StyledTableCell align="right">Assigned Coach</StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  Action
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {clientData &&
                clientData.map((row) => (
                  <StyledTableRow
                    key={row.username + row.firstName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.lastName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.dateOfBirth}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.financialLevel}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.emailId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.debt}</StyledTableCell>
                    <StyledTableCell align="right" className="tableCell--xxl">
                      {row.education}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="tableCell--xxl">
                      {row.general}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.income}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.location}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.occupation}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.learningMethod}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="tableCell--xxl">
                      {row.secondaryLearningMethod}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.university}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.coachUserName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
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
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminClient;
