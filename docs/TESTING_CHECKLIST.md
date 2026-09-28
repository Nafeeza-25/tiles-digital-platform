# Testing Checklist

This checklist is a future validation guide. It does not indicate that unimplemented functionality has passed.

## Installation and build

- [ ] Dependencies install successfully
- [ ] `npm run lint` passes
- [ ] `npm run build` passes

## Navigation and responsiveness

- [ ] Navigation works across implemented pages
- [ ] Responsive design works at mobile breakpoints
- [ ] Responsive design works at tablet breakpoints
- [ ] Responsive design works at desktop breakpoints
- [ ] Mobile testing is completed on representative devices or emulators
- [ ] Desktop testing is completed in supported browsers

## Product catalogue and details

- [ ] Product catalogue renders expected products
- [ ] Product search returns appropriate matches
- [ ] Product details show images, specifications, pricing, and applications

## Advanced filters and discovery

- [ ] Size filter works
- [ ] Colour filter works
- [ ] Finish filter works
- [ ] Material filter works
- [ ] Price filter works
- [ ] Application filter works
- [ ] Comparison works
- [ ] Room recommendations work

## Enquiries and conversion

- [ ] Quote form works
- [ ] Product enquiry form works
- [ ] Contact form works
- [ ] Required-field validation is clear and correct
- [ ] Valid submissions show success feedback
- [ ] Failed submissions show useful error feedback
- [ ] Enquiries are stored in Supabase
- [ ] WhatsApp links use the intended recipient and message

## Trust and local information

- [ ] Reviews render correctly
- [ ] Store finder returns relevant locations
- [ ] Store/showroom details are accurate
- [ ] Directions or map integration works

## SEO, accessibility, and performance

- [ ] SEO metadata is present and accurate
- [ ] Semantic landmarks and heading hierarchy are appropriate
- [ ] Basic accessibility checks pass, including keyboard access and alternative text
- [ ] Performance is checked with a suitable measurement tool
- [ ] No broken internal or external links remain

## Production deployment

- [ ] Production environment variables are configured securely
- [ ] Production deployment succeeds
- [ ] Production URL is tested after deployment
