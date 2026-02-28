import { Chip } from "@mui/material";
import { CHIP_PROPS, PostTypes } from "../constants/postTypes";

const PostTypeChip = ({ postType }: { postType: PostTypes }) => (
  <Chip {...CHIP_PROPS[postType]} />
);

export default PostTypeChip;
