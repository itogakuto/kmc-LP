# Lusion

## Mission
Create implementation-ready, token-driven UI guidance for Lusion that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand
- Product/brand: Lusion
- URL: https://lusion.co/
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Aeonik`, `font.family.stack=Aeonik`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=18.4px`
- Typography scale: `font.size.xs=14px`, `font.size.sm=15.12px`, `font.size.md=16px`, `font.size.lg=18.9px`, `font.size.xl=20px`, `font.size.2xl=22.68px`, `font.size.3xl=37.8px`, `font.size.4xl=38px`
- Color palette: `color.text.primary=#000000`, `color.surface.muted=#ffffff`, `color.text.tertiary=#f0f1fa`, `color.surface.raised=#2b2e3a`, `color.surface.strong=#e4e6ef`
- Spacing scale: `space.1=1.51px`, `space.2=3.78px`, `space.3=11.81px`, `space.4=15.12px`, `space.5=15.75px`, `space.6=16px`, `space.7=20px`, `space.8=22.68px`
- Radius/shadow/motion tokens: `radius.xs=10px`, `radius.sm=18px`, `radius.md=80.33px`, `radius.lg=87.5px`, `radius.xl=100px` | `shadow.1=rgba(0, 0, 0, 0.04) 0px 6px 10px 0px, rgba(0, 0, 0, 0.04) 0px 2px 4px 0px` | `motion.duration.instant=200ms`, `motion.duration.fast=250ms`, `motion.duration.normal=400ms`, `motion.duration.slow=500ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (26), buttons (12), inputs (2), navigation (1).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
