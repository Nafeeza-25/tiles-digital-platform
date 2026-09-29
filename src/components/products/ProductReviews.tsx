import { Star } from "lucide-react";
import type { ProductReview } from "@/lib/queries/product";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import type { ReviewProductContext } from "@/lib/reviews/review-utils";

export function ProductReviews({ reviews, product }: { reviews: ProductReview[]; product: ReviewProductContext }) {
  return <section aria-labelledby="reviews-heading" className="space-y-6">
    <div>
      <h2 id="reviews-heading" className="text-2xl">Approved Reviews</h2>
      {reviews.length ? <><div className="mt-5 grid gap-4 md:grid-cols-2">{reviews.map((review) => <article key={review.id} className="border bg-surface p-5"><p className="sr-only">Rated {review.rating} out of 5 stars</p><div className="flex text-accent" aria-hidden>{Array.from({ length: review.rating }, (_, index) => <Star key={index} className="size-4 fill-current" />)}</div>{review.title ? <h3 className="mt-4 text-lg">{review.title}</h3> : null}<p className="mt-3 text-muted">“{review.comment}”</p><p className="mt-4 text-sm font-semibold">{review.customer_name}</p></article>)}</div><p className="mt-4 text-sm text-muted">Demo review content for the academic project.</p></> : <p className="mt-3 border bg-surface p-6 text-muted">No approved demo reviews are available for this tile yet.</p>}
    </div>
    <ReviewForm product={product} />
  </section>;
}
