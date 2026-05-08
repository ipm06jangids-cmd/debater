const PROMPTS = [
  "Social media has done more harm than good for democracy.",
  "Universities will be obsolete within 20 years.",
  "Remote work is better for productivity than office work.",
  "AI-generated art is real art.",
  "Voting should be mandatory.",
  "Cryptocurrency has no legitimate use case.",
  "Self-driving cars should always prioritize passenger safety over pedestrians.",
  "Capitalism is incompatible with solving climate change.",
  "Free speech absolutism does more harm than good.",
  "Children should not have smartphones before age 16.",
  "A four-day work week should be the global standard.",
  "Nuclear energy is the only realistic path to net zero.",
  "Tipping culture should be abolished.",
  "Genetic engineering of human embryos should be permitted.",
  "Public transport should be free in every major city.",
  "Cancel culture is a net positive for accountability.",
  "Universal basic income would eliminate poverty.",
  "Standardized testing measures intelligence accurately.",
  "Animals should have legal personhood.",
  "Wealth taxes are economically self-defeating.",
  "Privacy is a more important right than security.",
  "Meritocracy is a myth that protects existing privilege.",
  "Religion does more good than harm in modern society.",
  "Open borders would benefit everyone economically.",
  "Mainstream news is more biased than independent media.",
  "Working from home permanently damages junior careers.",
  "Vegetarianism is a moral obligation, not a preference.",
  "Government surveillance is justified to prevent terrorism.",
  "Modern art is mostly emperor's-new-clothes nonsense.",
  "Schools should ban homework entirely.",
  "Billionaires are a sign of policy failure.",
  "Censorship is sometimes necessary for social cohesion.",
  "Historical statues of controversial figures should be removed.",
  "Children should be allowed to vote.",
  "Marriage as an institution should be abolished.",
  "Fast fashion brands should be banned.",
  "Esports deserve full Olympic recognition.",
  "Generative AI will widen inequality, not reduce it.",
  "Learning a second language is overrated.",
  "Public shaming is an effective social tool.",
];

export function getDailyPrompt(date = new Date()): string {
  const epochDay = Math.floor(date.getTime() / 86400000);
  return PROMPTS[epochDay % PROMPTS.length];
}

export function getRandomPromptDifferentFrom(current: string): string {
  let next = current;
  while (next === current) {
    next = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  }
  return next;
}

export const ALL_PROMPTS = PROMPTS;
