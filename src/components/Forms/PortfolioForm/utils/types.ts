export interface PortfolioFormValues {
  selfIntroduction: string;
  skills: Record<string, number | undefined>;
  links: Link[];
}

export interface Link {
  linkText: string;
  link: string;
}
