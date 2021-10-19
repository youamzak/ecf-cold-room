import { gc_blue, gc_red, gc_orange } from "../../styles/index.module.css";

export const icone_user = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
      fill="#5b6770"
    />
  </svg>
);

export const icone_logout = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 36 36"
  >
    <path
      d="M7 6h16v9.8h2V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2H7z"
      fill="#5b6770"
    />
    <path
      d="M28.16 17.28a1 1 0 0 0-1.41 1.41L30.13 22h-14.5a1 1 0 0 0-1 1a1 1 0 0 0 1 1h14.5l-3.38 3.46a1 1 0 1 0 1.41 1.41l5.84-5.8z"
      fill="#5b6770"
    />
  </svg>
);

export const icone_bin = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"
      fill={gc_red}
    />
  </svg>
);

export const icone_plus_blue = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <g fill={gc_blue}>
      <path
        d="M12 20v-8m0 0V4m0 8h8m-8 0H4"
        stroke="#5b6770"
        stroke-width="2"
        stroke-linecap="round"
      />
    </g>
  </svg>
);

export const icone_plus_grey = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        d="M12 20v-8m0 0V4m0 8h8m-8 0H4"
        stroke="#5b6770"
        stroke-width="2"
        stroke-linecap="round"
      />
    </g>
  </svg>
);

export const icone_upload = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 1024 1024"
  >
    <path
      d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
      fill={gc_orange}
    />
  </svg>
);

export const icone_update = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 15 15"
  >
    <g fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 1 1-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663c.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638c-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 1 1 .192-1.024c2.874.54 5.457 2.98 5.457 6.557c0 1.537-.699 2.744-1.515 3.663c-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 1 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 1 1 1 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64c.715-.803 1.253-1.775 1.253-2.97z"
        fill="#5b6770"
      />
    </g>
  </svg>
);

export const icone_calendar = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 36 36"
  >
    <path
      className="clr-i-outline clr-i-outline-path-1"
      d="M32.25 6H29v2h3v22H4V8h3V6H3.75A1.78 1.78 0 0 0 2 7.81v22.38A1.78 1.78 0 0 0 3.75 32h28.5A1.78 1.78 0 0 0 34 30.19V7.81A1.78 1.78 0 0 0 32.25 6z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-2"
      d="M8 14h2v2H8z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-3"
      d="M14 14h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-4"
      d="M20 14h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-5"
      d="M26 14h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-6"
      d="M8 19h2v2H8z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-7"
      d="M14 19h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-8"
      d="M20 19h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-9"
      d="M26 19h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-10"
      d="M8 24h2v2H8z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-11"
      d="M14 24h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-12"
      d="M20 24h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-13"
      d="M26 24h2v2h-2z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-14"
      d="M10 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-15"
      d="M26 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1z"
      fill="#5b6770"
    />
    <path
      className="clr-i-outline clr-i-outline-path-16"
      d="M13 6h10v2H13z"
      fill="#5b6770"
    />
  </svg>
);

export const icone_check = (width, height, color="#5b6770") => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 1024 1024"
  >
    <path
      d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
      fill={color}
    />
    <path
      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
      fill={color}
    />
  </svg>
);
