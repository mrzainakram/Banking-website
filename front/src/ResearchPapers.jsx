import { useState } from "react";
import { FaFileAlt, FaDownload, FaCalendar, FaUser, FaSearch, FaTags } from "react-icons/fa";

function ResearchPapers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const researchPapers = [
    {
      id: 1,
      title: "Digital Banking Transformation: A Comprehensive Study",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      category: "Digital Banking",
      abstract: "This paper explores the rapid transformation of traditional banking services to digital platforms, analyzing the impact on customer experience and operational efficiency.",
      downloadUrl: "#",
      tags: ["Digital Transformation", "Banking", "Technology"]
    },
    {
      id: 2,
      title: "Blockchain Technology in Financial Services",
      author: "Prof. Michael Chen",
      date: "2023-12-20",
      category: "Blockchain",
      abstract: "An in-depth analysis of blockchain applications in financial services, including cryptocurrencies, smart contracts, and decentralized finance (DeFi).",
      downloadUrl: "#",
      tags: ["Blockchain", "Cryptocurrency", "DeFi"]
    },
    {
      id: 3,
      title: "Risk Management in Modern Banking Systems",
      author: "Dr. Emily Rodriguez",
      date: "2023-11-30",
      category: "Risk Management",
      abstract: "This research examines contemporary risk management strategies in banking, focusing on credit risk, operational risk, and regulatory compliance.",
      downloadUrl: "#",
      tags: ["Risk Management", "Banking", "Compliance"]
    },
    {
      id: 4,
      title: "AI and Machine Learning in Financial Analytics",
      author: "Dr. James Thompson",
      date: "2023-10-25",
      category: "AI & Machine Learning",
      abstract: "Exploring the implementation of artificial intelligence and machine learning algorithms for fraud detection, credit scoring, and investment analysis.",
      downloadUrl: "#",
      tags: ["AI", "Machine Learning", "Analytics"]
    },
    {
      id: 5,
      title: "Mobile Banking Security: Challenges and Solutions",
      author: "Dr. Anna Kowalski",
      date: "2023-09-18",
      category: "Security",
      abstract: "A comprehensive study on mobile banking security vulnerabilities, threats, and the latest security measures to protect financial transactions.",
      downloadUrl: "#",
      tags: ["Mobile Banking", "Security", "Cybersecurity"]
    },
    {
      id: 6,
      title: "Financial Inclusion Through Digital Payments",
      author: "Prof. David Kumar",
      date: "2023-08-12",
      category: "Financial Inclusion",
      abstract: "Research on how digital payment systems are driving financial inclusion in developing economies and their socio-economic impact.",
      downloadUrl: "#",
      tags: ["Financial Inclusion", "Digital Payments", "Economics"]
    }
  ];

  const categories = ["all", "Digital Banking", "Blockchain", "Risk Management", "AI & Machine Learning", "Security", "Financial Inclusion"];

  const filteredPapers = researchPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || paper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Banking & Finance Research Papers</h2>
        
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search papers by title, author, or abstract..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map(paper => (
            <ResearchPaperCard key={paper.id} paper={paper} />
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No research papers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResearchPaperCard({ paper }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-3">
        <FaFileAlt className="text-2xl text-purple-500 mt-1" />
        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
          {paper.category}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {paper.title}
      </h3>
      
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaUser className="mr-1" />
        <span>{paper.author}</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <FaCalendar className="mr-1" />
        <span>{new Date(paper.date).toLocaleDateString()}</span>
      </div>
      
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
        {paper.abstract}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {paper.tags.map((tag, index) => (
          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center">
            <FaTags className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
      
      <button
        onClick={() => alert('Download functionality would be implemented here')}
        className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
      >
        <FaDownload className="mr-2" />
        Download PDF
      </button>
    </div>
  );
}

export default ResearchPapers;