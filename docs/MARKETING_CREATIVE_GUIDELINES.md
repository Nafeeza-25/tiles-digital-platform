# Marketing Creative Guidelines

These rules keep the Step 24 asset pack aligned with the existing Timeless Tiles identity and its fictional academic-demo context. The assets are editable SVGs built from native shapes and the project’s local brand and product artwork.

## Brand palette

| Token | Color | Use |
|---|---|---|
| Warm background | `#FAF8F4` | Main canvas and generous negative space. |
| Foreground | `#211E1C` | Large headings and primary text. |
| Muted surface | `#F1EDE7` | Soft panels and background variation. |
| Burgundy | `#6F2435` | Brand mark, CTA fill, restrained graphic accent. |
| Brass | `#A87947` | Small decorative highlights. |
| Stone | `#D9D0C6` | Quiet supporting surfaces. |

These are existing design-system tokens, not a redesign.

## Typography direction

- Use a system serif direction for editorial headings, with clear scale and short phrases.
- Use a system sans-serif direction for supporting copy, CTA labels, and factual details.
- Keep promotional text concise. Long descriptions belong in the caption or destination page, not inside the artwork.
- Preserve punctuation and product names as they appear in the catalogue.

## Logo usage

- Use the supplied Timeless Tiles wordmark as a local SVG reference.
- Keep its proportions intact and place it on a light warm-neutral field for contrast.
- Do not recolor, skew, crop, redraw, or add third-party marks.

## Spacing and composition

- Use an editorial hierarchy: brand, one short headline, one support line, one CTA, and a relevant product visual.
- Maintain visible whitespace between text, artwork, and the CTA.
- The square, horizontal, vertical, and banner formats use distinct compositions while retaining common colors and type direction.
- Story/Reel/Short layouts keep key copy in the central area, away from the extreme top and bottom UI zones.

## Product-art usage

- Use only local product/category SVG artwork already owned by this project.
- Product renders are deterministic academic demo illustrations, not photographs of physical manufactured stock.
- Match each product to its actual category. If comparing different finish labels, identify them as separate products rather than implying a controlled like-for-like test.
- Product/category attribution and any catalogue dependencies are listed in `public/marketing/manifest.json` and `MARKETING_ASSET_MANIFEST.md`.

## CTA style

- Use one clear action with a route implemented in the application.
- Keep CTA wording readable, short, and descriptive: for example, “Compare Tiles” or “Read the Guide.”
- Do not imply an outcome, response time, or sales result that the project cannot substantiate.

## Offer-claim rules

- Show offers only when a current product has `sale_price > 0` and `sale_price < price`.
- Use the actual catalogue values and the existing INR-per-square-metre unit.
- Do not add expiry dates, countdowns, coupons, artificial scarcity, or unsupported discount percentages.
- If a future graphic includes a savings percentage, calculate it from that product’s actual prices and validate rounding; this pack avoids that claim.

## Review-claim rules

- This pack deliberately contains no testimonial or customer-review creative.
- Never invent quotes, reviewers, customer counts, ratings, or engagement numbers. Any later use of reviews must follow the platform’s approved fictional-demo review state and disclosure.

## Store and location claims

- Permitted language is limited to “Find a Store” and “Explore Demo Store Locations.”
- The Store Finder records are fictional. No addresses or map imagery appear in these graphics.
- Do not say “nearest,” “near you,” or imply that a location is a real showroom or geographically close to a user.

## Room recommendation claims

- Call the feature “Room Recommendations” or “Find Tiles for Your Space.”
- The actual experience uses catalogue room-suitability tags and optional filters. Do not call it AI-powered, machine learning, or personalized.

## Academic-demo disclosure

- These assets are fictional academic-demo marketing material and are not published or used in live advertising.
- Preserve the on-artwork “Fictional Academic Demo” note where present.
- Prices and product content are demonstration data. Verify them again before any future use beyond the project.

## Accessibility

- Each asset has concise descriptive alt text in the JSON and Markdown manifests and in the preview page.
- Use readable text size, strong contrast, and a simple hierarchy. Avoid conveying a price or CTA through color alone.
- Decorative shapes should not crowd important text. Maintain the original aspect ratio when exporting or placing the SVG.
- Treat each native SVG as a visual asset; provide equivalent CTA and destination as selectable text in the publishing interface when used in the future.
