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
      {/* Heading */}
      <div className="w-full max-w-4xl flex flex-col gap-4 mb-10">
        <h1
          className={`${gtSuperDisplay.className} text-3xl sm:text-4xl lg:text-5xl text-[#12473A]`}
        >
          Pivacy <span className="text-[#CAA64A]">Policy</span>
        </h1>
        <p className="text-[#5A5A5A] text-sm sm:text-base">
          Last updated: 20/04/2026
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 w-full items-center">

        <Section title="1. Introduction">
          <p>
            Welcome to <strong>Memory Vault</strong>. We respect your privacy and
            are committed to protecting your personal data. This policy explains
            how we collect, use, and safeguard your information when you use our
            platform.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p className="font-medium mt-2">a. Personal Information</p>
          <ul className="list-disc ml-5">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (including WhatsApp)</li>
            <li>Billing and payment details</li>
          </ul>

          <p className="font-medium mt-4">b. Content Data (Memories)</p>
          <ul className="list-disc ml-5">
            <li>Photos, videos, text entries, voice notes</li>
            <li>Content shared via WhatsApp or manual uploads</li>
            <li>Metadata (timestamps, captions, tags)</li>
          </ul>

          <p className="font-medium mt-4">c. Usage Data</p>
          <ul className="list-disc ml-5">
            <li>Device information</li>
            <li>IP address</li>
            <li>Browser type</li>
            <li>User interactions</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc ml-5">
            <li>Provide and improve services</li>
            <li>Store and organize memories</li>
            <li>Generate books, reels, and outputs</li>
            <li>Process subscriptions and payments</li>
            <li>Enable gifting features</li>
            <li>Send updates and support messages</li>
            <li>Ensure security and prevent misuse</li>
          </ul>
        </Section>

        <Section title="4. WhatsApp Integration">
          <ul className="list-disc ml-5">
            <li>We process only content you voluntarily share</li>
            <li>No access to private chats beyond submissions</li>
            <li>Handled per WhatsApp policies</li>
          </ul>
        </Section>

        <Section title="5. Data Sharing">
          <p>We do not sell your personal data.</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Payment processors</li>
            <li>Cloud storage providers</li>
            <li>Analytics tools</li>
            <li>Legal authorities (if required)</li>
          </ul>
        </Section>

        <Section title="6. Data Storage & Security">
          <ul className="list-disc ml-5">
            <li>Industry-standard encryption</li>
            <li>Secure infrastructure</li>
            <li>No system is 100% secure</li>
          </ul>
        </Section>

        <Section title="7. Data Retention">
          <ul className="list-disc ml-5">
            <li>Stored while account is active</li>
            <li>Retained for legal/operational needs</li>
            <li>Deletion available upon request</li>
          </ul>
        </Section>

        <Section title="8. Your Rights">
          <ul className="list-disc ml-5">
            <li>Access your data</li>
            <li>Correct inaccuracies</li>
            <li>Request deletion</li>
            <li>Withdraw consent</li>
          </ul>
          <p className="mt-2">
            Contact: <span className="font-medium">support@memoryvault.in</span>
          </p>
        </Section>

        <Section title="9. Cookies">
          <ul className="list-disc ml-5">
            <li>Improve experience</li>
            <li>Track usage</li>
            <li>Enhance performance</li>
          </ul>
        </Section>

        <Section title="10. Children’s Privacy">
          <p>
            Memory Vault is not intended for users under 13. We do not knowingly
            collect data from children.
          </p>
        </Section>

        <Section title="11. Changes to Policy">
          <p>
            We may update this policy occasionally. Updates will be reflected on
            this page.
          </p>
        </Section>

        <Section title="12. Contact Us">
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