import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

// https://react-svgr.com/playground/?native=true&typescript=true

// Table of contents
// - Analysis (light, dark, custom)
// - AngleLeft (Custom)
// - AngleRight (Custom)
// - Award (light, dark, custom)
// - Bell (custom)
// - Bookmark (light, dark, custom)
// - Capsule (light, dark, custom)
// - Check (custom)
// - Edit (custom)
// - Eye (custom)
// - EyeSlash (custom)
// - File (light, dark, custom)
// - Fire (light, dark, custom)
// - Heartbeat (light, dark, custom)
// - Heartrate (light, dark, custom)
// - Home (light, dark, custom)
// - Info (custom)
// - Medal (light, dark, custom)
// - Pen (custom)
// - Plus (light, dark, custom)
// - Restaurant (light, dark, custom)
// - Search (custom)
// - Times (custom)
// - Tear (custom)
// - Share (custom)
// - 

interface IconProps extends SvgProps {
  color?: string;
  size?: number;
}

const colorLight = "#ffffff";
const colorDark = "#000000";
const colorDefault = "#000000"; // for custom one
const sizeDefault = 24; // for custom one
const strokeWidth = 0.1;

export const AnalysisLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M21.71 7.29a1.001 1.001 0 0 0-1.42 0L14 13.59l-4.29-4.3a1 1 0 0 0-1.42 0l-6 6a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 11.41l4.29 4.3a1.002 1.002 0 0 0 1.42 0l7-7a1 1 0 0 0 0-1.42Z"
    />
  </Svg>
);

export const AnalysisDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M21.71 7.29a1.001 1.001 0 0 0-1.42 0L14 13.59l-4.29-4.3a1 1 0 0 0-1.42 0l-6 6a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 11.41l4.29 4.3a1.002 1.002 0 0 0 1.42 0l7-7a1 1 0 0 0 0-1.42Z"
    />
  </Svg>
);

export const AnalysisCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M21.71 7.29a1.001 1.001 0 0 0-1.42 0L14 13.59l-4.29-4.3a1 1 0 0 0-1.42 0l-6 6a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 11.41l4.29 4.3a1.002 1.002 0 0 0 1.42 0l7-7a1 1 0 0 0 0-1.42Z"
    />
  </Svg>
);

export const AngleLeftCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="m8.5 12.8 5.7 5.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-4.9-5 4.9-5c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6 0-.1 0-.1 0 0Z"
    />
  </Svg>
);

export const AngleRightCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M15.54 11.29 9.88 5.64a1 1 0 1 0-1.42 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.3.999.999 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47Z"
    />
  </Svg>
);

export const AwardLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="m20.87 17.25-2.71-4.68A7 7 0 1 0 5 9.25a6.9 6.9 0 0 0 .84 3.32l-2.71 4.68a1 1 0 0 0 .87 1.5h2.87l1.46 2.46c.05.082.11.156.18.22a1 1 0 0 0 .69.28h.14a1 1 0 0 0 .73-.49L12 17.9l1.93 3.35a1 1 0 0 0 .73.48h.14a1 1 0 0 0 .7-.28.87.87 0 0 0 .17-.21l1.46-2.46H20a1 1 0 0 0 .87-.5 1 1 0 0 0 0-1.03ZM9.19 18.78l-.89-1.49a1 1 0 0 0-.85-.49H5.72l1.43-2.48a7 7 0 0 0 3.57 1.84l-1.53 2.62ZM12 14.25a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm4.55 2.55a.999.999 0 0 0-.85.49l-.89 1.49-1.52-2.65a7.06 7.06 0 0 0 3.56-1.84l1.43 2.48-1.73.03Z"
    />
  </Svg>
);

export const AwardDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="m20.87 17.25-2.71-4.68A7 7 0 1 0 5 9.25a6.9 6.9 0 0 0 .84 3.32l-2.71 4.68a1 1 0 0 0 .87 1.5h2.87l1.46 2.46c.05.082.11.156.18.22a1 1 0 0 0 .69.28h.14a1 1 0 0 0 .73-.49L12 17.9l1.93 3.35a1 1 0 0 0 .73.48h.14a1 1 0 0 0 .7-.28.87.87 0 0 0 .17-.21l1.46-2.46H20a1 1 0 0 0 .87-.5 1 1 0 0 0 0-1.03ZM9.19 18.78l-.89-1.49a1 1 0 0 0-.85-.49H5.72l1.43-2.48a7 7 0 0 0 3.57 1.84l-1.53 2.62ZM12 14.25a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm4.55 2.55a.999.999 0 0 0-.85.49l-.89 1.49-1.52-2.65a7.06 7.06 0 0 0 3.56-1.84l1.43 2.48-1.73.03Z"
    />
  </Svg>
);

export const AwardCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="m20.87 17.25-2.71-4.68A7 7 0 1 0 5 9.25a6.9 6.9 0 0 0 .84 3.32l-2.71 4.68a1 1 0 0 0 .87 1.5h2.87l1.46 2.46c.05.082.11.156.18.22a1 1 0 0 0 .69.28h.14a1 1 0 0 0 .73-.49L12 17.9l1.93 3.35a1 1 0 0 0 .73.48h.14a1 1 0 0 0 .7-.28.87.87 0 0 0 .17-.21l1.46-2.46H20a1 1 0 0 0 .87-.5 1 1 0 0 0 0-1.03ZM9.19 18.78l-.89-1.49a1 1 0 0 0-.85-.49H5.72l1.43-2.48a7 7 0 0 0 3.57 1.84l-1.53 2.62ZM12 14.25a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm4.55 2.55a.999.999 0 0 0-.85.49l-.89 1.49-1.52-2.65a7.06 7.06 0 0 0 3.56-1.84l1.43 2.48-1.73.03Z"
    />
  </Svg>
);

export const BellCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M18 13.18V10a6 6 0 0 0-5-5.91V3a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 10v3.18A3 3 0 0 0 4 16v2a1 1 0 0 0 1 1h3.14a4 4 0 0 0 7.72 0H19a1 1 0 0 0 1-1v-2a3 3 0 0 0-2-2.82ZM8 10a4 4 0 0 1 8 0v3H8v-3Zm4 10a2 2 0 0 1-1.72-1h3.44A2 2 0 0 1 12 20Zm6-3H6v-1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1Z"
    />
  </Svg>
);

export const BookmarkLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M16 2H8a3 3 0 0 0-3 3v16a1 1 0 0 0 1.5.87l5.5-3.18 5.5 3.18a1 1 0 0 0 .5.13 1 1 0 0 0 .5-.13A1 1 0 0 0 19 21V5a3 3 0 0 0-3-3Zm1 17.27-4.5-2.6a1 1 0 0 0-1 0L7 19.27V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14.27Z"
    />
  </Svg>
);

export const BookmarkDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M16 2H8a3 3 0 0 0-3 3v16a1 1 0 0 0 1.5.87l5.5-3.18 5.5 3.18a1 1 0 0 0 .5.13 1 1 0 0 0 .5-.13A1 1 0 0 0 19 21V5a3 3 0 0 0-3-3Zm1 17.27-4.5-2.6a1 1 0 0 0-1 0L7 19.27V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14.27Z"
    />
  </Svg>
);

export const BookmarkCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M18 2H6a1 1 0 0 0-1 1v18a1 1 0 0 0 1.65.76L12 17.27l5.29 4.44A.999.999 0 0 0 18 22a.84.84 0 0 0 .38-.08A1 1 0 0 0 19 21V3a1 1 0 0 0-1-1Zm-1 16.86-4.36-3.66a1 1 0 0 0-1.28 0L7 18.86V4h10v14.86Z"
    />
  </Svg>
);

export const BookmarkFilledCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#4800FF"
      fillRule="evenodd"
      d="M6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-.62.92.84.84 0 0 1-.38.08.998.998 0 0 1-.71-.29L12 17.27l-5.35 4.49A1 1 0 0 1 5 21V3a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </Svg>
);

export const CapsuleLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M19.5 4.5a5.12 5.12 0 0 0-7.24 0L4.5 12.26a5.12 5.12 0 1 0 7.24 7.24l7.76-7.76a5.12 5.12 0 0 0 0-7.24Zm-9.18 13.59a3.21 3.21 0 0 1-4.41 0 3.13 3.13 0 0 1 0-4.41l3.18-3.18 4.41 4.41-3.18 3.18Zm7.77-7.77-3.18 3.18-4.41-4.41 3.18-3.18a3.12 3.12 0 0 1 4.41 4.41Z"
    />
  </Svg>
);

export const CapsuleDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M19.5 4.5a5.12 5.12 0 0 0-7.24 0L4.5 12.26a5.12 5.12 0 1 0 7.24 7.24l7.76-7.76a5.12 5.12 0 0 0 0-7.24Zm-9.18 13.59a3.21 3.21 0 0 1-4.41 0 3.13 3.13 0 0 1 0-4.41l3.18-3.18 4.41 4.41-3.18 3.18Zm7.77-7.77-3.18 3.18-4.41-4.41 3.18-3.18a3.12 3.12 0 0 1 4.41 4.41Z"
    />
  </Svg>
);

export const CapsuleCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M19.5 4.5a5.12 5.12 0 0 0-7.24 0L4.5 12.26a5.12 5.12 0 1 0 7.24 7.24l7.76-7.76a5.12 5.12 0 0 0 0-7.24Zm-9.18 13.59a3.21 3.21 0 0 1-4.41 0 3.13 3.13 0 0 1 0-4.41l3.18-3.18 4.41 4.41-3.18 3.18Zm7.77-7.77-3.18 3.18-4.41-4.41 3.18-3.18a3.12 3.12 0 0 1 4.41 4.41Z"
    />
  </Svg>
);

export const CheckCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M18.71 7.21a.999.999 0 0 0-1.42 0l-7.45 7.46-3.13-3.14A1.022 1.022 0 0 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a.999.999 0 0 0 0-1.47Z"
    />
  </Svg>
);

export const EditCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M5 18h4.24a1.002 1.002 0 0 0 .71-.29l6.92-6.93L19.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83-6.94 6.93a.999.999 0 0 0-.29.71V17a1 1 0 0 0 1 1Zm9.76-13.59 2.83 2.83-1.42 1.42-2.83-2.83 1.42-1.42ZM6 13.17l5.93-5.93 2.83 2.83L8.83 16H6v-2.83ZM21 20H3a1 1 0 1 0 0 2h18a1 1 0 0 0 0-2Z"
    />
  </Svg>
);

export const EyeCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M21.92 11.6C19.9 6.91 16.1 4 12 4s-7.9 2.91-9.92 7.6a1 1 0 0 0 0 .8C4.1 17.09 7.9 20 12 20s7.9-2.91 9.92-7.6a.999.999 0 0 0 0-.8ZM12 18c-3.17 0-6.17-2.29-7.9-6C5.83 8.29 8.83 6 12 6s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
    />
  </Svg>
);

export const EyeSlashCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M10.94 6.08c.35-.054.705-.08 1.06-.08 3.18 0 6.17 2.29 7.91 6a15.23 15.23 0 0 1-.9 1.64 1 1 0 0 0 .05 1.152 1 1 0 0 0 1.65-.102 15.78 15.78 0 0 0 1.21-2.3 1 1 0 0 0 0-.79C19.9 6.91 16.1 4 12 4a7.77 7.77 0 0 0-1.4.12 1.014 1.014 0 1 0 .34 2v-.04ZM3.71 2.29a1.004 1.004 0 1 0-1.42 1.42l3.1 3.09a14.62 14.62 0 0 0-3.31 4.8 1 1 0 0 0 0 .8C4.1 17.09 7.9 20 12 20a9.26 9.26 0 0 0 5.05-1.54l3.24 3.25a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095l-18-18Zm6.36 9.19 2.45 2.45a2 2 0 0 1-2.45-2.45ZM12 18c-3.18 0-6.17-2.29-7.9-6a12.09 12.09 0 0 1 2.7-3.79L8.57 10A4 4 0 0 0 14 15.43L15.59 17A7.24 7.24 0 0 1 12 18Z"
    />
  </Svg>
);

export const FileLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm11-3.06a1.307 1.307 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.071 1.071 0 0 0-.28-.19.32.32 0 0 0-.09 0 .88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const FileDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm11-3.06a1.307 1.307 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.071 1.071 0 0 0-.28-.19.32.32 0 0 0-.09 0 .88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const FileCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm11-3.06a1.307 1.307 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.071 1.071 0 0 0-.28-.19.32.32 0 0 0-.09 0 .88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const FireLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="m8.468 8.395-.003.002-.002.002.005-.004Zm9.954-.187a1.236 1.236 0 0 0-.23-.175 1 1 0 0 0-1.4.412 5.78 5.78 0 0 1-1.398 1.777 8.713 8.713 0 0 0-4.267-9.092 1 1 0 0 0-1.49.806 7.017 7.017 0 0 1-2.472 4.942l-.23.188a8.513 8.513 0 0 0-1.988 1.862 8.984 8.984 0 0 0 3.656 13.908 1 1 0 0 0 1.327-1.238 6.977 6.977 0 0 1-.19-2.581 9.004 9.004 0 0 0 4.313 4.016c.225.101.48.115.715.038a8.995 8.995 0 0 0 3.654-14.863ZM14.517 21.04a6.965 6.965 0 0 1-3.577-4.402 8.929 8.929 0 0 1-.18-.964 1 1 0 0 0-1.857-.362 8.959 8.959 0 0 0-1.205 4.718 6.986 6.986 0 0 1-1.176-9.869 6.555 6.555 0 0 1 1.562-1.458.745.745 0 0 0 .075-.054s.296-.246.306-.251a8.967 8.967 0 0 0 2.9-4.633 6.736 6.736 0 0 1 1.385 8.088 1 1 0 0 0 1.184 1.418 7.855 7.855 0 0 0 3.862-2.688 7 7 0 0 1-3.279 10.457Z"
    />
  </Svg>
);

export const FireDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="m8.468 8.395-.003.002-.002.002.005-.004Zm9.954-.187a1.236 1.236 0 0 0-.23-.175 1 1 0 0 0-1.4.412 5.78 5.78 0 0 1-1.398 1.777 8.713 8.713 0 0 0-4.267-9.092 1 1 0 0 0-1.49.806 7.017 7.017 0 0 1-2.472 4.942l-.23.188a8.513 8.513 0 0 0-1.988 1.862 8.984 8.984 0 0 0 3.656 13.908 1 1 0 0 0 1.327-1.238 6.977 6.977 0 0 1-.19-2.581 9.004 9.004 0 0 0 4.313 4.016c.225.101.48.115.715.038a8.995 8.995 0 0 0 3.654-14.863ZM14.517 21.04a6.965 6.965 0 0 1-3.577-4.402 8.929 8.929 0 0 1-.18-.964 1 1 0 0 0-1.857-.362 8.959 8.959 0 0 0-1.205 4.718 6.986 6.986 0 0 1-1.176-9.869 6.555 6.555 0 0 1 1.562-1.458.745.745 0 0 0 .075-.054s.296-.246.306-.251a8.967 8.967 0 0 0 2.9-4.633 6.736 6.736 0 0 1 1.385 8.088 1 1 0 0 0 1.184 1.418 7.855 7.855 0 0 0 3.862-2.688 7 7 0 0 1-3.279 10.457Z"
    />
  </Svg>
);

export const FireCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="m8.468 8.395-.003.002-.002.002.005-.004Zm9.954-.187a1.236 1.236 0 0 0-.23-.175 1 1 0 0 0-1.4.412 5.78 5.78 0 0 1-1.398 1.777 8.713 8.713 0 0 0-4.267-9.092 1 1 0 0 0-1.49.806 7.017 7.017 0 0 1-2.472 4.942l-.23.188a8.513 8.513 0 0 0-1.988 1.862 8.984 8.984 0 0 0 3.656 13.908 1 1 0 0 0 1.327-1.238 6.977 6.977 0 0 1-.19-2.581 9.004 9.004 0 0 0 4.313 4.016c.225.101.48.115.715.038a8.995 8.995 0 0 0 3.654-14.863ZM14.517 21.04a6.965 6.965 0 0 1-3.577-4.402 8.929 8.929 0 0 1-.18-.964 1 1 0 0 0-1.857-.362 8.959 8.959 0 0 0-1.205 4.718 6.986 6.986 0 0 1-1.176-9.869 6.555 6.555 0 0 1 1.562-1.458.745.745 0 0 0 .075-.054s.296-.246.306-.251a8.967 8.967 0 0 0 2.9-4.633 6.736 6.736 0 0 1 1.385 8.088 1 1 0 0 0 1.184 1.418 7.855 7.855 0 0 0 3.862-2.688 7 7 0 0 1-3.279 10.457Z"
    />
  </Svg>
);

export const HeartbeatLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M21 10.41h-2.5a1 1 0 0 0-.71.3L16.55 12l-2.8-3.19a1 1 0 0 0-1.46 0l-1.7 1.7H9a1 1 0 1 0 0 2h2a1 1 0 0 0 .71-.29L13 10.88l2.8 3.19a1.001 1.001 0 0 0 .72.34 1 1 0 0 0 .71-.29l1.7-1.71H21a1 1 0 0 0 0-2Zm-7.39 5.3-1.9 1.9a1.002 1.002 0 0 1-1.42 0L5.08 12.4a3.69 3.69 0 0 1 0-5.22 3.69 3.69 0 0 1 5.21 0 1 1 0 0 0 1.42 0 3.78 3.78 0 0 1 5.21 0c.223.226.418.478.58.75a1 1 0 0 0 1.72-1 6.001 6.001 0 0 0-.88-1.13A5.68 5.68 0 0 0 11 5.17a5.68 5.68 0 0 0-8.566 6.788A5.62 5.62 0 0 0 3.67 13.79L8.88 19a3 3 0 0 0 4.24 0L15 17.12a1 1 0 0 0 0-1.41 1 1 0 0 0-1.39 0Z"
    />
  </Svg>
);

export const HeartbeatDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M21 10.41h-2.5a1 1 0 0 0-.71.3L16.55 12l-2.8-3.19a1 1 0 0 0-1.46 0l-1.7 1.7H9a1 1 0 1 0 0 2h2a1 1 0 0 0 .71-.29L13 10.88l2.8 3.19a1.001 1.001 0 0 0 .72.34 1 1 0 0 0 .71-.29l1.7-1.71H21a1 1 0 0 0 0-2Zm-7.39 5.3-1.9 1.9a1.002 1.002 0 0 1-1.42 0L5.08 12.4a3.69 3.69 0 0 1 0-5.22 3.69 3.69 0 0 1 5.21 0 1 1 0 0 0 1.42 0 3.78 3.78 0 0 1 5.21 0c.223.226.418.478.58.75a1 1 0 0 0 1.72-1 6.001 6.001 0 0 0-.88-1.13A5.68 5.68 0 0 0 11 5.17a5.68 5.68 0 0 0-8.566 6.788A5.62 5.62 0 0 0 3.67 13.79L8.88 19a3 3 0 0 0 4.24 0L15 17.12a1 1 0 0 0 0-1.41 1 1 0 0 0-1.39 0Z"
    />
  </Svg>
);

export const HeartbeatCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M21 10.41h-2.5a1 1 0 0 0-.71.3L16.55 12l-2.8-3.19a1 1 0 0 0-1.46 0l-1.7 1.7H9a1 1 0 1 0 0 2h2a1 1 0 0 0 .71-.29L13 10.88l2.8 3.19a1.001 1.001 0 0 0 .72.34 1 1 0 0 0 .71-.29l1.7-1.71H21a1 1 0 0 0 0-2Zm-7.39 5.3-1.9 1.9a1.002 1.002 0 0 1-1.42 0L5.08 12.4a3.69 3.69 0 0 1 0-5.22 3.69 3.69 0 0 1 5.21 0 1 1 0 0 0 1.42 0 3.78 3.78 0 0 1 5.21 0c.223.226.418.478.58.75a1 1 0 0 0 1.72-1 6.001 6.001 0 0 0-.88-1.13A5.68 5.68 0 0 0 11 5.17a5.68 5.68 0 0 0-8.566 6.788A5.62 5.62 0 0 0 3.67 13.79L8.88 19a3 3 0 0 0 4.24 0L15 17.12a1 1 0 0 0 0-1.41 1 1 0 0 0-1.39 0Z"
    />
  </Svg>
);

export const HeartrateLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M21 11h-3.94a.785.785 0 0 0-.21 0h-.17c-.052.03-.102.063-.15.1-.056.037-.11.077-.16.12a1 1 0 0 0-.09.13c-.046.063-.086.13-.12.2l-1.6 4.41-4.17-11.3a1 1 0 0 0-1.88 0L6.2 11H3a1 1 0 0 0 0 2H7.3a.857.857 0 0 0 .16-.1c.056-.037.11-.077.16-.12l.09-.13a.999.999 0 0 0 .12-.2l1.62-4.53 4.16 11.42a1 1 0 0 0 1.88 0l2.3-6.34H21a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const HeartrateDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M21 11h-3.94a.785.785 0 0 0-.21 0h-.17c-.052.03-.102.063-.15.1-.056.037-.11.077-.16.12a1 1 0 0 0-.09.13c-.046.063-.086.13-.12.2l-1.6 4.41-4.17-11.3a1 1 0 0 0-1.88 0L6.2 11H3a1 1 0 0 0 0 2H7.3a.857.857 0 0 0 .16-.1c.056-.037.11-.077.16-.12l.09-.13a.999.999 0 0 0 .12-.2l1.62-4.53 4.16 11.42a1 1 0 0 0 1.88 0l2.3-6.34H21a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const HeartrateCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M21 11h-3.94a.785.785 0 0 0-.21 0h-.17c-.052.03-.102.063-.15.1-.056.037-.11.077-.16.12a1 1 0 0 0-.09.13c-.046.063-.086.13-.12.2l-1.6 4.41-4.17-11.3a1 1 0 0 0-1.88 0L6.2 11H3a1 1 0 0 0 0 2H7.3a.857.857 0 0 0 .16-.1c.056-.037.11-.077.16-.12l.09-.13a.999.999 0 0 0 .12-.2l1.62-4.53 4.16 11.42a1 1 0 0 0 1.88 0l2.3-6.34H21a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const HomeLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="m20 8-6-5.26a3 3 0 0 0-4 0L4 8a3 3 0 0 0-1 2.26V19a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8.75A3 3 0 0 0 20 8Zm-6 12h-4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5Zm5-1a1 1 0 0 1-1 1h-2v-5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v5H6a1 1 0 0 1-1-1v-8.75a1 1 0 0 1 .34-.75l6-5.25a1 1 0 0 1 1.32 0l6 5.25a1.002 1.002 0 0 1 .34.75V19Z"
    />
  </Svg>
);

export const HomeDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="m20 8-6-5.26a3 3 0 0 0-4 0L4 8a3 3 0 0 0-1 2.26V19a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8.75A3 3 0 0 0 20 8Zm-6 12h-4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5Zm5-1a1 1 0 0 1-1 1h-2v-5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v5H6a1 1 0 0 1-1-1v-8.75a1 1 0 0 1 .34-.75l6-5.25a1 1 0 0 1 1.32 0l6 5.25a1.002 1.002 0 0 1 .34.75V19Z"
    />
  </Svg>
);

export const HomeCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="m20 8-6-5.26a3 3 0 0 0-4 0L4 8a3 3 0 0 0-1 2.26V19a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8.75A3 3 0 0 0 20 8Zm-6 12h-4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5Zm5-1a1 1 0 0 1-1 1h-2v-5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v5H6a1 1 0 0 1-1-1v-8.75a1 1 0 0 1 .34-.75l6-5.25a1 1 0 0 1 1.32 0l6 5.25a1.002 1.002 0 0 1 .34.75V19Z"
    />
  </Svg>
);

export const InfoCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8Zm0-8.5a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1Zm0-4a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
    />
  </Svg>
);

export const MedalLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M21.38 5.76a1 1 0 0 0-.47-.61l-5.2-3a1 1 0 0 0-1.37.36L12 6.57 9.66 2.51a1 1 0 0 0-1.37-.36l-5.2 3a1 1 0 0 0-.47.61 1 1 0 0 0 .1.75l4 6.83A5.91 5.91 0 0 0 6 16a6 6 0 1 0 11.34-2.72l3.9-6.76a1 1 0 0 0 .14-.76ZM5 6.38l3.46-2L11.68 10A5.94 5.94 0 0 0 8 11.58l-3-5.2ZM12 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm4-8.45a5.9 5.9 0 0 0-1.86-1.15l-.98-1.83 2.42-4.19 3.46 2L16 11.55Z"
    />
  </Svg>
);

export const MedalDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M21.38 5.76a1 1 0 0 0-.47-.61l-5.2-3a1 1 0 0 0-1.37.36L12 6.57 9.66 2.51a1 1 0 0 0-1.37-.36l-5.2 3a1 1 0 0 0-.47.61 1 1 0 0 0 .1.75l4 6.83A5.91 5.91 0 0 0 6 16a6 6 0 1 0 11.34-2.72l3.9-6.76a1 1 0 0 0 .14-.76ZM5 6.38l3.46-2L11.68 10A5.94 5.94 0 0 0 8 11.58l-3-5.2ZM12 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm4-8.45a5.9 5.9 0 0 0-1.86-1.15l-.98-1.83 2.42-4.19 3.46 2L16 11.55Z"
    />
  </Svg>
);

export const MedalCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M21.38 5.76a1 1 0 0 0-.47-.61l-5.2-3a1 1 0 0 0-1.37.36L12 6.57 9.66 2.51a1 1 0 0 0-1.37-.36l-5.2 3a1 1 0 0 0-.47.61 1 1 0 0 0 .1.75l4 6.83A5.91 5.91 0 0 0 6 16a6 6 0 1 0 11.34-2.72l3.9-6.76a1 1 0 0 0 .14-.76ZM5 6.38l3.46-2L11.68 10A5.94 5.94 0 0 0 8 11.58l-3-5.2ZM12 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm4-8.45a5.9 5.9 0 0 0-1.86-1.15l-.98-1.83 2.42-4.19 3.46 2L16 11.55Z"
    />
  </Svg>
);

export const PenCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M22 7.24a.999.999 0 0 0-.29-.71l-4.24-4.24a.999.999 0 0 0-.71-.29 1 1 0 0 0-.71.29l-2.83 2.83L2.29 16.05a.999.999 0 0 0-.29.71V21a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .76-.29l10.87-10.93L21.71 8c.091-.097.166-.208.22-.33.01-.08.01-.16 0-.24a.697.697 0 0 0 0-.14l.07-.05ZM6.83 20H4v-2.83l9.93-9.93 2.83 2.83L6.83 20ZM18.17 8.66l-2.83-2.83 1.42-1.41 2.82 2.82-1.41 1.42Z"
    />
  </Svg>
);

export const PlusLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const PlusDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const PlusCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const RestaurantLight: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorLight}
      stroke={colorLight}
      strokeWidth={strokeWidth}
      d="M16.84 11.63a2.998 2.998 0 0 0 2.16-.88l2.83-2.83a1 1 0 1 0-1.42-1.41l-2.86 2.82a1 1 0 0 1-1.42 0l3.54-3.53a1.004 1.004 0 0 0-1.42-1.42l-3.53 3.54a1 1 0 0 1 0-1.41l2.83-2.83a1.004 1.004 0 0 0-1.42-1.42L13.3 5.09a3 3 0 0 0 0 4.24L12 10.62l-8.27-8.3-.1-.06a.71.71 0 0 0-.17-.11l-.18-.07L3.16 2h-.27a.57.57 0 0 0-.18 0 .7.7 0 0 0-.17.09l-.16.1h-.07l-.06.1a1 1 0 0 0-.11.17 1.07 1.07 0 0 0-.07.19v.11a11 11 0 0 0 3.11 9.34l2.64 2.63-5.41 5.4a1 1 0 0 0 .71 1.71.999.999 0 0 0 .71-.29l6.07-5.98 2.83-2.83 2-2a3 3 0 0 0 2.11.89Zm-7.65 1.82-2.63-2.64A9.06 9.06 0 0 1 4 5.4l6.61 6.6-1.42 1.45Zm6.24.57A1.008 1.008 0 0 0 14 15.44l6.3 6.3a1 1 0 0 0 .7.26.998.998 0 0 0 .71-1.71l-6.28-6.27Z"
    />
  </Svg>
);

export const RestaurantDark: FC = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={colorDark}
      stroke={colorDark}
      strokeWidth={strokeWidth}
      d="M16.84 11.63a2.998 2.998 0 0 0 2.16-.88l2.83-2.83a1 1 0 1 0-1.42-1.41l-2.86 2.82a1 1 0 0 1-1.42 0l3.54-3.53a1.004 1.004 0 0 0-1.42-1.42l-3.53 3.54a1 1 0 0 1 0-1.41l2.83-2.83a1.004 1.004 0 0 0-1.42-1.42L13.3 5.09a3 3 0 0 0 0 4.24L12 10.62l-8.27-8.3-.1-.06a.71.71 0 0 0-.17-.11l-.18-.07L3.16 2h-.27a.57.57 0 0 0-.18 0 .7.7 0 0 0-.17.09l-.16.1h-.07l-.06.1a1 1 0 0 0-.11.17 1.07 1.07 0 0 0-.07.19v.11a11 11 0 0 0 3.11 9.34l2.64 2.63-5.41 5.4a1 1 0 0 0 .71 1.71.999.999 0 0 0 .71-.29l6.07-5.98 2.83-2.83 2-2a3 3 0 0 0 2.11.89Zm-7.65 1.82-2.63-2.64A9.06 9.06 0 0 1 4 5.4l6.61 6.6-1.42 1.45Zm6.24.57A1.008 1.008 0 0 0 14 15.44l6.3 6.3a1 1 0 0 0 .7.26.998.998 0 0 0 .71-1.71l-6.28-6.27Z"
    />
  </Svg>
);

export const RestaurantCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M16.84 11.63a2.998 2.998 0 0 0 2.16-.88l2.83-2.83a1 1 0 1 0-1.42-1.41l-2.86 2.82a1 1 0 0 1-1.42 0l3.54-3.53a1.004 1.004 0 0 0-1.42-1.42l-3.53 3.54a1 1 0 0 1 0-1.41l2.83-2.83a1.004 1.004 0 0 0-1.42-1.42L13.3 5.09a3 3 0 0 0 0 4.24L12 10.62l-8.27-8.3-.1-.06a.71.71 0 0 0-.17-.11l-.18-.07L3.16 2h-.27a.57.57 0 0 0-.18 0 .7.7 0 0 0-.17.09l-.16.1h-.07l-.06.1a1 1 0 0 0-.11.17 1.07 1.07 0 0 0-.07.19v.11a11 11 0 0 0 3.11 9.34l2.64 2.63-5.41 5.4a1 1 0 0 0 .71 1.71.999.999 0 0 0 .71-.29l6.07-5.98 2.83-2.83 2-2a3 3 0 0 0 2.11.89Zm-7.65 1.82-2.63-2.64A9.06 9.06 0 0 1 4 5.4l6.61 6.6-1.42 1.45Zm6.24.57A1.008 1.008 0 0 0 14 15.44l6.3 6.3a1 1 0 0 0 .7.26.998.998 0 0 0 .71-1.71l-6.28-6.27Z"
    />
  </Svg>
);

export const SearchCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M21.71 20.29 18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1.002 1.002 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
    />
  </Svg>
);

export const TimesCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="m13.41 12 4.3-4.29a1.004 1.004 0 0 0-1.42-1.42L12 10.59l-4.29-4.3a1.004 1.004 0 1 0-1.42 1.42l4.3 4.29-4.3 4.29a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095L13.41 12Z"
    />
  </Svg>
);

export const TearCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M12.56 2.17a1 1 0 0 0-1.12 0c-.3.2-7.19 5-7.19 12.08a7.75 7.75 0 0 0 15.5 0c0-7.2-6.9-11.89-7.19-12.08ZM12 20a5.76 5.76 0 0 1-5.75-5.75c0-5 4.21-8.77 5.75-10 1.55 1.21 5.75 5 5.75 10A5.76 5.76 0 0 1 12 20Z"
    />
  </Svg>
);

export const PlusCircleCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-15.999 8 8 0 0 1 0 16Zm4-9h-3V6a1 1 0 0 0-2 0v3H6a1 1 0 0 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2Z"
    />
  </Svg>
);

export const NavToBelowCustom = ({
  color = colorDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M36.292 11.604V.168L18.5 12.875.708.167v11.438L18.5 24.313l17.792-12.708Z"
    />
  </Svg>
);
export default NavToBelowCustom;

export const ShareCustom: FC = ({
  color = colorDefault,
  size = sizeDefault,
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      d="M18 16.08a2.5 2.5 0 0 0-1.63.63L8.91 12.7a2.5 2.5 0 0 0 0-1.4l7.41-4.23a2.5 2.5 0 1 0-.57-1.11L8.34 10.2a2.5 2.5 0 1 0 0 3.59l7.45 4.25a2.5 2.5 0 1 0 2.21-2.01Z"
    />
  </Svg>
);

