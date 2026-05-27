import type { Metadata } from "next";
import { LastUpdated, LegalProse } from "@/components/legal-prose";
import { SITE } from "@/lib/content";
import { getEffectiveContact } from "@/sanity/lib/site-data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of using ${SITE.name}'s website, contact form, and in-person dance and yoga sessions.`,
};

export default async function TermsPage() {
  const contact = await getEffectiveContact();
  return (
    <LegalProse>
      <h1>Terms &amp; Conditions</h1>
      <LastUpdated date="27 May 2026" />

      <p>
        {SITE.name} is run as a sole proprietorship by {SITE.founderName} from
        Bangalore, Karnataka, India. These terms govern your use of this website
        and any session, class, workshop, wedding or corporate program arranged
        with us after an initial enquiry. By using the website or engaging us, you
        agree to these terms.
      </p>

      <h2>1. About this website</h2>
      <p>
        This website is informational and exists to introduce our work and let
        you start a conversation with us. It does <strong>not</strong> sell or
        book any service directly. Anything you read here about format, scope or
        availability is indicative; the specifics of any engagement are confirmed
        separately between you and us in writing (email or WhatsApp).
      </p>

      <h2>2. Enquiries through the contact form</h2>
      <ul>
        <li>
          The contact form on this site collects your name, email, phone and a
          short message so we can respond to you. It does not create an account,
          a booking, or a paid commitment of any kind.
        </li>
        <li>
          We aim to respond within one working day. Sending an enquiry does not
          guarantee availability for a date, slot or package.
        </li>
        <li>
          Pricing, scheduling and scope of any engagement are agreed in writing
          before we begin. The terms of that written agreement, if any, override
          anything implied by this website.
        </li>
      </ul>

      <h2>3. Health, safety and your responsibility</h2>
      <p>
        Dance, yoga, breathwork, sound healing and choreography are physical and
        sometimes intense practices. By participating in any session arranged
        through {SITE.name}, you confirm that:
      </p>
      <ul>
        <li>
          You are medically fit to take part, or have consulted a qualified
          medical professional before doing so.
        </li>
        <li>
          You will inform the instructor, in writing and in advance, of any
          injury, surgery, pregnancy, medication or condition that may affect
          your practice or our duty of care toward you.
        </li>
        <li>
          You accept that movement practice carries inherent physical risk. To
          the extent permitted by law, {SITE.name} is not liable for injury or
          aggravation of a pre-existing condition that occurs despite reasonable
          care and supervision on our part.
        </li>
        <li>
          We may refuse, modify or stop your participation if we judge a
          particular practice unsuitable or unsafe for you. Any such decision is
          taken in good faith.
        </li>
      </ul>

      <h2>4. Conduct</h2>
      <p>
        We host inclusive, respectful spaces. Harassment, discrimination,
        intoxication, or behaviour that disrupts practice or endangers others
        may result in removal from the session and termination of any ongoing
        engagement. Any payment-related consequence in such a case is governed
        by the separate written agreement between us, not by this website.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        All content on this website &mdash; including text, choreography
        descriptions, photography, video, music compilations, course materials,
        branding and the logo &mdash; is owned by {SITE.name} or licensed to it.
        You may not reproduce, distribute, teach, or commercially use this
        content without prior written permission.
      </p>

      <h2>6. Photography and recordings</h2>
      <p>
        We sometimes photograph or record sessions for portfolio, marketing or
        training. Participants are informed in advance and can opt out in
        writing before the session. We will not publish recognisable images of
        opt-out participants.
      </p>

      <h2>7. Third-party services and links</h2>
      <p>
        This website may link to third-party services (for example, a WhatsApp
        community, Google Maps, a video host or a social platform). We are not
        responsible for the content, conduct or privacy practices of any third
        party.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by Indian law, {SITE.name}&rsquo;s
        liability arising from your use of this website or any session arranged
        through us is limited to the fee paid for the specific service that
        gave rise to the claim. We are not liable for indirect, incidental,
        consequential, punitive or aspirational damages, lost time, lost
        opportunity, or emotional distress beyond what is provided by law.
      </p>

      <h2>9. Force majeure</h2>
      <p>
        We are not liable for delays or failures caused by events outside our
        reasonable control &mdash; including natural disasters, pandemics,
        government action, internet outages, venue closures, or supplier
        failure. In such cases, we will use good-faith efforts to reschedule or
        otherwise accommodate.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may update these terms as the website or our work evolves. Material
        updates will be reflected on this page with a fresh &ldquo;last
        updated&rdquo; date at the top.
      </p>

      <h2>11. Governing law &amp; jurisdiction</h2>
      <p>
        These terms are governed by the laws of India. Any disputes will be
        subject to the exclusive jurisdiction of the courts at{" "}
        {contact.city}, Karnataka.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions or notices under these terms can be sent to{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalProse>
  );
}
