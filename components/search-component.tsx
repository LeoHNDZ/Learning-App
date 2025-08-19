'use client';

import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { studioFiles, tutorials, quizQuestions } from '@/lib/studio-data';

type SearchResult = {
  type: 'file' | 'tutorial' | 'quiz';
  title: string;
  description: string;
  path?: string;
  id?: string;
  relevance: number;
};

export function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const lowerQuery = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search files
    studioFiles.forEach(file => {
      let relevance = 0;
      
      // Title match
      if (file.name.toLowerCase().includes(lowerQuery)) {
        relevance += 10;
      }
      
      // Purpose match
      if (file.purpose.toLowerCase().includes(lowerQuery)) {
        relevance += 8;
      }
      
      // Key features match
      if (file.keyFeatures?.some(feature => feature.toLowerCase().includes(lowerQuery))) {
        relevance += 6;
      }
      
      // Technical details match
      if (file.technicalDetails?.toLowerCase().includes(lowerQuery)) {
        relevance += 4;
      }
      
      // Path match
      if (file.path.toLowerCase().includes(lowerQuery)) {
        relevance += 3;
      }

      if (relevance > 0) {
        searchResults.push({
          type: 'file',
          title: file.name,
          description: file.purpose,
          path: file.path,
          relevance
        });
      }
    });

    // Search tutorials
    tutorials.forEach(tutorial => {
      let relevance = 0;
      
      if (tutorial.title.toLowerCase().includes(lowerQuery)) {
        relevance += 10;
      }
      
      if (tutorial.description.toLowerCase().includes(lowerQuery)) {
        relevance += 8;
      }
      
      if (tutorial.steps.some(step => 
        step.title.toLowerCase().includes(lowerQuery) || 
        step.description.toLowerCase().includes(lowerQuery) ||
        step.explanation.toLowerCase().includes(lowerQuery)
      )) {
        relevance += 6;
      }

      if (relevance > 0) {
        searchResults.push({
          type: 'tutorial',
          title: tutorial.title,
          description: tutorial.description,
          id: tutorial.id,
          relevance
        });
      }
    });

    // Search quiz questions
    quizQuestions.forEach(question => {
      let relevance = 0;
      
      if (question.question.toLowerCase().includes(lowerQuery)) {
        relevance += 10;
      }
      
      if (question.explanation.toLowerCase().includes(lowerQuery)) {
        relevance += 8;
      }
      
      if (question.category.toLowerCase().includes(lowerQuery)) {
        relevance += 6;
      }
      
      if (question.options.some(option => option.toLowerCase().includes(lowerQuery))) {
        relevance += 4;
      }

      if (relevance > 0) {
        searchResults.push({
          type: 'quiz',
          title: question.question,
          description: `Quiz question about ${question.category}`,
          id: question.id,
          relevance
        });
      }
    });

    // Sort by relevance
    searchResults.sort((a, b) => b.relevance - a.relevance);
    
    setResults(searchResults);
    setIsSearching(false);
  };

  const handleSearchInput = (value: string) => {
    setQuery(value);
    setTimeout(() => performSearch(value), 300); // Debounce search
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'file':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'tutorial':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'quiz':
        return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'file':
        return '📁';
      case 'tutorial':
        return '📚';
      case 'quiz':
        return '❓';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <SearchIcon className="w-6 h-6 text-blue-600" />
          <span>Search Functionality</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Search for explanations of specific files, tutorials, or quiz questions
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search for files, concepts, or features..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Search Suggestions */}
      {!query && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Popular searches:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js',
              'Canvas',
              'TypeScript',
              'Autocomplete',
              'Repository Pattern',
              'LocalStorage',
              'React Hooks',
              'Tailwind CSS',
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSearchInput(suggestion)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {isSearching && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Searching...</p>
        </div>
      )}

      {/* Results */}
      {!isSearching && results.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Search Results ({results.length})
          </h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={`${result.type}-${result.id || result.path}-${index}`}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(result.type)}</span>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{result.title}</h4>
                      {result.path && (
                        <p className="text-sm text-gray-500 font-mono">{result.path}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(result.type)}`}>
                    {result.type}
                  </span>
                </div>
                <p className="text-gray-600">{result.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Relevance:</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.min(5, Math.ceil(result.relevance / 2))
                              ? 'bg-blue-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {!isSearching && query && results.length === 0 && (
        <div className="text-center py-8">
          <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            Try searching for different terms like "Next.js", "Canvas", or "TypeScript"
          </p>
        </div>
      )}
    </div>
  );
}