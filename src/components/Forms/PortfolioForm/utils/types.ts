export interface PortfolioFormValues {
  selfIntroduction: string;
  skills: Record<string, number | undefined>;
  links: PortfolioFormLink[];
}

export interface PortfolioFormLink {
  linkText: string;
  link: string;
}
