import { useState } from "react";
import styles from "./Search.styles";
import { PostTypes } from "../../constants/postTypes";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import {
  Stack,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";

const Search = ({
  typeFilter,
  setTypeFilter,
}: {
  typeFilter: PostTypes | "All";
  setTypeFilter: (type: PostTypes | "All") => void;
}) => {
  const [searchValue, setSearchValue] = useState("");

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
      <TextField
        placeholder="Search posts, hashtags, authors..."
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment onClick={() => setSearchValue("")} position="end">
                <IconButton edge="end">
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
};

export default Search;
