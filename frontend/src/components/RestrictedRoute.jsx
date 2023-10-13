import { useContext } from "react";
import { AuthenticationContext } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

import { Typography, Button, Container, Paper, Box } from "@mui/material";

export function RestrictedRoute({ allowedRoles = [], children }) {
  const [authenticatedUser] = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const userIsAuthorized =
    authenticatedUser && allowedRoles.includes(authenticatedUser.role);

  return userIsAuthorized ? (
    children
  ) : (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Box p={3} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Not Authorized
          </Typography>
          <Typography variant="body1" paragraph>
            Access role is not permitted to view this page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
