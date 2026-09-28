# Responsive Site Shell Design

## Intent

Build the reusable, accessible Timeless Tiles website shell without implementing customer-facing catalogue, search, comparison, recommendation, enquiry, or full homepage functionality.

## Architecture

`src/data/site.ts` is the single source for brand, primary navigation, category links, and quote CTA copy. The root layout renders a skip link, server-rendered header/footer, and a main landmark. Desktop navigation renders a keyboard-focusable Tiles dropdown and active-route states. Mobile navigation is the sole client component, responsible for toggle state, Escape close, navigation-close, and appropriate aria attributes.

`Breadcrumbs` remains a data-driven semantic component. Placeholder routes consume the shared shell and each declare accurate metadata. `/dev/visual-check` is excluded from navigation and only references local SVG assets for browser inspection.

## Accessibility and Responsive Behavior

Header, navigation, main, and footer use semantic landmarks. Skip links and global focus styles support keyboard navigation. The mobile menu uses semantic buttons, `aria-expanded`, `aria-controls`, and Escape behavior. The design is mobile-first, preserves touch targets and padding at 320px/375px, progressively exposes desktop navigation/dropdown from tablet widths, and stacks the footer at narrow widths.

## Constraints

- Use existing original local brand and image assets only; do not introduce remote fonts, data, or secrets.
- The header CTA links only to `/contact?intent=quote`; no quote form is built.
- Route pages are clearly temporary and must not mark future modules as complete.
- Metadata is limited to the listed foundational routes; full SEO is out of scope.
