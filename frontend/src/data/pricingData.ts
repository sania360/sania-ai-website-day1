export const pricingTiers = [
  {
    name: "Starter",
    monthlyPrice: "$99",
    projectPrice: "$99 one-time",
    description: "For quick, well-scoped tasks that need a fast, reliable turnaround.",
    features: [
      "1 focused deliverable (script, cleanup, small model)",
      "1 round of revisions",
      "Delivered in 2-5 days",
      "Email support",
    ],
  },
  {
    name: "Professional",
    monthlyPrice: "$299",
    projectPrice: "$299 one-time",
    description: "For a complete ML/AI feature or dashboard, built end-to-end.",
    features: [
      "Full ML model or dashboard build",
      "2 rounds of revisions",
      "Delivered in 1-2 weeks",
      "Documentation included",
      "Priority email support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: "$799",
    projectPrice: "$799+ one-time",
    description: "For multi-part systems — pipelines, RAG chatbots, or full-stack apps.",
    features: [
      "Multi-component system (backend + frontend + ML)",
      "Unlimited revisions during the build",
      "Dedicated timeline & check-ins",
      "Deployment support included",
    ],
  },
  {
    name: "Custom Quote",
    monthlyPrice: "Let's talk",
    projectPrice: "Let's talk",
    description: "Something bigger, ongoing, or unusual? Tell me what you need.",
    features: [
      "Scoped to your exact requirements",
      "Flexible engagement (one-off or ongoing)",
      "Direct consultation before any commitment",
    ],
  },
];
