import { useQuery } from "@tanstack/react-query";
import { getRandomFact } from "../services/animalFact.service";
import { AutoAwesomeOutlined, Cached } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

const PetFact = () => {
  const { data: fact, refetch } = useQuery({
    queryKey: ["animalFact"],
    queryFn: getRandomFact,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Box
      sx={{
        gap: 16,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF4E5",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar sx={{ backgroundColor: "primary.main" }}>
          <AutoAwesomeOutlined sx={{ fontSize: 20, color: "white" }} />
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
            Fun Pet Fact
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
            Sponsored
          </Typography>
        </Box>

        <IconButton onClick={() => refetch()} sx={{ padding: 0 }}>
          <Cached sx={{ fontSize: 20, color: "text.primary" }} />
        </IconButton>
      </Box>

      <Typography>{fact}</Typography>
    </Box>
  );
};

export default PetFact;
