# Contributing to Care Refrigeration

Thank you for your interest in contributing to the Care Refrigeration project! This document provides guidelines and best practices for contributing.

## Development Setup

1. **Prerequisites**
   - Node.js 18+ (recommended: 20 LTS)
   - npm 8+
   - Git

2. **Installation**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.local.example` to `.env.local`
   - Add your Gemini API key to `.env.local`

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Code Standards

### TypeScript

- Enable strict mode in TypeScript
- Use explicit types for function parameters and return values
- Avoid using `any` type
- Use interfaces for object shapes

### React Best Practices

- Use functional components with hooks
- Implement `React.memo()` for performance optimization
- Use `useCallback` and `useMemo` appropriately
- Follow single responsibility principle

### File Naming

- Components: `PascalCase.tsx` (e.g., `BookingForm.tsx`)
- Utilities: `camelCase.ts` (e.g., `validation.ts`)
- Constants: `camelCase.ts` (e.g., `constants.ts`)
- Hooks: `use` prefix (e.g., `useBookingForm.ts`)

### Code Organization

```
src/
├── components/      # React components
├── hooks/          # Custom React hooks
├── services/       # API and external services
├── utils/          # Utility functions
├── types.ts        # TypeScript type definitions
├── constants.ts    # Application constants
└── config/         # Configuration files
```

## Git Workflow

1. **Branch Naming**
   - Feature: `feature/description`
   - Bug fix: `fix/description`
   - Hotfix: `hotfix/description`

2. **Commit Messages**
   - Use conventional commits format
   - Examples:
     - `feat: add email validation`
     - `fix: resolve booking form submission error`
     - `docs: update README with setup instructions`
     - `refactor: improve error handling in geminiService`

3. **Pull Requests**
   - Provide clear description of changes
   - Reference related issues
   - Ensure all tests pass
   - Request code review

## Code Quality

### Before Committing

Run the following commands to ensure code quality:

```bash
npm run type-check  # TypeScript type checking
npm run lint        # ESLint
npm run format      # Prettier formatting
```

### Testing

- Write unit tests for utility functions
- Write integration tests for critical user flows
- Ensure test coverage > 80%

## Accessibility

- Use semantic HTML elements
- Add ARIA labels where necessary
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios (WCAG AA)

## Performance

- Lazy load components when appropriate
- Optimize images (use WebP, proper sizing)
- Implement code splitting
- Monitor bundle size

## Security

- Never commit API keys or sensitive data
- Sanitize user inputs
- Use HTTPS for all API calls
- Implement CSRF protection
- Follow OWASP best practices

## Documentation

- Add JSDoc comments for functions
- Update README.md when adding features
- Document API changes
- Keep inline comments clear and concise

## Questions?

If you have questions, please open an issue or contact the maintainers.

Thank you for contributing!