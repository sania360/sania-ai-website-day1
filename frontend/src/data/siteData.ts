// Central content file — sourced from Sania's CV/profile.
// Editing this file updates Home, About, and (later) Services/Projects pages.

export const profile = {
  name: "Sania Ismail",
  roles: ["AI Engineer", "Machine Learning Developer", "Data Analyst", "Bioinformatics Engineer"],
  tagline: "AI, Machine Learning & Data Analytics Solutions",
  heroSummary:
    "I design and build end-to-end AI, machine learning, and bioinformatics solutions — from data pipeline to deployed product.",
  location: "Faisalabad, Pakistan",
  phone: "+92 340 0611656",
  email: "saniaismail899@gmail.com",
  linkedin: "https://www.linkedin.com/in/sania-ismail-9a79a4346",
  github: "https://github.com/sania360",
  resumeUrl: "/resume.pdf",
};

export const stats = [
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "Year of Industry Internship", value: 1, suffix: "" },
  { label: "Certifications Earned", value: 5, suffix: "+" },
  { label: "GitHub Repositories", value: 20, suffix: "+" },
];

export const bio = {
  story:
    "I'm Sania Ismail, a BS Bioinformatics student at the University of Agriculture, Faisalabad, " +
    "specializing in machine learning, deep learning, and applied bioinformatics. I completed a " +
    "one-year Data Science internship at Microinformatics, working hands-on with AI, machine learning, " +
    "deep learning, NLP, and data engineering. I hold certifications in Artificial Intelligence (NVTTC) " +
    "and Programming for the Bio-Digital World (YPDC, UAF), and I build full-stack, end-to-end AI systems " +
    "— from FastAPI/React applications to RAG chatbots and genomic-data pipelines. My mission is to turn " +
    "messy, real-world data into decisions people can act on.",
  mission:
    "To make advanced AI and data science practically useful for businesses and researchers who don't have an in-house data team.",
  vision:
    "To become a trusted name in applied AI and bioinformatics consulting across Pakistan and beyond.",
};

export const education = [
  {
    degree: "BS Bioinformatics",
    institute: "University of Agriculture, Faisalabad",
    period: "Sep 2023 — Present",
    detail:
      "Coursework in Molecular Biology, Genetics, Genomics, Computational Biology, Biostatistics, Machine Learning, AI, Biological Databases, Sequence Analysis, Structural Bioinformatics, and Drug Discovery.",
  },
  {
    degree: "Higher Secondary (FSc)",
    institute: "Punjab Group of Colleges, Jaranwala",
    period: "Jul 2021 — Apr 2023",
    detail: "Final grade: A+",
  },
  {
    degree: "Matriculation",
    institute: "Win Some Science School, Buchiana",
    period: "Sep 2018 — Oct 2020",
    detail: "Final grade: A+",
  },
];

export const experience = [
  {
    role: "Data Science Intern",
    org: "Microinformatics",
    period: "Jan 2025 — Jan 2026",
    detail:
      "One-year internship with hands-on experience in AI, Machine Learning, Deep Learning, NLP, Data Engineering, and Python-based technologies.",
  },
  {
    role: "AI Trainee",
    org: "NVTTC (National Vocational & Technical Training Commission)",
    period: "Mar 2026 — May 2026",
    detail: "Work-based training in Artificial Intelligence.",
  },
];

export const certifications = [
  { title: "Bioinformatics Course 201 — DNA Sequencing & Genomics", issuer: "Genomac Institute Inc., USA", year: "2024" },
  { title: "Learn Programming for the Bio-Digital World (R & Python)", issuer: "YPDC, UAF", year: "2024" },
  { title: "AI Workshop", issuer: "AVRA", year: "2024" },
  { title: "Data Science", issuer: "Microinformatics", year: "2026" },
  { title: "Artificial Intelligence", issuer: "NVTTC", year: "2026" },
];

export const skills = [
  { name: "Python", level: 92 },
  { name: "Machine Learning", level: 88 },
  { name: "Deep Learning", level: 80 },
  { name: "Bioinformatics (BLAST, FASTA, PyMOL)", level: 85 },
  { name: "NLP", level: 75 },
  { name: "SQL", level: 78 },
  { name: "React / FastAPI", level: 80 },
];

export const technologies = [
  "Python", "R", "C++", "SQL", "PHP",
  "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
  "BLAST", "FastQC", "PyMOL", "AlphaFold", "SWISS-MODEL",
  "React", "FastAPI", "MySQL", "GitHub", "Jupyter",
];

// Featured projects shown on Home (full detail pages built on Day 3)
export const featuredProjects = [
  {
    slug: "gene-expression-random-forest",
    title: "Gene Expression Analysis using Random Forest",
    category: "Bioinformatics",
    summary:
      "Predicted gene expression levels from RNA-seq data using Random Forest regression, with feature selection to identify key biological drivers.",
  },
  {
    slug: "bioinformatics-pipeline",
    title: "End-to-End Bioinformatics Pipeline",
    category: "Bioinformatics",
    summary: "A pipeline covering sequence alignment, variant calling, and functional annotation.",
  },
  {
    slug: "breast-cancer-detection",
    title: "Breast Cancer Detection (ML + CNN)",
    category: "Deep Learning",
    summary: "Machine learning and CNN models on histopathology datasets for early breast cancer classification.",
  },
  {
    slug: "movie-recommendation-system",
    title: "Movie Recommendation System",
    category: "Machine Learning",
    summary: "A recommender built with Pandas, scikit-learn, TF-IDF, and cosine similarity.",
  },
  {
    slug: "mnist-digit-classification",
    title: "MNIST Digit Classification",
    category: "Deep Learning",
    summary: "Handwritten digit classification comparing Keras, PyTorch, JAX, and TensorFlow implementations.",
  },
  {
    slug: "biostatistical-data-analysis",
    title: "Biostatistical Data Analysis",
    category: "Data Analytics",
    summary: "Exploratory data analysis, hypothesis testing, and statistical modelling on biological datasets.",
  },
];

// Featured services teaser on Home (full pricing list built on Day 3)
export const featuredServices = [
  { title: "Machine Learning Classification", price: "From $100", blurb: "Predictive models tailored to your dataset and business question." },
  { title: "Bioinformatics Pipeline", price: "From $180", blurb: "Sequence alignment, variant calling, and functional annotation, end to end." },
  { title: "RAG Chatbot", price: "From $220", blurb: "A chatbot that answers from your own documents using retrieval-augmented generation." },
  { title: "Dashboard Development", price: "From $60", blurb: "Interactive dashboards that turn raw data into decisions." },
  { title: "Deep Learning", price: "From $150", blurb: "CNNs, RNNs, and transformer-based models for image, text, or sequence data." },
  { title: "Data Cleaning & Preprocessing", price: "From $20", blurb: "Messy spreadsheets and datasets turned into analysis-ready data." },
];
