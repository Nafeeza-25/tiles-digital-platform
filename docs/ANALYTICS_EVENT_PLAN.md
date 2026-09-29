# Provider-Neutral Analytics Event Plan

**Status:** planning only. No analytics SDK, pixel, consent banner, or third-party event transmission is installed. No live conversion data exists. This taxonomy is a future measurement proposal, not a claim of legal compliance.

## Proposed events

Parameters below are allowlisted, non-sensitive identifiers or categorical values. Track only the fields listed for an event; do not copy form fields, query free text, or page URLs containing user-entered values.

| Event | User action | Page or feature | Useful non-sensitive parameters | KPI relationship |
| --- | --- | --- | --- | --- |
| `catalogue_view` | Opens the catalogue | `/tiles` | `category_slug` | Catalogue engagement |
| `catalogue_search` | Submits a catalogue search | `/tiles` | `query_length` (numeric only) | Search usage |
| `catalogue_filter_apply` | Applies a filter | Catalogue | `filter_name`, `category_slug` | Filter adoption |
| `product_view` | Opens a product detail | Product page | `product_slug`, `category_slug` | Product interest |
| `product_compare_add` | Adds a product to comparison | Catalogue/product page | `product_slug`, `category_slug` | Comparison engagement |
| `comparison_view` | Views selected product comparison | `/compare` | `product_count` | Comparison completion |
| `recommendation_room_select` | Selects a room | `/recommendations` | `room` | Recommendation entry |
| `recommendation_result_view` | Views matched recommendations | `/recommendations` | `room`, `result_count` | Recommendation engagement |
| `quote_form_start` | Begins a quote enquiry | `/contact` | `enquiry_type` | Quote funnel starts |
| `quote_form_submit` | Successfully submits a quote enquiry | `/contact` | `enquiry_type` | Primary conversion |
| `product_enquiry_submit` | Successfully submits a product enquiry | `/contact` | `product_slug`, `enquiry_type` | Primary conversion |
| `contact_form_submit` | Successfully submits a general contact enquiry | `/contact` | `enquiry_type` | Primary conversion |
| `whatsapp_click` | Opens the configured WhatsApp enquiry link | Product/contact/store page | `product_slug`, `store_slug`, `enquiry_type` | Secondary conversion |
| `review_submit` | Submits a review for moderation | Product page | `product_slug`, `category_slug` | Secondary participation |
| `store_finder_view` | Opens the Store Finder | `/stores` | none | Local discovery engagement |
| `store_phone_click` | Clicks a store phone action | `/stores` | `store_slug` | Secondary contact intent |
| `store_whatsapp_click` | Clicks a store WhatsApp action | `/stores` | `store_slug` | Secondary contact intent |
| `store_directions_click` | Opens store directions | `/stores` | `store_slug` | Secondary visit intent |
| `guide_view` | Opens an educational guide | `/guides/[slug]` | `content_slug` | Educational content engagement |
| `offer_view` | Opens the offers page | `/offers` | `product_slug` when a specific offer is opened | Offer engagement |

## Privacy and data minimization

Never send a person's **name**, **phone number**, **email address**, **message contents**, **full address**, **free-text review content**, **enquiry content**, or **credentials** to an analytics provider. Do not track user-entered free text, search terms, contact details, or form values. Keep event parameters to non-sensitive values such as `product_slug`, `category_slug`, `room`, `filter_name`, `content_slug`, `store_slug`, and `enquiry_type`; do not place identity or free text in these fields.

## Conversion definitions

Primary future conversions are successful `quote_form_submit`, `product_enquiry_submit`, and `contact_form_submit` events. Secondary actions are `whatsapp_click`, `store_phone_click`, `store_directions_click`, and `review_submit`. A click or client-side event is not proof of a sale or fulfilled enquiry. There is currently no analytics installation and no live conversion data.

## Provider options for a later decision

Future options could include Vercel Web Analytics, Google Analytics 4, or a privacy-focused analytics provider. Compare data collection, retention, regional processing, opt-out and consent behavior, and applicable privacy requirements before selecting or installing a provider. No provider is selected or configured, and using a provider does not automatically establish legal compliance.
