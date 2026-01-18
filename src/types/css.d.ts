// ============================================================
// TYPE DECLARATIONS - CSS Module Imports
// ============================================================
// This file declares CSS files as valid TypeScript modules
// to prevent TS2307 errors when importing .css files

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
