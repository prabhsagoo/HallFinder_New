import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import "./HallTable.css";
import { styled } from "@mui/material/styles";

function createData(website, phone, address, email, fax) {
  return { website, phone, address, email, fax };
}

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#112d32",
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
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

const HallTable = (props) => {
  let state = props.value;
  console.log(state);
  //Todo: create function to find array index e.g. [5] below from name
  const communityWebsite =
    state.communityAssociationInformation.communityAssociationWebsite;
  const communityPhone =
    state.communityAssociationInformation.facilityPhoneNumber;
  const communityAddress =
    state.communityAssociationInformation.facilityLocatedat;
  const communityEmail = state.communityAssociationInformation.facilityEmail;
  const communityFax = state.communityAssociationInformation.facilityFaxNumber;

  const programsArt = state.programs.artClasses;
  const programsBingo = state.programs.bingo;
  const programsChildCare = state.programs.childCare;
  const programsDance = state.programs.dance;
  const programsFitness = state.programs.fitness;
  const programsSeniorsProgram = state.programs.seniorsProgram;
  const programsSports = state.programs.sports;
  const programsYouthJustice = state.programs.youthJustice;

  let amenities = state.recreationAmenities;

  const facilities = state.communityAssociationFacilities;

  // const facilitiesArray = [
  //   communityData[5].
  //  ]

  const rows = [
    createData(
      communityWebsite,
      communityPhone,
      communityAddress,
      communityEmail,
      communityFax
    ),
  ];

  const programRows = [
    createData(programsArt),
    createData(programsBingo),
    createData(programsChildCare),
    createData(programsDance),
    createData(programsFitness),
    createData(programsSeniorsProgram),
    createData(programsSports),
    createData(programsYouthJustice),
  ];
  return (
    <>
      {/* Contact Details Table */}
      <div className="TableBody">
        <TableContainer
          classname="table-container"
          sx={{
            flexWrap: "wrap",
            tableLayout: "auto",
            border: 0,
            maxWidth: 0.5,
            top: 150,
            // justifyContent: 'space-around'
          }}
          component="Paper"
        >
          <Table sx={{ minWidth: 250 }} aria-label="Hall Details" size="small">
            <TableHead>
              <TableRow
              // style={{ width: 1 }}
              >
                {/* <TableCell colSpan={5}>Hall Details</TableCell> */}
              </TableRow>
              <TableRow className="TableHead1">
                <StyledTableCell width="200">Website </StyledTableCell>
                <StyledTableCell align="center">Phone </StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Email </StyledTableCell>
                <StyledTableCell align="center">Fax </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.website}
                  sx={{ "&:last-child td, &:last-child th": { boxShadow: 2 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.website}
                  </TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.fax}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Community Facilities Table */}
        <div className="TableRemData">
          <TableContainer className="TableData1"
            sx={{
              flexWrap: "wrap",
              tableLayout: "auto",
                right:0,
              maxWidth: 0.5,
              mt: 3,
            }}
          >
            <Table
              sx={{ display: "inline", maxWidth: 0.5 }}
              aria-label="Community Facilities"
            >
              <TableHead className="TableHead1">
                <TableRow>
                  <StyledTableCell colSpan={2} align="center">
                    Community Facilities
                  </StyledTableCell>
                </TableRow>
                <TableRow className="tablehall">
                  <TableCell style={{ fontWeight: "bold" }}>
                    Facility Type:
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Available:
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tablehall">
                <TableRow>
                  <TableCell>Games Room:</TableCell>
                  <TableCell align="center">{facilities.gamesRoom}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gym:</TableCell>
                  <TableCell align="center">{facilities.gym}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Indoor Fireplace:</TableCell>
                  <TableCell align="center">
                    {facilities.indoorFireplace}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kitchen:</TableCell>
                  <TableCell align="center">{facilities.kitchen}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lounge:</TableCell>
                  <TableCell align="center">{facilities.lounge}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Meeting Rooms:</TableCell>
                  <TableCell align="center">
                    {facilities.meetingRooms}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Outdoor BBQ:</TableCell>
                  <TableCell align="center">{facilities.outdoorBBQ}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kitchen:</TableCell>
                  <TableCell align="center">{facilities.soundSystem}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Stage:</TableCell>
                  <TableCell align="center">{facilities.stage}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Wheelchair Access:</TableCell>
                  <TableCell align="center">
                    {facilities.wheelchairAccess}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Programs Table */}
          <TableContainer
            className="TableData2"
            sx={{
                mt: 3,
              }}
          >
            <Table
              sx={{ display: "inline", maxWidth: 0.5 }}
              aria-label="Programs"
            >
              <TableHead className="TableHead1">
                <TableRow>
                  <StyledTableCell width="300" colSpan={2} align="center">
                    Programs
                  </StyledTableCell>
                </TableRow>
                <TableRow className="tablehall">
                  <TableCell style={{ fontWeight: "bold" }}>
                    Program Type
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Available:
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tablehall">
                <TableRow>
                  <TableCell center>Art Classes:</TableCell>
                  <TableCell align="center">{programsArt}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell center>Bingo:</TableCell>
                  <TableCell align="center">{programsBingo}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell center>Childcare:</TableCell>
                  <TableCell align="center">{programsChildCare}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell center>Dance:</TableCell>
                  <TableCell align="center">{programsDance}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell center>Fitness:</TableCell>
                  <TableCell align="center">{programsFitness}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell center>Seniors Program:</TableCell>
                  <TableCell align="center">{programsSeniorsProgram}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Sports:</TableCell>
                  <TableCell align="center">{programsSports}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell center>Youth Justice:</TableCell>
                  <TableCell align="center">{programsYouthJustice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer
          className="TableData3"
            sx={{
              flexWrap: "wrap",
              maxWidth: 1,
              mt: 3,
            }}
          >
            {/* Recreation Amenities Table */}
            <Table
                            sx={{ display: "inline", maxWidth: 0.5 }}

              aria-label="Recreation Amenities"
            >
              <TableHead className="TableHead1">
                <TableRow>
                  <StyledTableCell  colSpan={2} align="center">
                    Recreation Amenities
                  </StyledTableCell>
                </TableRow>
                <TableRow className="tablehall">
                  <TableCell style={{ fontWeight: "bold" }}>
                    Amenity Type
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Available:
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tablehall">
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell center>Hockey Rink:</TableCell>
                  <TableCell align="center">{amenities.hockeyRink}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell center>Skating Rink:</TableCell>
                  <TableCell align="center">{amenities.skatingRink}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell center>Sports Fields:</TableCell>
                  <TableCell align="center">
                    {amenities.sportsPlayfields}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell center>Swimming Pool:</TableCell>
                  <TableCell align="center">{amenities.swimmingPool}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell center>Tennis Courts:</TableCell>
                  <TableCell align="center">{amenities.tennisCourts}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell center>Other:</TableCell>
                  <TableCell align="center">{amenities.other}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* <Table sx={{ maxWidth: 0.5}} aria-label=""></Table>
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          <TableRow>
            <TableCell> </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
      </div>
    </>
  );
};

export default HallTable;
