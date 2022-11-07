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
  approveCoach,
  deleteCoachProfile,
  getAllCoachesAdmin,
} from "../../redux/slices/coachSlice";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ROUTES } from "../App/routeConfig";
import { showLoader } from "../../redux/slices/loaderSlice";

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

function createCoachData(allCoaches) {
  return allCoaches.map(
    ({
      firstName,
      lastName,
      username,
      dateOfBirth,
      emailId,
      gender,
      education,
      general,
      credentials,
      location,
      occupation,
      university,
      profileStatus,
    }) => ({
      firstName,
      lastName,
      username,
      dateOfBirth,
      emailId,
      gender,
      education,
      general,
      credentials,
      location,
      occupation,
      university,
      profileStatus,
    })
  );
}

const AdminCoach = () => {
  const dispatch = useDispatch();
  const allCoaches = useSelector((state) => state?.coach?.allCoaches);
  const coachData = createCoachData(allCoaches);

  useEffect(() => {
    dispatch(getAllCoachesAdmin());
  }, []);

  const onEditClick = (coachProfile) => {
    localStorage.setItem(
      "ADMIN_COACH_PROFILE_EDIT",
      JSON.stringify(coachProfile)
    );
    window.location.href = "/" + ROUTES.COACH_PROFILE_SURVEY;
  };

  const onDeleteClick = (username) => {
    dispatch(deleteCoachProfile({ username }));
  };

  const onApproveClick = async (username) => {
    dispatch(showLoader(true));
    await dispatch(approveCoach({ username }));
    dispatch(showLoader(false));
  };

  const onDeclineClick = (username) => {
    onDeleteClick(username);
  };

  return (
    <div className="adminDashboard">
      <div className="adminDashboard__client">
        <div className="actionNav">
          <h2 className="actionNav--current">Coach Profiles&nbsp;| </h2>
          <h2
            onClick={() =>
              (window.location.href = "/" + ROUTES.ADMIN_CLIENT_DASHBOARD)
            }
          >
            &nbsp; Client Profiles
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
                <StyledTableCell align="right">Email ID</StyledTableCell>
                <StyledTableCell align="right">Gender</StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  Education
                </StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  What is your why?
                </StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  Credentials
                </StyledTableCell>
                <StyledTableCell align="right">Location</StyledTableCell>
                <StyledTableCell align="right">Occupation</StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  University
                </StyledTableCell>
                <StyledTableCell align="right" className="tableCell--xxl">
                  Action
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {coachData &&
                coachData.map((row) => (
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
                      {row.emailId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="tableCell--xxl">
                      {row.education}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="tableCell--xxl">
                      {row.general}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="tableCell--xxl">
                      {row.credentials}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.location}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.occupation}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.university}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.profileStatus ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <Button
                            align="right"
                            variant="contained"
                            onClick={() => onApproveClick(row.username)}
                            sx={{ marginRight: "5px" }}
                          >
                            Approve
                          </Button>
                          <Button
                            align="right"
                            variant="contained"
                            color="error"
                            onClick={() => onDeclineClick(row.username)}
                          >
                            Decline & Delete
                          </Button>
                        </>
                      )}
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

export default AdminCoach;
