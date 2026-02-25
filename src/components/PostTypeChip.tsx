import { Chip } from "@mui/material";
import { PostTypes } from "../constants/postTypes";
import {
  HelpOutlineRounded,
  TipsAndUpdatesOutlined,
  VolunteerActivismOutlined,
  ReportGmailerrorredRounded,
} from "@mui/icons-material";
import type { JSX } from "react";

const CHIP_PROPS: Record<
  PostTypes,
  {
    color:
      | "error"
      | "default"
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning";
    icon: JSX.Element;
    label: string;
  }
> = {
  [PostTypes.REPORT]: {
    icon: <ReportGmailerrorredRounded />,
    label: "Report",
    color: "error",
  },
  [PostTypes.DONATION]: {
    icon: <VolunteerActivismOutlined />,
    label: "Donation",
    color: "success",
  },
  [PostTypes.KNOWLEDGE]: {
    icon: <TipsAndUpdatesOutlined />,
    label: "Knowledge",
    color: "info",
  },
  [PostTypes.OTHER]: {
    icon: <HelpOutlineRounded />,
    label: "Other",
    color: "warning",
  },
};

const PostTypeChip = ({ postType }: { postType: PostTypes }) => (
  <Chip {...CHIP_PROPS[postType]} />
);

export default PostTypeChip;
