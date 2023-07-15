export interface PortfolioFormValues {
  selfIntroduction: string;
  skills: Record<string, boolean>;
  links: Link[];
}

interface Link {
  linkText: string;
  link: string;
}
