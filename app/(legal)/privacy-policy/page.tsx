import type { Metadata } from "next";
import { LastUpdated, LegalProse } from "@/components/legal-prose";
import { SITE } from "@/lib/content";
import { getEffectiveContact } from "@/sanity/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects personal data under India's Digital Personal Data Protection Act 2023.`,
};

export default async function PrivacyPolicyPage() {
  const contact = await getEffectiveContact();
  return (
    <LegalProse>
      <h1>Privacy Policy</h1>
      <LastUpdated date="27 May 2026" />

      <p>
        {SITE.name}{" "}(&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is run as a sole
        proprietorship by {SITE.founderName}{" "}from Bangalore, Karnataka, India. This policy
        explains what personal data this website collects, why we collect it, how we use it,
        and your rights under India&rsquo;s{" "}
        <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the
        Information Technology (Reasonable Security Practices and Procedures and Sensitive
        Personal Data or Information) Rules, 2011.
      </p>

      <h2>1. What this website does (and does not) do</h2>
      <p>
        This website is informational. We share what we offer, who we are, and let visitors
        send us an enquiry. We <strong>do not</strong> sell anything on this site, do not
        process payments here, do not create user accounts, and do not host an online
        booking system. All sessions, workshops and engagements are arranged separately,
        offline, after an initial conversation.
      </p>

      <h2>2. Data we collect through this website</h2>
      <ul>
        <li>
          <strong>Contact-form details</strong> &mdash; the name, email, phone number,
          area of interest and message you submit through the contact form. This is the
          only personal data you actively provide on this website.
        </li>
        <li>
          <strong>Analytics, only with your consent</strong> &mdash; aggregated, anonymised
          page-view information through Google Analytics 4. The analytics snippet is loaded
          only after you accept the consent banner shown on your first visit. If you
          decline, no analytics cookies or identifiers are set.
        </li>
      </ul>
      <p>
        Anything you share with us through email, WhatsApp or in person after that first
        enquiry is governed by ordinary professional confidentiality, not by this website
        policy.
      </p>

      <h2>3. How we use this data</h2>
      <ul>
        <li>Reply to your enquiry and arrange a follow-up conversation.</li>
        <li>Keep a basic record of past conversations so we can serve you better.</li>
        <li>
          Understand which parts of the website are useful, so we can improve it &mdash;
          only if you have consented to analytics.
        </li>
        <li>Comply with applicable Indian tax, accounting and other legal requirements.</li>
      </ul>
      <p>
        We do not use your data for automated decision-making and we do not profile you. We
        do not send marketing email or SMS from contact-form submissions; if we ever add a
        newsletter, it will be a separate, explicit opt-in.
      </p>

      <h2>4. Lawful basis</h2>
      <p>
        We rely on your <strong>consent</strong> (when you submit a contact form or accept
        the analytics banner) and our <strong>legitimate interest</strong> in running a
        responsive, safe small business as lawful bases under the DPDP Act.
      </p>

      <h2>5. Sharing and storage</h2>
      <p>
        We do not sell your personal data. To deliver the service, your contact-form data
        is processed by a small set of trusted vendors, each bound by their own privacy and
        security obligations:
      </p>
      <ul>
        <li>
          <strong>Google Workspace</strong> (Sheets &amp; Gmail) &mdash; for storing
          submissions and emailing you back.
        </li>
        <li>
          <strong>Vercel</strong> &mdash; hosting infrastructure for this website (India
          and EU regions).
        </li>
        <li>
          <strong>Sanity</strong> &mdash; the content management system we use to publish
          the marketing copy. It does not receive contact-form submissions.
        </li>
        <li>
          <strong>Google Analytics 4</strong> &mdash; aggregated, consent-gated traffic
          measurement only.
        </li>
      </ul>
      <p>
        We retain contact-form submissions for as long as the conversation is active, plus
        a reasonable archival period (typically up to 24 months) for follow-up, audit and
        any legal compliance reasons. After that, records are deleted or anonymised.
      </p>

      <h2>6. Your rights under the DPDP Act</h2>
      <ul>
        <li><strong>Right to access</strong> the personal data we hold about you.</li>
        <li><strong>Right to correction</strong> of inaccurate or incomplete data.</li>
        <li><strong>Right to erasure</strong> when the data is no longer required.</li>
        <li>
          <strong>Right to withdraw consent</strong> for analytics or any optional
          processing at any time.
        </li>
        <li>
          <strong>Right to grievance redressal</strong> &mdash; reach the contact below.
        </li>
        <li>
          <strong>Right to nominate</strong> someone to exercise these rights on your
          behalf in case of death or incapacity.
        </li>
      </ul>
      <p>
        To exercise any of these rights, write to the data-concerns contact in section 9
        below. We will acknowledge within 7 working days and resolve within 30 days, in
        line with the DPDP Act.
      </p>

      <h2>7. Cookies &amp; analytics</h2>
      <p>
        We use Google Analytics 4 to understand aggregate traffic patterns. The analytics
        snippet is only loaded after you accept the consent banner shown on your first
        visit. If you decline, no analytics cookies are set. You can clear your choice at
        any time by clearing site data in your browser.
      </p>
      <p>
        Beyond analytics, the only cookies we set are essential ones required for site
        functionality (for example, remembering your consent decision so the banner does
        not show on every page).
      </p>

      <h2>8. Children</h2>
      <p>
        Younger movers are welcome at {SITE.name}. The website itself is intended for adult
        visitors, so we only collect a minor&rsquo;s personal data when a parent or legal
        guardian submits the enquiry on their behalf, or when the minor submits it with
        verifiable parental or guardian consent in line with the DPDP Act.
      </p>
      <p>
        Where consent is in place, we use the data only to plan and deliver the requested
        sessions, communicate logistics, and meet any safeguarding or legal obligations.
        We do not use children&rsquo;s data for analytics profiling, tracking, behavioural
        advertising or any automated decision-making, and we apply the same retention and
        deletion policies described in section 5.
      </p>
      <p>
        A parent or guardian can withdraw consent, request access to, or ask us to delete
        their child&rsquo;s data at any time by writing to the contact in section 9 below.
        If you become aware that a minor has submitted personal data through this website
        without a guardian&rsquo;s consent, please tell us and we will delete it.
      </p>

      <h2 id="data-concerns">9. Data-concerns contact</h2>
      <p>
        {SITE.name} is operated as a sole proprietorship and is below the threshold for a
        formally appointed Grievance Officer under the DPDP Act. For any question or
        complaint about how your personal data is handled, please contact:
      </p>
      <ul>
        <li>
          <strong>Name:</strong> {SITE.founderName}, proprietor of {SITE.name}.
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          <strong>Address:</strong> {contact.city}, Karnataka, India.
        </li>
      </ul>
      <p>
        We will acknowledge data-related complaints within 7 working days and aim to
        resolve them within 30 days, as required by law. If you remain unsatisfied, you
        may approach the Data Protection Board of India once it is operational.
      </p>

      <h2>10. Security</h2>
      <p>
        We use commonly accepted administrative, technical and physical safeguards &mdash;
        including TLS encryption in transit, restricted access to data, and reputable
        third-party processors. No system is fully impenetrable; if you suspect any
        unauthorised access to your data, please contact us immediately.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy as the website evolves or as the law changes. Material
        updates will be reflected on this page with a fresh &ldquo;last updated&rdquo; date
        at the top.
      </p>

      <h2>12. Contact</h2>
      <p>
        Any other questions: write to{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> and we will respond within
        one working day.
      </p>
    </LegalProse>
  );
}
