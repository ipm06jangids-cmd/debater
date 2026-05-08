import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sparring — AI Debate Trainer",
    short_name: "Sparring",
    description: "Voice-first AI debate sparring with live logic-strength scoring.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [],
  };
}
