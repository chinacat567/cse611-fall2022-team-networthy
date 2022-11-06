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
  approveCoach,
  deleteCoachProfile,
  getAllCoaches,
} from "../../redux/slices/coachSlice";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ROUTES } from "../App/routeConfig";
import { showLoader } from "../../redux/slices/loaderSlice";

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
    dispatch(getAllCoaches());
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
        <h2>Coach Profiles</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Firstname</TableCell>
                <TableCell align="right">Lastname</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">DOB</TableCell>
                <TableCell align="right">EmailID</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  Education
                </TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  What is your why?
                </TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  Credentials
                </TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Occupation</TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  University
                </TableCell>
                <TableCell align="right" className="tableCell--xxl">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coachData &&
                coachData.map((row) => (
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
                    <TableCell align="right">{row.emailId}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right" className="tableCell--xxl">
                      {row.education}
                    </TableCell>
                    <TableCell align="right" className="tableCell--xxl">
                      {row.general}
                    </TableCell>
                    <TableCell align="right" className="tableCell--xxl">
                      {row.credentials}
                    </TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.occupation}</TableCell>
                    <TableCell align="right">{row.university}</TableCell>
                    <TableCell align="right">
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

export default AdminCoach;
