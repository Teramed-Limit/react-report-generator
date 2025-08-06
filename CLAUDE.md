# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development Server:**
```bash
yarn dev                    # Start development server on http://localhost:5173
yarn dev-profile           # Start with profiling enabled
```

**Build Commands:**
```bash
yarn build                 # Build library for production (outputs to dist/)
yarn preview              # Preview production build
```

**Code Quality:**
```bash
yarn lint                 # Run ESLint with TypeScript rules
```

**NPM Registry (Verdaccio):**
```bash
# Login to private registry
npm login --registry http://192.168.50.254:49153

# Publish to private registry  
npm publish --registry http://192.168.50.254:49153

# Install from private registry
npm install react-report-lib@latest --registry http://192.168.50.254:49153
```

## Architecture Overview

This is a React TypeScript library that provides three main report components for generating dynamic forms, reports, and PDFs. The architecture follows a modular pattern with clear separation between form definition, rendering, and PDF generation.

### Core Components

**Main Library Exports (lib/main.ts):**
- `ISVReport` - Dynamic form renderer with validation and state management
- `ISVReportGenerator` - Visual report builder with drag-and-drop interface  
- `ISVReportPDF` - PDF generator using @react-pdf/renderer

### State Management Architecture

**Recoil Atoms Structure:**
- `formDefineAtom` - Form structure definition (sections, fields, validation rules)
- `formValuesAtom` - Current form data values
- `formStatesAtom` - Field validation states and UI states
- `fieldCollectionAtom` - Computed paths to all fields for efficient access
- `codeListMapAtom` - Dropdown/selection options data

**Key State Flow:**
1. Form definitions define structure and validation rules
2. Field collections create indexed paths for efficient field access
3. Form values store actual data while form states track validation
4. Changes trigger validation service and conditional field logic

### Field Type System

**Core Field Types (lib/field/field-type.ts):**
- Text, TextArea, Number, Date, Time - Basic input fields
- Checkbox, Radio, CodeListSelection - Selection fields  
- Composite - Nested field containers
- Array - Dynamic repeating field groups
- SRText - Special rich text fields with tree structure
- Diagram - Canvas-based drawing fields

**Field Architecture Pattern:**
- Each field type has a class definition (`*AttributeClass.ts`)
- Corresponding React component (`*AttributeComponent.tsx`) 
- Validation rules and conditional logic support
- Recoil integration for state management

### Validation System

**Validation Service (lib/service/validation/):**
- Factory pattern with pluggable validators
- Built-in validators: `required`, `none`
- Custom validation rules per field
- Integration with Recoil for real-time validation state

### PDF Generation Architecture

**PDF Rendering Flow:**
1. Form data + definitions → PDF components
2. @react-pdf/renderer converts React components to PDF
3. Custom PDF components mirror form field types
4. Support for headers, footers, and image attachments
5. Observable pattern for render completion callbacks

### Canvas/Drawing System

**Konva Integration (lib/konva-comp/):**
- Canvas overlay for diagram fields
- Drawing tools: Arrow, Circle, Square, FreeDrawLine, Text
- Mouse event handling for each tool type
- Integration with form validation system

### File Organization Patterns

**Module Structure:**
```
lib/
├── ISVReport/           # Form renderer component
├── ISVReportGenerator/  # Visual builder component  
├── ISVReportPDF/       # PDF generation component
├── field/              # Reusable field components
├── types/              # TypeScript definitions
├── recoil/             # State management
├── service/            # Business logic (validation, utilities)
├── UI/                 # Base UI components
└── utils/              # Helper functions
```

**Component Co-location:**
- Each component has its own `.module.scss` file
- Complex components have dedicated folders with sub-components
- Event handlers separated into `*Event.ts` files

### Key Development Patterns

**Recoil Integration:**
- Use `useRecoilState` for read/write atoms
- Use `useRecoilValue` for read-only selectors  
- Use `useSetRecoilState` for write-only operations
- Selector families for parameterized computed values

**Type Safety:**
- Strict TypeScript configuration with form field interfaces
- Generic type support for image handling in PDF generation
- Type guards for field type discrimination (`isFieldMetaInfo`, etc.)

**Styling Approach:**
- SCSS modules for component-scoped styles
- Material-UI theme integration via `ThemeProvider`
- Shared theme configuration in `lib/theme/rootTheme.ts`

### Build Configuration

**Vite Library Mode:**
- Entry point: `lib/main.ts`
- ES modules output format
- CSS injection for library consumers
- TypeScript declaration generation
- External dependencies not bundled (React, Material-UI, etc.)

**Development vs Library:**
- `src/` contains demo/development application
- `lib/` contains actual library code
- Build process only includes `lib/` directory