export interface PortfolioFormValues {
  selfIntroduction: string;
  skills: Record<string, number | undefined>;
  links: Link[];
}

interface Link {
  linkText: string;
  link: string;
}
