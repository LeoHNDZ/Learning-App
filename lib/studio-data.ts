// Studio repository structure and content data
export interface FileExplanation {
  path: string;
  name: string;
  type: 'file' | 'directory';
  purpose: string;
  keyFeatures?: string[];
  technicalDetails?: string;
  codeExample?: string;
  relatedFiles?: string[];
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TutorialStep {
  title: string;
  description: string;
  codeFile?: string;
  codeHighlight?: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const studioFiles: FileExplanation[] = [
  {
    path: "/",
    name: "Root Directory",
    type: "directory",
    purpose: "Main project directory containing the entire TicketMaker application",
    keyFeatures: [
      "Next.js 15 application structure",
      "TypeScript configuration",
      "Tailwind CSS styling",
      "Firebase integration setup"
    ]
  },
  {
    path: "package.json",
    name: "Package Configuration",
    type: "file",
    purpose: "Defines project dependencies, scripts, and metadata for the TicketMaker application",
    keyFeatures: [
      "Next.js 15.3.3 as the main framework",
      "React 18 for UI components",
      "GenKit AI integration for AI features",
      "Radix UI components for accessible UI",
      "Tailwind CSS for styling",
      "Vitest for testing"
    ],
    technicalDetails: "The project uses modern React patterns with hooks and functional components. It includes comprehensive UI libraries and testing setup.",
    codeExample: `{
  "name": "nextn",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "test": "vitest run"
  }
}`
  },
  {
    path: "src/app/page.tsx",
    name: "Dashboard Page",
    type: "file",
    purpose: "Main dashboard component that displays and manages the list of tickets/cards",
    keyFeatures: [
      "Ticket creation functionality",
      "LocalStorage persistence",
      "Image loading with fallbacks",
      "Navigation to edit mode"
    ],
    technicalDetails: "Uses React hooks for state management and localStorage for data persistence. Handles image loading asynchronously with error handling.",
    codeExample: `const createNewTicket = () => {
  const img = new Image();
  img.src = '/Ticket.png';
  img.onload = () => {
    const newTicket = defaultTicket(img.width, img.height);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    router.push(\`/edit/\${newTicket.id}\`);
  };
};`,
    relatedFiles: ["src/components/ticket-list.tsx", "src/lib/types.ts"]
  },
  {
    path: "src/lib/types.ts",
    name: "Type Definitions",
    type: "file",
    purpose: "Central type definitions for the application's data structures",
    keyFeatures: [
      "TextElement interface for canvas text",
      "Ticket interface for card data",
      "Contact interface for user data"
    ],
    technicalDetails: "TypeScript interfaces ensure type safety throughout the application",
    codeExample: `export type Ticket = {
  id: string;
  name: string;
  backgroundImageUrl: string | null;
  texts: TextElement[];
  canvasWidth: number;
  canvasHeight: number;
  createdAt: number;
};`
  },
  {
    path: "src/components/composer-canvas.tsx",
    name: "Canvas Editor",
    type: "file",
    purpose: "Interactive canvas component for editing text elements on tickets",
    keyFeatures: [
      "Drag and drop text positioning",
      "Real-time text editing",
      "Auto-save functionality",
      "Autocomplete integration"
    ],
    technicalDetails: "Complex component handling mouse events, canvas rendering, and text manipulation with debounced auto-save",
    relatedFiles: ["src/components/text-editor-overlay.tsx", "src/data/repository.ts"]
  },
  {
    path: "src/data/",
    name: "Data Layer",
    type: "directory",
    purpose: "Contains the data management system including repositories and utilities",
    keyFeatures: [
      "Composition repository pattern",
      "Phrase extraction for autocomplete",
      "LocalStorage and API abstractions",
      "Type-safe data operations"
    ]
  },
  {
    path: "src/data/phraseUtils.ts",
    name: "Phrase Extraction Utilities",
    type: "file",
    purpose: "Extracts and scores phrases from text for intelligent autocomplete suggestions",
    keyFeatures: [
      "N-gram extraction (1-5 words)",
      "Frequency and recency scoring",
      "Exponential decay algorithm",
      "Minimum length filtering"
    ],
    technicalDetails: "Uses sophisticated scoring algorithm with 60-minute half-life for recency weighting",
    codeExample: `export function extractPhrases(text: string): string[] {
  const words = text.toLowerCase().split(/\\s+/).filter(w => w.length >= 2);
  const phrases: string[] = [];
  
  for (let n = 1; n <= 5; n++) {
    for (let i = 0; i <= words.length - n; i++) {
      phrases.push(words.slice(i, i + n).join(' '));
    }
  }
  
  return phrases;
}`
  },
  {
    path: "src/data/localCompositionRepository.ts",
    name: "Local Storage Repository",
    type: "file",
    purpose: "Manages composition data persistence using browser localStorage",
    keyFeatures: [
      "CRUD operations for compositions",
      "Phrase caching and scoring",
      "Auto-save with debouncing",
      "Error handling and recovery"
    ],
    technicalDetails: "Implements repository pattern with localStorage as the backing store, includes sophisticated caching mechanisms"
  }
];

export const tutorials: Tutorial[] = [
  {
    id: "getting-started",
    title: "Understanding the Studio Architecture",
    description: "Learn the overall structure and key components of the TicketMaker application",
    difficulty: "beginner",
    steps: [
      {
        title: "Project Overview",
        description: "The studio is a Next.js application for creating and editing visual tickets/cards",
        explanation: "The application follows a modern React architecture with TypeScript for type safety and Tailwind CSS for styling."
      },
      {
        title: "Main Components",
        description: "Explore the key components: Dashboard, Canvas Editor, and Data Layer",
        explanation: "The app is structured with clear separation of concerns: UI components, data management, and business logic."
      },
      {
        title: "Data Flow",
        description: "Understand how data flows from localStorage through repositories to the UI",
        explanation: "The repository pattern abstracts data storage, making it easy to switch between localStorage and API backends."
      }
    ]
  },
  {
    id: "canvas-system",
    title: "Canvas Editing System",
    description: "Deep dive into how the interactive canvas editor works",
    difficulty: "intermediate",
    steps: [
      {
        title: "Canvas Initialization",
        description: "Learn how the canvas is set up and configured",
        codeFile: "src/components/composer-canvas.tsx",
        explanation: "The canvas uses HTML5 canvas with React refs for direct DOM manipulation."
      },
      {
        title: "Text Element Management",
        description: "Understand how text elements are created, edited, and positioned",
        explanation: "Each text element has its own state with position, styling, and content properties."
      },
      {
        title: "Drag and Drop Implementation",
        description: "Explore the mouse event handling for dragging text elements",
        explanation: "Custom mouse event handlers enable smooth dragging with position calculations."
      }
    ]
  },
  {
    id: "autocomplete-system",
    title: "Autocomplete and Phrase Extraction",
    description: "Learn about the intelligent autocomplete system",
    difficulty: "advanced",
    steps: [
      {
        title: "Phrase Extraction Algorithm",
        description: "Understand how n-grams are extracted from text",
        codeFile: "src/data/phraseUtils.ts",
        explanation: "The system extracts 1-5 word phrases and scores them based on frequency and recency."
      },
      {
        title: "Scoring and Ranking",
        description: "Learn how phrases are scored and ranked for suggestions",
        explanation: "Uses exponential decay with a 60-minute half-life to prioritize recent and frequent phrases."
      },
      {
        title: "Repository Integration",
        description: "See how the autocomplete integrates with the data layer",
        explanation: "The repository pattern allows the autocomplete to work with different data sources."
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the main framework used in the studio repository?",
    options: ["React", "Vue.js", "Next.js", "Angular"],
    correctAnswer: 2,
    explanation: "The studio uses Next.js 15.3.3 as its main framework, which provides React with additional features like server-side rendering and routing.",
    category: "Architecture"
  },
  {
    id: "q2",
    question: "How are tickets persisted in the application?",
    options: ["Database", "localStorage", "Session storage", "Cookies"],
    correctAnswer: 1,
    explanation: "The application uses localStorage to persist tickets locally in the browser, with plans for API integration in the future.",
    category: "Data Management"
  },
  {
    id: "q3",
    question: "What pattern is used for data management in the studio?",
    options: ["MVC", "Repository Pattern", "Observer Pattern", "Singleton Pattern"],
    correctAnswer: 1,
    explanation: "The studio uses the Repository Pattern to abstract data storage, allowing easy switching between localStorage and API backends.",
    category: "Architecture"
  },
  {
    id: "q4",
    question: "What is the half-life used in the phrase scoring algorithm?",
    options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
    correctAnswer: 1,
    explanation: "The phrase extraction system uses a 60-minute half-life for exponential decay in the recency scoring algorithm.",
    category: "Algorithms"
  },
  {
    id: "q5",
    question: "Which UI library is primarily used for components?",
    options: ["Material-UI", "Ant Design", "Radix UI", "Chakra UI"],
    correctAnswer: 2,
    explanation: "The studio uses Radix UI components, which provide accessible, unstyled UI primitives that work well with Tailwind CSS.",
    category: "UI/UX"
  }
];