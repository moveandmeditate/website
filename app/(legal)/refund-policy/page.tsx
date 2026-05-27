import type { Metadata } from "next";
import { LastUpdated, LegalProse } from "@/components/legal-prose";
import { CONTACT, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Cancellation, rescheduling and refund rules for ${SITE.name} sessions, workshops and weddings.`,
};

export default function RefundPolicyPage() {
  return (
    <LegalProse>
      <h1>Refund Policy</h1>
      <LastUpdated date="27 May 2026" />

      <p>
        We work hard to keep our pricing fair and our experiences worth your time. The policy below explains when refunds
        and reschedules are offered. By booking a session, workshop, wedding or corporate program with {SITE.name}, you
        agree to these rules.
      </p>

      <h2>1. Studio classes &amp; drop-ins</h2>
      <ul>
        <li>Cancel at least <strong>24 hours</strong> before the class to receive a full credit toward a future class.</li>
        <li>Cancellations within 24 hours, or no-shows, are non-refundable but can be transferred to another participant with our written approval.</li>
        <li>Class packs are non-transferable across studios unless we confirm in writing.</li>
      </ul>

      <h2>2. Workshops &amp; events</h2>
      <ul>
        <li>Cancel <strong>14+ days</strong> before the event for a full refund minus a 5% processing fee.</li>
        <li>Cancel <strong>7–14 days</strong> before the event for 50% refund or full credit toward a future event of equal value.</li>
        <li>Cancellations <strong>under 7 days</strong> are non-refundable. We will however try to fill your seat from the waitlist and, if successful, issue you a credit toward a future event.</li>
      </ul>

      <h2>3. Wedding choreography</h2>
      <ul>
        <li>
          Booking advance is non-refundable as it secures the date and starts the design work. Subsequent installments are governed
          by the signed agreement.
        </li>
        <li>
          Postponements within 60 days of the event are accommodated subject to availability; an admin fee of 10% of the package may apply.
        </li>
        <li>
          Cancellations within 30 days of the wedding date are non-refundable due to opportunity cost.
        </li>
      </ul>

      <h2>4. Corporate programs</h2>
      <p>
        Corporate engagements are governed by the signed Statement of Work. In the absence of specific terms in the SOW,
        the workshop rules above apply.
      </p>

      <h2>5. Online sessions</h2>
      <ul>
        <li>Single online sessions are refundable up to 6 hours before the session start time.</li>
        <li>Multi-week courses are refundable on a pro-rata basis if cancelled before the second session begins; non-refundable thereafter.</li>
        <li>If you miss a live session, you&apos;ll receive the recording (where available) at no extra cost.</li>
      </ul>

      <h2>6. Force majeure &amp; rescheduling by us</h2>
      <p>
        If {SITE.name} cancels or reschedules an event for reasons outside our control (illness, government regulation, venue
        loss, severe weather), we will offer either a full refund or a credit toward a future date — your choice.
      </p>

      <h2>7. How refunds are issued</h2>
      <p>
        Refunds are processed to the original payment method within <strong>7–10 working days</strong> of approval. Bank or
        gateway timelines may extend this in some cases. Credits issued in lieu of refunds are typically valid for{" "}
        <strong>12 months</strong> from the date of issue.
      </p>

      <h2>8. Disputes</h2>
      <p>
        If you have a concern about a refund, please email{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> with your booking reference. We&apos;ll acknowledge within
        2 working days and aim to resolve within 14 days.
      </p>
    </LegalProse>
  );
}
