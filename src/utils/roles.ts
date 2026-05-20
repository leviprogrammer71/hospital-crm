export const roles = [
  'admin',
  'doctor',
  'nurse',
  'pharmacy',
  'receptionist',
] as const;

export type Role = typeof roles[number];
