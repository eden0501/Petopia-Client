import { useState } from "react";
import { PostTypes } from "../constants/postTypes";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import {
  Stack,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";

const Search = () => {
  const [filter, setFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  return (
    <Stack sx={{ padding: 10, gap: 10 }}>
      <TextField
        select
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
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
