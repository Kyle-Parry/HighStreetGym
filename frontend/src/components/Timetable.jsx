import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Box, Button } from "@mui/material";
export default function Timetable() {
  const gymClasses = [
    { id: 1, title: "Yoga", date: "2023-07-31", trainer: "jim", time: "10am" },
    {
      id: 2,
      title: "Pilates",
      date: "2023-07-31",
      trainer: "jim",
      time: "10am",
    },
    { id: 3, title: "Zumba", date: "2023-08-01", trainer: "jim", time: "10am" },
    {
      id: 4,
      title: "Spinning",
      date: "2023-08-01",
      trainer: "jim",
      time: "10am",
    },
  ];

  const groupedClasses = gymClasses.reduce((acc, gymClass) => {
    const { date } = gymClass;
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString(undefined, {
      weekday: "long",
    });
    const formattedDate = dateObj.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    acc[dayOfWeek] = acc[dayOfWeek] || { classes: [], formattedDate };
    acc[dayOfWeek].classes.push(gymClass);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedClasses).map(
        ([day, { classes, formattedDate }]) => (
          <Paper key={day} sx={{ p: 2, my: 2 }}>
            <Typography variant="h5">
              {day} {formattedDate}
            </Typography>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "50px",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold", width: "80px" }}>
                Class
              </Typography>
              <Typography sx={{ fontWeight: "bold", width: "80px" }}>
                Trainer
              </Typography>
              <Typography sx={{ fontWeight: "bold", width: "80px" }}>
                Time
              </Typography>
              <Typography sx={{ fontWeight: "bold", width: "80px" }}>
                Book Class
              </Typography>
            </Box>
            {classes.map((gymClass) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "50px",
                  textAlign: "center",
                }}
                key={gymClass.id}
              >
                <Typography sx={{ width: "80px" }}>{gymClass.title}</Typography>
                <Typography sx={{ width: "80px" }}>
                  {gymClass.trainer}
                </Typography>
                <Typography sx={{ width: "80px" }}>{gymClass.time}</Typography>
                <Button sx={{ width: "80px" }}>Book</Button>
              </Box>
            ))}
          </Paper>
        )
      )}
    </div>
  );
}
