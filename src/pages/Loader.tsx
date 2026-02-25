import PawPrint from "../icons/PawPrint";
import { useQuery } from "@tanstack/react-query";
import { getRandomFact } from "../services/animalFact.service";
import { Box, Skeleton, Stack, Typography } from "@mui/material";

const Loader = () => {
  const { data: fact, isLoading: loading } = useQuery({
    queryKey: ["animalFact"],
    queryFn: getRandomFact,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Stack
      alignItems="center"
      sx={{
        gap: 20,
        padding: 30,
        height: "100%",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "primary.main",
      }}
    >
      <Skeleton
        variant="circular"
        sx={{
          bgcolor: "transparent",
          "& > *": {
            visibility: "visible !important",
          },
        }}
      >
        <PawPrint sx={{ fontSize: "7rem", color: "white" }} />
      </Skeleton>

      <Box>
        <Typography
          sx={{ fontSize: "3rem", color: "white", fontWeight: "bold" }}
        >
          Petopia
        </Typography>
        <Typography sx={{ color: "white", opacity: 0.8, fontSize: "1rem" }}>
          Loading your pet community...
        </Typography>
      </Box>

      {!loading && fact && (
        <Box
          sx={{
            borderRadius: 3,
            color: "white",
            padding: "20px 10px",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <Typography sx={{ opacity: 0.8, marginBottom: 5 }}>
            Did you know?
          </Typography>
          <Typography>{fact}</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default Loader;
