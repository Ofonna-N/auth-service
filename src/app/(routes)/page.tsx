import Link from "next/link";
import { APP_ROUTES } from "@/src/constants/paths";

// Material-UI Components
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  AppBar,
  Toolbar,
} from "@mui/material";

// React Icons
import {
  FiLock,
  FiKey,
  FiShield,
  FiServer,
  FiDatabase,
  FiCode,
} from "react-icons/fi";
import { FiGithub } from "react-icons/fi";

const features = [
  { icon: <FiLock />, text: "Secure User Registration & Login" },
  { icon: <FiKey />, text: "Stateful, Database-Backed Sessions" },
  { icon: <FiShield />, text: "Password Hashing with Argon2id" },
  { icon: <FiServer />, text: "Server-Side Protected Routes via Middleware" },
];

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "Material-UI",
  "TanStack Query",
  "React Hook Form",
  "Zod",
];

export default function LandingPage() {
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: "1px solid #e0e0e0" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Auth Service
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href={APP_ROUTES.login}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href={APP_ROUTES.signUp}
          >
            Sign Up
          </Button>
          <Button
            variant="text"
            color="inherit"
            href="https://github.com/Ofonna-N/auth-service"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: 2 }}
            startIcon={<FiGithub />}
          >
            GitHub
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            mb: 6,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Full-Stack User Authentication Service
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            A concise implementation demonstrating a "glass box" approach to
            building a secure, session-based authentication system from scratch.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href={APP_ROUTES.signUp}
          >
            Get Started
          </Button>
        </Paper>

        <Grid container spacing={4}>
          {/* Key Features Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FiCode style={{ verticalAlign: "bottom", marginRight: 8 }} />
                Key Features
              </Typography>
              <List>
                {features.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Tech Stack Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FiDatabase
                  style={{ verticalAlign: "bottom", marginRight: 8 }}
                />
                Technology Stack
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {techStack.map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
