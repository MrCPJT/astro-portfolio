export type TimelineEntry = {
  title: string;
  organisation: string;
  location: string;
  start: Date;
  /** Omit for a current role. */
  end?: Date;
  description: string;
  award?: string;
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    title: "Higher Scientist (Data Science)",
    organisation: "National Physical Laboratory (NPL)",
    location: "London",
    start: new Date("2025-06-01"),
    description:
      "Led customer-facing data science work on statistical testing of quantum RNG pipelines with uncertainty-aware analysis. Ensembled GBDTs for long-term photovoltaic degradation forecasting. Generated synthetic measurement-data in ultra-low-data settings.",
  },
  {
    title: "Scientist (Data Science)",
    organisation: "National Physical Laboratory (NPL)",
    location: "London",
    start: new Date("2024-03-01"),
    end: new Date("2025-06-30"),
    description:
      "Developed software for statistical modelling, numerical analysis, and uncertainty quantification; contributed to technical reports on inverse problems, hypothesis testing, and trustworthy AI; recipient of NPL's 2024 Early Career Scientist Award for Best Presentation.",
    award: "2024 Early Career Scientist Award, Best Presentation",
  },
];

export const EDUCATION: TimelineEntry[] = [
  {
    title: "Master of Mathematics (MMath), First Class Honours",
    organisation: "University of Exeter",
    location: "Exeter",
    start: new Date("2019-09-01"),
    end: new Date("2023-06-30"),
    description:
      "Completed an integrated master's degree in mathematics, graduating with First Class Honours.",
  },
];

export const SKILLS = [
  "Python",
  "MATLAB",
  "scikit-learn",
  "PyTorch",
  "AWS",
  "HPC (Slurm)",
  "Docker",
];
