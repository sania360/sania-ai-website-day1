export interface Service {
  title: string;
  category: "Data & Automation" | "Machine Learning & AI" | "Bioinformatics" | "Web Development" | "Consultation";
  price: string;
  description: string;
}

export const categories = [
  "All",
  "Data & Automation",
  "Machine Learning & AI",
  "Bioinformatics",
  "Web Development",
  "Consultation",
] as const;

export const services: Service[] = [
  // Data & Automation
  { title: "Python Automation", category: "Data & Automation", price: "$25", description: "Automate repetitive spreadsheet, file, or reporting tasks with a Python script you can run anytime." },
  { title: "Data Cleaning", category: "Data & Automation", price: "$20", description: "Remove duplicates, fix formatting, and handle missing values so your dataset is ready to analyze." },
  { title: "Data Preprocessing", category: "Data & Automation", price: "$30", description: "Encode, scale, and transform raw data into a model-ready format." },
  { title: "Exploratory Data Analysis (EDA)", category: "Data & Automation", price: "$40", description: "A full statistical and visual breakdown of your dataset's patterns, outliers, and relationships." },
  { title: "Dashboard Development", category: "Data & Automation", price: "$60", description: "An interactive web dashboard that turns your data into a live, explorable view." },
  { title: "Power BI Dashboard", category: "Data & Automation", price: "$80", description: "A polished Power BI report with drill-downs, filters, and scheduled refresh." },
  { title: "Excel Automation", category: "Data & Automation", price: "$35", description: "Formulas, macros, and pivot-based automation to cut hours of manual Excel work." },
  { title: "Web Scraping", category: "Data & Automation", price: "$80", description: "A scraper that reliably collects structured data from websites into a usable file or database." },

  // Machine Learning & AI
  { title: "Machine Learning Classification", category: "Machine Learning & AI", price: "$100", description: "A trained classification model with evaluation metrics tailored to your business question." },
  { title: "Regression Models", category: "Machine Learning & AI", price: "$100", description: "Predictive regression models for forecasting continuous outcomes like price or demand." },
  { title: "Deep Learning", category: "Machine Learning & AI", price: "$150", description: "CNNs, RNNs, or transformer-based models for image, text, or sequence data." },
  { title: "Natural Language Processing (NLP)", category: "Machine Learning & AI", price: "$120", description: "Text classification, summarization, or entity extraction built on modern NLP models." },
  { title: "Sentiment Analysis", category: "Machine Learning & AI", price: "$90", description: "Classify customer reviews, tweets, or feedback as positive, negative, or neutral at scale." },
  { title: "Recommendation Systems", category: "Machine Learning & AI", price: "$180", description: "Content-based or collaborative-filtering recommenders for products, content, or media." },
  { title: "Time Series Forecasting", category: "Machine Learning & AI", price: "$140", description: "Forecast future values from historical trends using statistical or ML-based models." },
  { title: "Customer Churn Prediction", category: "Machine Learning & AI", price: "$150", description: "Identify which customers are likely to leave, before they do." },
  { title: "Sales Forecasting", category: "Machine Learning & AI", price: "$150", description: "Predict future sales volume to support inventory and planning decisions." },
  { title: "Fraud Detection", category: "Machine Learning & AI", price: "$180", description: "Anomaly-detection models that flag suspicious transactions in real time." },
  { title: "Healthcare AI", category: "Machine Learning & AI", price: "$180", description: "ML models for diagnosis support, risk prediction, or medical image analysis." },
  { title: "Predictive Analytics", category: "Machine Learning & AI", price: "$120", description: "Turn historical data into forward-looking predictions your team can act on." },
  { title: "Image Classification", category: "Machine Learning & AI", price: "$160", description: "Train a model to accurately categorize images for your specific use case." },
  { title: "Object Detection", category: "Machine Learning & AI", price: "$200", description: "Locate and label multiple objects within images or video frames." },
  { title: "Chatbot Development", category: "Machine Learning & AI", price: "$180", description: "A conversational chatbot wired into your website or app." },
  { title: "RAG Chatbot", category: "Machine Learning & AI", price: "$220", description: "A chatbot that answers accurately from your own documents using retrieval-augmented generation." },

  // Bioinformatics
  { title: "Bioinformatics Pipeline", category: "Bioinformatics", price: "$180", description: "An end-to-end pipeline covering alignment, variant calling, and functional annotation." },
  { title: "FASTQ Analysis", category: "Bioinformatics", price: "$100", description: "Quality control and summary statistics on raw sequencing reads." },
  { title: "RNA-Seq Analysis", category: "Bioinformatics", price: "$250", description: "Differential gene expression analysis from raw RNA-seq data to results." },
  { title: "Genome Alignment", category: "Bioinformatics", price: "$180", description: "Align sequencing reads to a reference genome and summarize coverage and quality." },
  { title: "Variant Calling", category: "Bioinformatics", price: "$250", description: "Identify genetic variants from aligned sequencing data with a full quality-checked workflow." },

  // Web Development
  { title: "Flask Web App", category: "Web Development", price: "$150", description: "A working Flask application built around your requirements, from routes to database." },
  { title: "FastAPI Backend", category: "Web Development", price: "$180", description: "A production-style FastAPI backend with authentication, database models, and docs." },
  { title: "REST API", category: "Web Development", price: "$120", description: "A clean, documented REST API ready for a frontend or mobile app to consume." },
  { title: "Portfolio Website", category: "Web Development", price: "$120", description: "A personal portfolio site that presents your work professionally." },
  { title: "Business Website", category: "Web Development", price: "$180", description: "A multi-page business website with contact forms and responsive design." },

  // Consultation
  { title: "Bug Fixing", category: "Consultation", price: "$20", description: "Diagnose and fix a specific bug in your existing Python, React, or SQL project." },
  { title: "Assignment Help", category: "Consultation", price: "$15", description: "Guided help understanding and completing a data science or programming assignment." },
  { title: "Consultation", category: "Consultation", price: "$25/hour", description: "A one-on-one call to scope your project, review your data, or plan your approach." },
];
