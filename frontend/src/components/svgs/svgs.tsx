import Svg, { Path, SvgProps } from "react-native-svg";

// https://react-svgr.com/playground/?native=true&typescript=true

// Table of contents
// - Bookmark (light, dark)
// - Capsule (light, dark)
// - Fire (light, dark)
// - Heartbeat (light, dark)
// - Medal (light, dark)
// - Restaurant (light, dark)

const colorLight = "#ffffff";
const colorDark = "#000000";
const strokeWidth = 0.1;

export const BookmarkLight = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const BookmarkDark = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const CapsuleLight = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const CapsuleDark = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const FireLight = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const FireDark = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const HeartbeatLight = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const HeartbeatDark = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const MedalLight = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const MedalDark = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const RestaurantLight = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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

export const RestaurantDark = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
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
