import { Stack, MenuItem, TextField } from "@mui/material";

import { PostTypes } from "@/constants/postTypes";

import styles from "./Search.styles";

const Search = ({
  typeFilter,
  setTypeFilter,
}: {
  typeFilter: PostTypes | "All";
  setTypeFilter: (type: PostTypes | "All") => void;
}) => {
  return (
    <Stack sx={styles.container}>
      <TextField
        select
        value={typeFilter}
        onChange={({ target }) =>
          setTypeFilter(target.value as PostTypes | "All")
        }
      >
        <MenuItem value="All">All Posts</MenuItem>
        {Object.values(PostTypes).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default Search;
