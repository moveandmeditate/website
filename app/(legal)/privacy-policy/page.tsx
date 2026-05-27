import type { Metadata } from "next";
import { LastUpdated, LegalProse } from "@/components/legal-prose";
import { CONTACT, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects personal data under India's Digital Personal Data Protection Act 2023.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalProse>
      <h1>Privacy Policy</h1>
      <LastUpdated date="27 May 2026" />

      <p>
        {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting the privacy of every visitor, student
        and client. This policy explains what personal data we collect, why we collect it, how we use it, and the rights
        you have under India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the
        Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information)
        Rules, 2011.
      </p>

      <h2>1. Data we collect</h2>
      <ul>
        <li>
          <strong>Contact information</strong> — name, email, phone number, city, and the message you submit via our
          contact form.
        </li>
        <li>
          <strong>Booking information</strong> — event name, date, package preferences and any health or wellness notes
          you choose to share.
        </li>
        <li>
          <strong>Payment information</strong> — handled by our payment processor; we never store full card numbers.
        </li>
        <li>
          <strong>Usage information</strong> — basic, aggregated analytics such as page views, device type and approximate
          location, used to improve the site experience.
        </li>
      </ul>

      <h2>2. How we use your data</h2>
      <ul>
        <li>Respond to enquiries and confirm bookings.</li>
        <li>Send service-related updates (event reminders, rescheduling, refunds).</li>
        <li>Send marketing communication only with your explicit consent — which you can withdraw at any time.</li>
        <li>Comply with applicable Indian tax and accounting laws.</li>
      </ul>

      <h2>3. Lawful basis</h2>
      <p>
        We rely on your <strong>consent</strong> (when you submit a form or subscribe), <strong>contract</strong>{" "}
        (when you book a paid session or workshop) and our <strong>legitimate interest</strong> (to keep our service safe
        and improve it) as lawful bases for processing under the DPDP Act.
      </p>

      <h2>4. Sharing &amp; storage</h2>
      <p>
        We do not sell your personal data. We share limited information with trusted processors only to deliver the
        service — for example, our email provider, payment gateway and analytics tooling. All processors are bound by
        confidentiality and security obligations.
      </p>
      <p>Personal data is stored on infrastructure located in India and the European Union. We retain data only for as long as required for the purpose collected, or as required by law.</p>

      <h2>5. Your rights under the DPDP Act</h2>
      <ul>
        <li><strong>Right to access</strong> the personal data we hold about you.</li>
        <li><strong>Right to correction</strong> of inaccurate or incomplete data.</li>
        <li><strong>Right to erasure</strong> of data that is no longer required.</li>
        <li><strong>Right to withdraw consent</strong> for marketing or optional processing at any time.</li>
        <li><strong>Right to grievance redressal</strong> via our Grievance Officer.</li>
        <li><strong>Right to nominate</strong> another individual to exercise these rights on your behalf in the event of death or incapacity.</li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        We currently use only essential cookies required for site functionality (such as remembering your form
        progress). If we later add analytics or marketing cookies, we will request your consent via an in-app banner
        before they are set.
      </p>

      <h2>7. Children</h2>
      <p>
        We do not knowingly collect personal data of anyone under 18 without verifiable parental or guardian consent.
        If we learn that we have, we will delete that data promptly.
      </p>

      <h2>8. Security</h2>
      <p>
        We use industry-standard administrative, technical and physical safeguards — including TLS encryption in
        transit, access controls and regular reviews. No system is fully impenetrable, however, and we encourage you to
        use strong, unique passwords and to contact us immediately if you suspect any unauthorised access.
      </p>

      <h2>9. Grievance Officer</h2>
      <p>
        As required under the DPDP Act and IT Rules, our Grievance Officer is responsible for addressing complaints
        about how we handle your personal data.
      </p>
      <ul>
        <li>
          <strong>Name:</strong> To be confirmed by {SITE.name}.{" "}
          <em>(Placeholder — final details to be updated before launch.)</em>
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </li>
        <li>
          <strong>Address:</strong> {CONTACT.city}, India.
        </li>
      </ul>
      <p>
        We will acknowledge complaints within 7 working days and aim to resolve them within 30 days, as required by law.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be communicated via the site banner or
        by email to subscribers. The most recent version is always available at this page.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions or concerns? Write to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we&apos;ll respond
        within one working day.
      </p>
    </LegalProse>
  );
}
