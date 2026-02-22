import { SvgIcon, type SvgIconOwnProps } from "@mui/material";

const PawPrint = (props: SvgIconOwnProps) => (
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
      <path
        fill="#000000"
        d="M11,4m-2,0a2,2 0,1 1,4 0a2,2 0,1 1,-4 0"
        fillOpacity={0}
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
      <path
        fill="#000000"
        d="M18,8m-2,0a2,2 0,1 1,4 0a2,2 0,1 1,-4 0"
        fillOpacity={0}
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
      <path
        fill="#000000"
        d="M20,16m-2,0a2,2 0,1 1,4 0a2,2 0,1 1,-4 0"
        fillOpacity={0}
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
      <path
        fill="#000000"
        d="M9,10a5,5 0,0 1,5 5v3.5a3.5,3.5 0,0 1,-6.84 1.045Q6.52,17.48 4.46,16.84A3.5,3.5 0,0 1,5.5 10Z"
        fillOpacity={0}
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
    </g>
  </SvgIcon>
);

export default PawPrint;
