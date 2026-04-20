import localFont from "next/font/local"

const gtSuperDisplay = localFont({
  src: "../../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
  display: "swap",
})

const jost = localFont({
  src: "../../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

const Section = ({ title, children }: any) => (
  <div className="w-full max-w-4xl flex flex-col gap-3">
    <h2 className="text-xl sm:text-2xl text-[#12473A] font-semibold">
      {title}
    </h2>
    <div className="text-[#3A3A3A] text-sm sm:text-base leading-relaxed">
      {children}
    </div>
  </div>
)

export default function TermsConditionsPage() {
  return (
    <div
      className={`${jost.className} flex flex-col items-center bg-[#EDE9DF] px-4 py-10 sm:px-6 lg:px-16 xl:px-24`}
    >
      {/* Header */}
      <div className="w-full max-w-4xl flex flex-col gap-4 mb-10">
        <h1
          className={`${gtSuperDisplay.className} text-3xl sm:text-4xl lg:text-5xl text-[#12473A]`}
        >
          Terms <span className="text-[#CAA64A]">& Conditions</span>
        </h1>
        <p className="text-[#5A5A5A] text-sm sm:text-base">
          Last updated: 20/04/2026
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 w-full items-center">

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using <strong>Memory Vault</strong>, you agree to be
            bound by these Terms & Conditions.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <ul className="list-disc ml-5">
            <li>Digitally store and organize personal memories</li>
            <li>Upload content manually or via WhatsApp</li>
            <li>Generate digital outputs such as books and reels</li>
            <li>Purchase subscriptions</li>
            <li>Order physical memory books</li>
            <li>Gift subscriptions to others</li>
          </ul>
        </Section>

        <Section title="3. User Responsibilities">
          <ul className="list-disc ml-5">
            <li>Provide accurate and up-to-date information</li>
            <li>Use the platform in compliance with applicable laws</li>
            <li>
              Avoid uploading harmful, illegal, or copyrighted content without
              proper authorization
            </li>
          </ul>
        </Section>

        <Section title="4. Content Ownership">
          <ul className="list-disc ml-5">
            <li>You retain full ownership of your uploaded content</li>
            <li>
              You grant Memory Vault a limited license to store, process, and
              generate outputs (such as books and reels)
            </li>
          </ul>
        </Section>

        <Section title="5. Subscriptions">
          <ul className="list-disc ml-5">
            <li>Certain features require a paid subscription</li>
            <li>Pricing and features may change over time</li>
            <li>
              Subscriptions may auto-renew unless cancelled prior to renewal
            </li>
          </ul>
        </Section>

        <Section title="6. Orders & Physical Products">
          <ul className="list-disc ml-5">
            <li>
              Physical products are created based on user-submitted content
            </li>
            <li>
              We are not responsible for errors caused by incorrect inputs
            </li>
            <li>Delivery timelines may vary depending on location</li>
          </ul>
        </Section>

        <Section title="7. Gifting">
          <ul className="list-disc ml-5">
            <li>Users can purchase and gift subscriptions</li>
            <li>The recipient must activate the gift</li>
            <li>Gifts are non-refundable once redeemed</li>
          </ul>
        </Section>

        <Section title="8. Refund Policy">
          <ul className="list-disc ml-5">
            <li>Subscriptions are generally non-refundable</li>
            <li>Exceptions may be made at our discretion</li>
            <li>
              Physical product refunds apply only in cases of damage or
              manufacturing defects
            </li>
          </ul>
        </Section>

        <Section title="9. Prohibited Use">
          <p className="mb-2">You may not:</p>
          <ul className="list-disc ml-5">
            <li>Upload illegal or offensive content</li>
            <li>Violate intellectual property rights</li>
            <li>Attempt to hack or disrupt the platform</li>
          </ul>
        </Section>

        <Section title="10. Termination">
          <ul className="list-disc ml-5">
            <li>Violation of these terms</li>
            <li>Detected misuse or illegal activity</li>
          </ul>
        </Section>

        <Section title="11. Limitation of Liability">
          <ul className="list-disc ml-5">
            <li>Loss of data due to unforeseen circumstances</li>
            <li>Emotional or sentimental value loss</li>
            <li>Delays in service or product delivery</li>
          </ul>
        </Section>

        <Section title="12. Intellectual Property">
          <p>
            All platform design, branding, and features belong to{" "}
            <strong>Memory Vault</strong>. You may not copy or reuse them without
            permission.
          </p>
        </Section>

        <Section title="13. Changes to Terms">
          <p>
            We may update these Terms at any time. Continued use of the platform
            constitutes acceptance of the updated terms.
          </p>
        </Section>

        <Section title="14. Governing Law">
          <p>
            These Terms & Conditions are governed by the laws of India.
          </p>
        </Section>

        <Section title="15. Contact">
          <p>
            For any questions or concerns:
            <br />
            📧 <strong>support@memoryvault.in</strong>
          </p>
        </Section>
      </div>
    </div>
  )
}