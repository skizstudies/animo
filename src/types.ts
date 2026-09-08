export type PageId = "overview" | "insurance" | "recovery" | "farm-map";

export interface NavItem {
  id: PageId;
  label: string;
  subtitle: string;
}
