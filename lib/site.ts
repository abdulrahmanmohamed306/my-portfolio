export const profile = {
  name: "Abdulrahman Mohamed",
  fullName: "Abdulrahman Mohamed Fathy Morsy",
  role: "Senior General Accountant & Financial Data Analyst",
  location: "Cairo / Beni Suef, Egypt",
  email: "abdulrahmanmohamed306@gmail.com",
  phone: "+20 111 649 5454",
  phoneHref: "tel:+201116495454",
  whatsapp: "https://wa.me/201116495454",
  linkedin: "https://www.linkedin.com/in/abdulrahman-mohammed-395556148",
  github: "https://github.com/abdulrahmanmohamed306",
  cv: "/Abdulrahman_Mohamed_CV.pdf",
  photo: "/my.photo.jpg",
  summary:
    "I have spent 7+ years closing the books, reconciling ledgers and managing treasury for manufacturing and retail companies. Today I pair that accounting discipline with Python, SQL and Power BI to turn financial records into reports that managers can act on.",
};

export const nav = [
  { href: "/#projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

// Shown as a ledger statement in the hero.
export const ledger = [
  { label: "Years in accounting & finance", value: "7+" },
  { label: "GL accuracy at month-end close", value: "100%" },
  { label: "DEPI data analysis training", value: "214 h" },
  { label: "Published analysis projects", value: "3" },
];

export type Visual = { file: string; title: string; desc: string };

export type Kpi = { label: string; value: string; note?: string };
export type Bar = { label: string; value: string; share: number };

export type Dashboard = {
  heading: string;
  period: string;
  kpis: Kpi[];
  line?: { title: string; labels: string[]; series: { name: string; values: number[] }[]; format: (n: number) => string };
  bars?: { title: string; items: Bar[] };
  ranked?: { title: string; items: { label: string; note: string }[] };
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  description: string;
  github?: string;
  tools: string[];
  dashboard: Dashboard;
  steps: { title: string; body: string }[];
  findings: string[];
  visuals: Visual[];
};

const usdK = (n: number) => `$${Math.round(n / 1000)}K`;
const usd = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

// Every figure below was computed from the data files in each project's GitHub repository.
export const projects: Project[] = [
  {
    slug: "retail-sales-profitability",
    title: "Retail Sales & Profitability Analysis",
    kind: "Python, Pandas and Seaborn",
    summary:
      "Four years of retail orders: which categories, regions and customer segments bring in the sales, and which bring in the profit.",
    description:
      "An analysis of 1,007 order lines from a US retailer (2014–2017). I cleaned the raw sales file, engineered profit margin and performance-category fields, and broke sales and profit down by year, category, region and customer segment.",
    github: "https://github.com/abdulrahmanmohamed306/ecommerce-customer-retention-analysis",
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Excel"],
    dashboard: {
      heading: "Retail sales and profit",
      period: "Jan 2014 – Dec 2017",
      kpis: [
        { label: "Total sales", value: "$1.12M" },
        { label: "Net profit", value: "$393.7K" },
        { label: "Profit margin", value: "35.1%" },
        { label: "Orders", value: "488", note: "366 customers" },
      ],
      line: {
        title: "Sales and net profit by year",
        labels: ["2014", "2015", "2016", "2017"],
        series: [
          { name: "Sales", values: [323178, 261186, 286504, 251244] },
          { name: "Net profit", values: [109000, 91379, 102446, 90877] },
        ],
        format: usdK,
      },
      bars: {
        title: "Sales by category",
        items: [
          { label: "Technology", value: "$462.9K", share: 41.3 },
          { label: "Furniture", value: "$350.2K", share: 31.2 },
          { label: "Office Supplies", value: "$309.0K", share: 27.5 },
        ],
      },
    },
    steps: [
      {
        title: "Clean",
        body: "Fixed missing values, invalid formats and duplicate records in the raw Excel sales file with Pandas.",
      },
      {
        title: "Engineer",
        body: "Added profit margin, shipping duration and a High / Medium / Low performance category to every order line.",
      },
      {
        title: "Analyse",
        body: "Grouped sales and profit by year, category, region and segment, ran a correlation analysis and charted the results.",
      },
    ],
    findings: [
      "Sales fell 22% from 2014 to 2017 ($323K to $251K), but the profit margin improved every year, from 33.7% to 36.2%.",
      "Technology is the biggest category: 41% of sales and $170.7K of net profit.",
      "The West region leads with 30% of sales; the South brings in only 16%.",
      "Consumers account for 53% of sales, ahead of corporate (27%) and home office (20%).",
      "Orders rated low-performance make up 12% of sales but only 5% of profit.",
    ],
    visuals: [
      { file: "01_sales_profit_by_year.png", title: "Sales and profit by year", desc: "Year-over-year sales against net profit." },
      { file: "02_sales_by_product_category.png", title: "Sales by product category", desc: "Sales split across the three categories." },
      { file: "03_profit_by_product_category.png", title: "Profit by product category", desc: "Net profit by category." },
      { file: "04_sales_by_region.png", title: "Sales by region", desc: "West, Central, East and South compared." },
      { file: "05_profit_margin_distribution.png", title: "Profit margin distribution", desc: "How margins are spread across order lines." },
      { file: "06_sales_by_client_segment.png", title: "Sales by client segment", desc: "Consumer, corporate and home-office buying." },
      { file: "07_quantity_by_product_category.png", title: "Quantity sold by category", desc: "Units sold by category." },
      { file: "08_correlation_heatmap.png", title: "Correlation heatmap", desc: "Correlation between the numeric fields." },
    ],
  },
  {
    slug: "online-sales-analysis",
    title: "Online Sales & Revenue Analysis",
    kind: "Python, Pandas and Seaborn",
    summary:
      "Eight months of online transactions: which product categories, regions and payment methods drive revenue.",
    description:
      "An analysis of 240 online transactions from January to August 2024. I validated the data, then grouped revenue by product category, region, payment method and month to see where the money comes from and how it is trending.",
    github: "https://github.com/abdulrahmanmohamed306/online-sales-data-analysis",
    tools: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
    dashboard: {
      heading: "Online sales revenue",
      period: "Jan – Aug 2024",
      kpis: [
        { label: "Total revenue", value: "$80,568" },
        { label: "Transactions", value: "240" },
        { label: "Units sold", value: "518" },
        { label: "Average order", value: "$335.70" },
      ],
      line: {
        title: "Revenue by month",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        series: [{ name: "Revenue", values: [14548, 10803, 12849, 12452, 8455, 7385, 6797, 7278] }],
        format: usd,
      },
      bars: {
        title: "Revenue by category",
        items: [
          { label: "Electronics", value: "$34,982", share: 43.4 },
          { label: "Home Appliances", value: "$18,646", share: 23.1 },
          { label: "Sports", value: "$14,327", share: 17.8 },
          { label: "Clothing", value: "$8,129", share: 10.1 },
          { label: "Beauty Products", value: "$2,622", share: 3.3 },
          { label: "Books", value: "$1,862", share: 2.3 },
        ],
      },
    },
    steps: [
      {
        title: "Load and validate",
        body: "Loaded the transaction file, checked the schema and data types, and made sure every numeric field was clean.",
      },
      {
        title: "Aggregate",
        body: "Grouped revenue by product category, region, payment method and month with Pandas.",
      },
      {
        title: "Visualise",
        body: "Charted the results with Seaborn and Matplotlib to show where revenue comes from.",
      },
    ],
    findings: [
      "Electronics brings in 43% of all revenue ($34,982), almost double the next category.",
      "North America leads with $36,844 (46% of revenue), followed by Asia ($22,455) and Europe ($21,268).",
      "Credit cards carry 64% of revenue.",
      "Monthly revenue halved over the period, from $14,548 in January to $7,278 in August.",
    ],
    visuals: [
      { file: "real_category_revenue.png", title: "Revenue by product category", desc: "Electronics leads at about $35K." },
      { file: "regional_sales_performance.png", title: "Revenue by region", desc: "North America, Asia and Europe compared." },
    ],
  },
  {
    slug: "kidney-disease",
    title: "Chronic Kidney Disease Prediction",
    kind: "Python and scikit-learn",
    summary:
      "Cleaning incomplete patient records and training a model that flags chronic kidney disease from routine lab results.",
    description:
      "An end-to-end analysis of 400 patient records with 24 clinical measurements. I filled the missing values, explored how the markers relate to the diagnosis, and trained a Random Forest classifier to predict chronic kidney disease.",
    github: "https://github.com/abdulrahmanmohamed306/chronic-kidney-disease-analysis",
    tools: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib", "scikit-learn", "Jupyter"],
    dashboard: {
      heading: "Kidney disease classifier",
      period: "400 patient records",
      kpis: [
        { label: "Patients", value: "400" },
        { label: "Diagnosed with CKD", value: "62.5%", note: "250 patients" },
        { label: "Test accuracy", value: "100%", note: "80 held-out patients" },
        { label: "5-fold cross-validation", value: "99.5%" },
      ],
      bars: {
        title: "Diagnosis split",
        items: [
          { label: "Chronic kidney disease", value: "250", share: 62.5 },
          { label: "No kidney disease", value: "150", share: 37.5 },
        ],
      },
      ranked: {
        title: "Most important markers",
        items: [
          { label: "Specific gravity", note: "sg" },
          { label: "Hemoglobin", note: "hemo" },
          { label: "Packed cell volume", note: "pcv" },
          { label: "Serum creatinine", note: "sc" },
          { label: "Red blood cell count", note: "rc" },
        ],
      },
    },
    steps: [
      {
        title: "Impute",
        body: "Filled missing numeric values with a KNN imputer and missing categories with the most common value.",
      },
      {
        title: "Explore",
        body: "Charted the diagnosis split, correlations between markers, and how serum creatinine differs by diagnosis.",
      },
      {
        title: "Model",
        body: "Encoded and scaled the features, trained a Random Forest and checked it with a confusion matrix and 5-fold cross-validation.",
      },
    ],
    findings: [
      "The model classified all 80 held-out patients correctly, and averaged 99.5% across 5-fold cross-validation, so the result is stable rather than a lucky split.",
      "Specific gravity, hemoglobin, packed cell volume, serum creatinine and red blood cell count carry the most predictive weight.",
      "62.5% of the records are CKD cases, so accuracy was checked per class, not only overall.",
    ],
    visuals: [
      { file: "kidney/feature_importances.png", title: "Feature importance", desc: "The clinical markers that matter most to the model." },
      { file: "kidney/confusion_matrix.png", title: "Confusion matrix", desc: "Predictions against actual diagnoses on the test set." },
      { file: "kidney/classification_distribution.png", title: "Diagnosis distribution", desc: "CKD and non-CKD patients in the data." },
      { file: "kidney/sc_boxplot.png", title: "Serum creatinine by diagnosis", desc: "Creatinine levels for each group." },
      { file: "kidney/correlation_heatmap.png", title: "Correlation heatmap", desc: "How the clinical measurements relate to each other." },
    ],
  },
];

export const experience = [
  {
    role: "General Accountant",
    company: "Emessa Denim for Ready Garments",
    period: "Apr 2023 – Present",
    points: [
      "Analyse journal entries and general ledger balances for a 100% accurate month-end close.",
      "Prepare and reconcile AR and AP reports, with variance analysis to speed up collections.",
      "Run bank reconciliations and tax declarations in the ERP system.",
    ],
  },
  {
    role: "Banking & Treasury Accountant",
    company: "Emessa Denim for Ready Garments",
    period: "Nov 2022 – Apr 2023",
    points: [
      "Tracked daily banking and liquidity through weekly cash-flow reports.",
      "Managed letters of credit and guarantee documentation in the ERP.",
    ],
  },
  {
    role: "Invoicing Specialist",
    company: "Emessa Denim for Ready Garments",
    period: "Jun 2022 – Nov 2022",
    points: [
      "Validated VAT and charges on local and export invoices.",
      "Uploaded invoice data to the Egyptian E-Invoicing portal with full compliance.",
    ],
  },
  {
    role: "General Accountant",
    company: "Elamsrya4kitchen Company",
    period: "May 2019 – Jun 2022",
    points: [
      "Kept the central accounting records and ledgers for over 3 years.",
      "Took part in monthly inventory analysis, financial reporting and payroll analysis.",
    ],
  },
  {
    role: "Branch Manager",
    company: "AMS Company",
    period: "Jan 2017 – Jun 2018",
    points: ["Ran branch operations, daily inventory and sales tracking in Retail Pro."],
  },
];

export const skillGroups = [
  {
    title: "Accounting & finance",
    items: [
      { name: "Financial statements", note: "Income statement, balance sheet and cash-flow statement." },
      { name: "General ledger & closing", note: "GL analysis, reconciliations and month-end close." },
      { name: "Accounts payable & receivable", note: "Full AP/AR cycle, collections and vendor payments." },
      { name: "Treasury & cash flow", note: "Bank reconciliation, liquidity reports, letters of credit." },
      { name: "Tax & e-invoicing", note: "VAT and the Egyptian E-Invoicing portal." },
      { name: "ERP systems", note: "Day-to-day accounting in ERP software." },
    ],
  },
  {
    title: "Data & business intelligence",
    items: [
      { name: "Python", note: "Pandas, NumPy, Matplotlib and Seaborn for cleaning and analysis." },
      { name: "SQL", note: "Queries, joins and aggregations on relational data." },
      { name: "Power BI", note: "DAX, data modelling and interactive dashboards." },
      { name: "Advanced Excel", note: "Power Query, pivot tables and dynamic formulas." },
      { name: "Exploratory data analysis", note: "Finding patterns, outliers and correlations." },
      { name: "Financial modelling", note: "Forecasting revenue, costs and growth." },
    ],
  },
];

export const education = {
  degree: "Bachelor of Commerce, Accounting (English section)",
  school: "Al-Azhar University",
  year: "2016",
};

export const certifications = [
  {
    name: "Digital Egypt Pioneers Initiative: Advanced Data Analysis track",
    issuer: "Ministry of Communications and IT (DEPI)",
    note: "214 hours: 160 technical (Python, SQL, Power BI, Excel), 36 freelancing and data storytelling, 18 business English.",
  },
  {
    name: "Certified Management Accountant (CMA), Part 1 candidate",
    issuer: "IMA",
    note: "Financial planning, performance, analytics and internal control.",
  },
  {
    name: "Data Fundamentals",
    issuer: "IBM",
    note: "The data lifecycle, types of analytics and visualisation practice.",
  },
  {
    name: "Accounting Fundamentals",
    issuer: "Corporate Finance Institute (CFI)",
    note: "Accounting principles, balance sheet and income statement analysis.",
  },
  {
    name: "AI for You",
    issuer: "Oracle MyLearn",
    note: "AI, machine learning and generative AI in business.",
  },
];

export const languages = "Arabic (native), English (very good)";
