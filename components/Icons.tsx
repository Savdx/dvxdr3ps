import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const PlayIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const UserIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const CartIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export const SearchIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const PlusIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, { ...p, strokeWidth: 2.5 })}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const LockIcon = ({ size = 32, ...p }: IconProps) => (
  <svg {...base(size, { ...p, strokeWidth: 1.5 })}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const TrashIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const UploadIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const XIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ArrowIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, { ...p, strokeWidth: 2.5 })}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const HeartIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const PackageIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export const StarIcon = ({
  filled = true,
  size = 14,
}: {
  filled?: boolean;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill={filled ? "#00d4aa" : "none"}
    stroke={filled ? "#00d4aa" : "#2a2a2a"}
    strokeWidth={1.2}
  >
    <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.5 2.7,10.5 3.5,7 1,4.8 4.5,4.5" />
  </svg>
);

export const SparkleIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 3l1.9 5.8 5.8 1.9-5.8 1.9L12 18.4l-1.9-5.8L4.3 10.7l5.8-1.9z" />
  </svg>
);

export const GlobeIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const ShieldIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const StarOutlineIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const TagIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

export const TicketIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 6 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-6z" />
    <line x1="13" y1="7" x2="13" y2="17" strokeDasharray="2 2" />
  </svg>
);

export const UsersIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const TruckIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
