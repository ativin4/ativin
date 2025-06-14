# Portfolio and Interactive Tools

A modern web application built with Next.js that combines a personal portfolio with interactive development tools and a blog platform.

## Features

### DSA Problem Runner
- Interactive coding environment similar to LeetCode
- Monaco editor integration with syntax highlighting
- Custom type definitions support
- Automatic test case runner
- Code persistence using localStorage
- Visual feedback for interactions

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   └── tools/
│       └── dsaProblems/
│           └── [id]/         # Dynamic routes for DSA problems
│               ├── page.tsx  # Problem runner interface
│               └── utils.ts  # Helper functions and types
├── data/
│   └── problems.json        # DSA problem definitions
└── components/              # Reusable UI components
```

## Technologies Used

- [Next.js](https://nextjs.org) - React framework for production
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- TypeScript - Type safety and developer experience
- LocalStorage - Client-side data persistence

## Upcoming Features

- Expanded collection of DSA problems
- Personal tools section with developer utilities
- Blog section for sharing insights and experiences
- Enhanced UI/UX with modern design patterns

## Development

The project uses TypeScript and follows modern React patterns with Next.js 13+ features. Key components:

- Dynamic routes for problem pages
- Custom type definitions support in the code runner
- Client-side state management with localStorage
- Interactive UI elements with visual feedback

