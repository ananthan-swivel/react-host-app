import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";

// Dummy log data
const initialLogs = [
  { id: 1, message: "Build succeeded", status: "success" },
  { id: 2, message: "Build failed", status: "failed" },
  { id: 3, message: "Running...", status: "running" },
];

const statusColor = {
  success: "success",
  failed: "error",
  running: "info",
} as const;
type LogStatus = keyof typeof statusColor;

export default function LogSync() {
  const [logs, setLogs] = useState(initialLogs);
  const [cookies, setCookies] = useState("");

  const handleRetry = (id: number) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === id
          ? { ...log, message: "Retrying...", status: "running" }
          : log,
      ),
    );
  };

  React.useEffect(() => {
    setCookies(document.cookie);
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 2,
        border: "1px solid #eee",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Log Sync
      </Typography>
      <List>
        {logs.map((log) => (
          <ListItem
            key={log.id}
            secondaryAction={
              log.status === "failed" && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleRetry(log.id)}
                >
                  Retry
                </Button>
              )
            }
          >
            <ListItemText primary={log.message} />
            <Chip
              label={log.status}
              color={statusColor[log.status as LogStatus]}
              size="small"
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2">Cookies:</Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {cookies ? cookies : "No cookies set."}
        </Typography>
      </Box>
    </Box>
  );
}
