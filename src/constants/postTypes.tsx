import {
  HelpOutlineRounded,
  TipsAndUpdatesOutlined,
  VolunteerActivismOutlined,
  ReportGmailerrorredRounded,
} from "@mui/icons-material";
import type { JSX } from "react";

export enum PostTypes {
  REPORT = "Report",
  KNOWLEDGE = "Knowledge",
  DONATION = "Donation",
  OTHER = "Other",
}

export const CHIP_PROPS: Record<
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
    description: string;
  }
> = {
  [PostTypes.REPORT]: {
    icon: <ReportGmailerrorredRounded />,
    label: "Report",
    color: "error",
    description:
      "Report urgent animal distress situations that need immediate community help",
  },
  [PostTypes.DONATION]: {
    icon: <VolunteerActivismOutlined />,
    label: "Donation",
    color: "success",
    description:
      "Offer pet equipment and supplies for donation to help animals in need",
  },
  [PostTypes.KNOWLEDGE]: {
    icon: <TipsAndUpdatesOutlined />,
    label: "Knowledge",
    color: "info",
    description:
      "Share your expertise and knowledge to help others care for their pets",
  },
  [PostTypes.OTHER]: {
    icon: <HelpOutlineRounded />,
    label: "Other",
    color: "warning",
    description:
      "Share pet-related content that doesn't fit into the other categories",
  },
};
