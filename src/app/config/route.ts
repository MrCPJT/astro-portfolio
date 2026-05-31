type Link = {
  title: "Home" | "About" | "Blog" | "Projects" | "Resume";
  href: string;
};

export const LINKS: Link[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Resume",
    href: "/resume",
  },
  {
    title: "About",
    href: "/about",
  },
];
