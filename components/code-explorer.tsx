'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Code2 } from 'lucide-react';
import { studioFiles, type FileExplanation } from '@/lib/studio-data';

export function CodeExplorer() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['/']);
  const [selectedFile, setSelectedFile] = useState<FileExplanation | null>(studioFiles[0]);

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const getIndentLevel = (path: string) => {
    if (path === '/') return 0;
    return path.split('/').length - 1;
  };

  const renderFileTree = () => {
    return studioFiles.map((file) => {
      const isExpanded = expandedItems.includes(file.path);
      const indentLevel = getIndentLevel(file.path);
      const isSelected = selectedFile?.path === file.path;
      
      return (
        <div
          key={file.path}
          className={`border-l-2 transition-colors ${
            isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${indentLevel * 20 + 8}px` }}
        >
          <button
            onClick={() => {
              setSelectedFile(file);
              if (file.type === 'directory') {
                toggleExpanded(file.path);
              }
            }}
            className="w-full flex items-center space-x-2 py-2 px-2 text-left"
          >
            {file.type === 'directory' ? (
              <>
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <Folder className="w-4 h-4 text-blue-600" />
              </>
            ) : (
              <>
                <div className="w-4" />
                <File className="w-4 h-4 text-gray-600" />
              </>
            )}
            <span className={`text-sm ${isSelected ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
              {file.name}
            </span>
          </button>
        </div>
      );
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Code2 className="w-6 h-6 text-blue-600" />
          <span>Interactive Code Explorer</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Explore the studio repository structure and learn about each file's purpose
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Tree */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Structure</h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {renderFileTree()}
          </div>
        </div>

        {/* File Details */}
        <div className="space-y-4">
          {selectedFile && (
            <>
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  {selectedFile.type === 'directory' ? (
                    <Folder className="w-5 h-5 text-blue-600" />
                  ) : (
                    <File className="w-5 h-5 text-gray-600" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{selectedFile.name}</h3>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {selectedFile.type}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{selectedFile.purpose}</p>

                {selectedFile.keyFeatures && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedFile.keyFeatures.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFile.technicalDetails && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Technical Details:</h4>
                    <p className="text-sm text-gray-600">{selectedFile.technicalDetails}</p>
                  </div>
                )}

                {selectedFile.codeExample && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Code Example:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                      <code>{selectedFile.codeExample}</code>
                    </pre>
                  </div>
                )}

                {selectedFile.relatedFiles && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Related Files:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedFile.relatedFiles.map((file, index) => (
                        <li key={index} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                          {file}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}