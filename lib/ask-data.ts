// Every result below was produced by running the Pandas code on cleaned_sales_data.xlsx
// from the retail sales project repository.
export type DataQuestion = { question: string; insight: string; pandas: string; sql: string; columns: string[]; rows: (string | number)[][] };

export const dataQuestions: DataQuestion[] = [
  {
    "question": "Which region earns the most profit?",
    "insight": "The West leads on both sales and profit; the South trails every other region.",
    "pandas": "(df.groupby(\"Region\")[[\"Total Sales Amount\", \"Net Profit\"]]\n   .sum()\n   .sort_values(\"Net Profit\", ascending=False))",
    "sql": "SELECT Region,\n       SUM([Total Sales Amount]) AS Sales,\n       SUM([Net Profit])         AS Profit\nFROM sales\nGROUP BY Region\nORDER BY Profit DESC;",
    "columns": [
      "Region",
      "Total Sales Amount",
      "Net Profit"
    ],
    "rows": [
      [
        "West",
        "$341,157",
        "$117,766"
      ],
      [
        "Central",
        "$313,855",
        "$105,270"
      ],
      [
        "East",
        "$286,321",
        "$101,025"
      ],
      [
        "South",
        "$180,778",
        "$69,640"
      ]
    ]
  },
  {
    "question": "Which category has the best margin?",
    "insight": "Technology is both the biggest category and the most profitable per dollar sold.",
    "pandas": "by_cat = df.groupby(\"Product Category\")[[\"Total Sales Amount\", \"Net Profit\"]].sum()\nby_cat[\"Margin %\"] = by_cat[\"Net Profit\"] / by_cat[\"Total Sales Amount\"] * 100\nby_cat.sort_values(\"Margin %\", ascending=False)",
    "sql": "SELECT [Product Category],\n       SUM([Total Sales Amount]) AS Sales,\n       SUM([Net Profit])         AS Profit,\n       100.0 * SUM([Net Profit]) / SUM([Total Sales Amount]) AS [Margin %]\nFROM sales\nGROUP BY [Product Category]\nORDER BY [Margin %] DESC;",
    "columns": [
      "Product Category",
      "Total Sales Amount",
      "Net Profit",
      "Margin %"
    ],
    "rows": [
      [
        "Technology",
        "$462,916",
        "$170,711",
        "36.9%"
      ],
      [
        "Office Supplies",
        "$308,966",
        "$109,072",
        "35.3%"
      ],
      [
        "Furniture",
        "$350,230",
        "$113,917",
        "32.5%"
      ]
    ]
  },
  {
    "question": "Are falling sales hurting profitability?",
    "insight": "No. Sales dropped 22% over four years, but the margin rose every single year.",
    "pandas": "yearly = df.groupby(\"Year\")[[\"Total Sales Amount\", \"Net Profit\"]].sum()\nyearly[\"Margin %\"] = yearly[\"Net Profit\"] / yearly[\"Total Sales Amount\"] * 100\nyearly",
    "sql": "SELECT [Year],\n       SUM([Total Sales Amount]) AS Sales,\n       SUM([Net Profit])         AS Profit,\n       100.0 * SUM([Net Profit]) / SUM([Total Sales Amount]) AS [Margin %]\nFROM sales\nGROUP BY [Year]\nORDER BY [Year];",
    "columns": [
      "Year",
      "Total Sales Amount",
      "Net Profit",
      "Margin %"
    ],
    "rows": [
      [
        "2014",
        "$323,178",
        "$109,000",
        "33.7%"
      ],
      [
        "2015",
        "$261,186",
        "$91,379",
        "35.0%"
      ],
      [
        "2016",
        "$286,504",
        "$102,446",
        "35.8%"
      ],
      [
        "2017",
        "$251,244",
        "$90,877",
        "36.2%"
      ]
    ]
  },
  {
    "question": "Which five sub-categories make the most profit?",
    "insight": "A handful of product lines carry the business; these five alone make 63% of all profit.",
    "pandas": "(df.groupby(\"Sub-Category\")[\"Net Profit\"]\n   .sum()\n   .nlargest(5))",
    "sql": "SELECT TOP 5 [Sub-Category],\n       SUM([Net Profit]) AS Profit\nFROM sales\nGROUP BY [Sub-Category]\nORDER BY Profit DESC;",
    "columns": [
      "Sub-Category",
      "Net Profit"
    ],
    "rows": [
      [
        "Machines",
        "$61,253"
      ],
      [
        "Accessories",
        "$59,181"
      ],
      [
        "Tables",
        "$51,193"
      ],
      [
        "Phones",
        "$40,239"
      ],
      [
        "Binders",
        "$38,127"
      ]
    ]
  },
  {
    "question": "How much do low-performing orders really contribute?",
    "insight": "Low-performance orders bring 12% of sales but only 5% of profit, a clear target for pricing or discount review.",
    "pandas": "perf = df.groupby(\"Sales Performance Category\")[[\"Total Sales Amount\", \"Net Profit\"]].sum()\n(perf / perf.sum() * 100).round(1)",
    "sql": "SELECT [Sales Performance Category],\n       100.0 * SUM([Total Sales Amount]) / (SELECT SUM([Total Sales Amount]) FROM sales) AS [% of sales],\n       100.0 * SUM([Net Profit])         / (SELECT SUM([Net Profit]) FROM sales)         AS [% of profit]\nFROM sales\nGROUP BY [Sales Performance Category];",
    "columns": [
      "Sales Performance Category",
      "% of sales",
      "% of profit"
    ],
    "rows": [
      [
        "High",
        "37.7%",
        "49.3%"
      ],
      [
        "Medium",
        "50.0%",
        "45.7%"
      ],
      [
        "Low",
        "12.3%",
        "4.9%"
      ]
    ]
  },
  {
    "question": "How long does each shipping mode take?",
    "insight": "Same Day really does ship the same day; Standard Class takes five days on average.",
    "pandas": "(df.groupby(\"Ship Mode\")[\"Shipping Duration\"]\n   .mean()\n   .round(1)\n   .sort_values())",
    "sql": "SELECT [Ship Mode],\n       ROUND(AVG(CAST([Shipping Duration] AS FLOAT)), 1) AS [Avg days]\nFROM sales\nGROUP BY [Ship Mode]\nORDER BY [Avg days];",
    "columns": [
      "Ship Mode",
      "Shipping Duration"
    ],
    "rows": [
      [
        "Same Day",
        "0.0 days"
      ],
      [
        "First Class",
        "2.2 days"
      ],
      [
        "Second Class",
        "3.2 days"
      ],
      [
        "Standard Class",
        "5.0 days"
      ]
    ]
  }
];
