import type { Metadata } from "next";
import { LastUpdated, LegalProse } from "@/components/legal-prose";
import { CONTACT, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of using ${SITE.name} services — bookings, payments, conduct and dispute resolution.`,
};

export default function TermsPage() {
  return (
    <LegalProse>
      <h1>Terms &amp; Conditions</h1>
      <LastUpdated date="27 May 2026" />

      <p>
        These terms govern your use of the {SITE.name} website and any sessions, workshops, weddings, corporate programs
        or online classes you book through us. By using the site or booking a service, you agree to these terms.
      </p>

      <h2>1. The service</h2>
      <p>
        {SITE.name}, led by {SITE.founderName}, provides dance, yoga, breathwork, sound-healing and choreography services
        to individuals, couples, families and organisations. Service descriptions, schedules and pricing are published on
        this site and may be updated from time to time.
      </p>

      <h2>2. Bookings &amp; payments</h2>
      <ul>
        <li>Bookings are confirmed only after full payment (or the agreed advance) is received.</li>
        <li>Prices are inclusive of applicable taxes unless stated otherwise.</li>
        <li>Payments are processed via licensed payment partners. We do not store your card details.</li>
        <li>
          For destination weddings, corporate retreats or custom packages, a written quote and signed agreement override
          any generic pricing shown on this site.
        </li>
      </ul>

      <h2>3. Cancellations &amp; refunds</h2>
      <p>
        Refunds, rescheduling and cancellation rules are described in our separate <a href="/refund-policy">Refund Policy</a>.
        That policy forms part of these terms.
      </p>

      <h2>4. Health, safety and your responsibility</h2>
      <ul>
        <li>
          Dance and yoga involve physical exertion. By booking a class or event, you confirm you are medically fit, or
          that you have consulted a qualified medical professional before participating.
        </li>
        <li>
          You agree to inform the instructor in writing of any injury, pregnancy, surgery or condition that may affect
          your practice.
        </li>
        <li>
          We may refuse participation if a practice is unsuitable or unsafe for you. Any such decision is taken in good
          faith and is not refundable beyond the terms in the Refund Policy.
        </li>
      </ul>

      <h2>5. Conduct</h2>
      <p>
        We host inclusive, respectful spaces. Harassment, discrimination, intoxication, or behaviour that disrupts
        practice or endangers others may result in removal from the session and termination of services without refund.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        All content on this site — including text, choreography, photography, video, music compilations, course
        materials, branding and the logo — is owned by {SITE.name} or licensed to it. You may not reproduce, distribute,
        teach or commercially use this content without prior written permission.
      </p>

      <h2>7. Photography &amp; recordings</h2>
      <p>
        We may photograph or record events for portfolio, marketing or training. Participants will be informed and can
        opt out in writing before the session. We will not publish recognisable images of opt-out participants.
      </p>

      <h2>8. Third-party services</h2>
      <p>
        Some bookings may involve third parties (venues, sound engineers, payment gateways). We are not responsible for
        the conduct of independent third parties and any liability is limited to the amount you paid {SITE.name}.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by Indian law, our liability for any claim arising out of these terms is limited
        to the fee you paid for the specific service that gave rise to the claim. We are not liable for indirect, incidental
        or consequential damages.
      </p>

      <h2>10. Force majeure</h2>
      <p>
        We are not liable for delays or failures caused by events outside our reasonable control — including natural
        disasters, pandemics, government action, internet outages or supplier failures. In such cases, we will offer a
        reschedule or credit.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Material changes will be highlighted on this page and will apply to
        bookings made after the change date.
      </p>

      <h2>12. Governing law &amp; jurisdiction</h2>
      <p>
        These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the
        courts at {CONTACT.city}.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions or notices under these terms can be sent to{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    </LegalProse>
  );
}
