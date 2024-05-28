export {};

declare global {
  type uuid = string;
  type jsonb = string | number | boolean | { [key: string]: jsonb } | jsonb[];
}
