# Contributing to SciViz Design System

Thank you for your interest in contributing to the SciViz Design System! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/SciViz-Design-System.git
   cd SciViz-Design-System
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run check  # Type checking
   npm run build  # Build test
   ```

4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "feat: add new scientific visualization component"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Include proper prop types and documentation

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system patterns
- Ensure responsive design

### File Organization
```
client/src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── ...           # Feature-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── pages/            # Page components
```

## Component Guidelines

### Creating New Components

1. **Location**: Place reusable components in `client/src/components/ui/`
2. **Naming**: Use PascalCase for component names
3. **Structure**:
   ```tsx
   import React from 'react';
   import { cn } from '@/lib/utils';

   interface ComponentProps {
     // Define props with proper types
   }

   export const Component = ({ ...props }: ComponentProps) => {
     return (
       // Component JSX
     );
   };
   ```

### Documentation
- Include JSDoc comments for complex components
- Provide usage examples in comments
- Document prop interfaces thoroughly

## Scientific Visualization Guidelines

When adding scientific visualization components:

1. **Accuracy**: Ensure scientific accuracy in visualizations
2. **Performance**: Optimize for large datasets
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **Responsiveness**: Ensure components work on all screen sizes

## Testing

- Write tests for new components and utilities
- Ensure existing tests pass before submitting PR
- Test across different browsers and devices

## Pull Request Guidelines

### PR Title Format
Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### PR Description
Include:
- **What**: Brief description of changes
- **Why**: Reason for the changes
- **How**: Technical approach used
- **Testing**: How the changes were tested
- **Screenshots**: For UI changes

### Review Process
1. Automated checks must pass
2. At least one maintainer review required
3. Address all feedback before merge
4. Squash commits when merging

## Issue Reporting

When reporting issues:

1. **Search existing issues** first
2. **Use issue templates** when available
3. **Provide detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots/videos if applicable

## Feature Requests

For new features:

1. **Check existing roadmap** and issues
2. **Discuss in issues** before implementing
3. **Consider scope** and alignment with project goals
4. **Provide use cases** and examples

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow GitHub's community guidelines

## Getting Help

- **Documentation**: Check README and docs first
- **Issues**: Search existing issues for solutions
- **Discussions**: Use GitHub Discussions for questions
- **Contact**: Reach out to maintainers for urgent matters

## Recognition

Contributors will be recognized in:
- README contributors section
- Release notes for significant contributions
- GitHub contributor graphs

Thank you for contributing to SciViz Design System! 🚀