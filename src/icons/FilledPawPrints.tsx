import PawPrint from "./PawPrint";
import { SvgIcon, type SvgIconOwnProps } from "@mui/material";

const FilledPawPrint = (props: SvgIconOwnProps) => (
  <SvgIcon
    id="vector"
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#F54A00"
      d="M20,20m-20,0a20,20 0,1 1,40 0a20,20 0,1 1,-40 0"
      id="path_0"
    />
    <g transform="translate(10, 10) scale(0.833, 0.833)" id="g_0">
      <PawPrint />
    </g>
  </SvgIcon>
);

export default FilledPawPrint;
