import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { H1, H3 } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Mahaana",
  description:
    "How Mahaana Wealth Ltd. collects, uses, and protects your personal information when you use our website and services.",
  path: "privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <article>
        {/* Hero */}
        <section className="py-12 sm:py-16 lg:py-24">
          <Container className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
            <H1 className="max-w-3xl text-text-primary">Privacy Policy</H1>
          </Container>
        </section>

        {/* Content */}
        <section className="pt-10 pb-16">
          <Container className="max-w-3xl readable-line-length">
            <H3 className="mt-8 mb-3 text-text-primary">
              Your Personal Information
            </H3>
            <p className="mb-4 leading-relaxed text-text-tertiary">
              {cleanCopy(
                "This Privacy Statement relates solely to information supplied to you on this Web Site. Mahaana Wealth Ltd. respects the privacy of your personal information and will treat it confidentially and securely. Any personal information provided by you to Mahaana Wealth through this Website will be used for the purpose of providing and operating the products and services you have requested at this Website and for other related purposes which may include updating and enhancing our records, understanding your financial needs, and advising you of products and services which may be of interest to you, for purposes required by law or regulations, and to plan, conduct and monitor Mahaana Wealth's business. The information collected from you by Mahaana Wealth will be valuable in improving the design and marketing of our range of services and related products for customers."
              )}
            </p>
            <p className="mb-4 leading-relaxed text-text-tertiary">
              This Policy will not alter or affect any information otherwise
              provided by you to Mahaana Wealth Ltd. Other than to those
              individuals and entities listed below, your details will not be
              revealed by Mahaana Wealth Ltd. to any external body, unless
              Mahaana Wealth has your permission, or is under either a legal
              obligation or any other duty to do so. For the purposes detailed
              above, your information may be disclosed to:
            </p>
            <ul className="list-disc space-y-2 pl-6 pb-4 text-text-tertiary">
              <li>
                Any regulatory, supervisory, governmental or quasi-governmental
                authority with jurisdiction over Mahaana Wealth Ltd.
              </li>
              <li>
                Any contractor or third party service provider, professional
                adviser or any other person under a duty of confidentiality to
                Mahaana Wealth.
              </li>
            </ul>
            <p className="mb-4 leading-relaxed text-text-tertiary">
              Mahaana Wealth will ensure that parties to whom your details are
              transferred treat your information securely and confidentially. We
              may, if it is necessary to perform our contract with you, transfer
              your information to any of our contractor or third party service
              provider, and by providing details to Mahaana Wealth via this
              Website you are deemed to consent to all such transfers by us.
              Information held about you is retained as long as the purpose for
              which the information was collected continues. The information is
              then destroyed unless its retention is required to satisfy legal,
              regulatory or accounting requirements or to protect Mahaana
              Wealth&apos;s interests. It is your responsibility to maintain the
              secrecy of any user ID and login password you hold.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Cookies</H3>
            <p className="mb-4 leading-relaxed text-text-tertiary">
              In order to improve our Internet service to you, we will
              occasionally use COOKIES and other similar files or programs
              which may place certain information on your computer&apos;s hard
              drive when you visit Mahaana Wealth web site. A cookie is a small
              amount of data that our web server sends to your web browser when
              you visit certain parts of our site. We may use cookies to:
            </p>
            <ul className="list-disc space-y-2 pl-6 pb-4 text-text-tertiary">
              <li>
                allow us to recognize the PC you are using when you return to
                our website so that we can understand your interest in our
                website and tailor its content and advertisements to match your
                interests
              </li>
              <li>
                identify you after you have logged in by storing a temporary
                reference number in the cookie so that our web server can
                conduct a dialogue with you while simultaneously dealing with
                other customers
              </li>
              <li>
                allow you to carry information across pages of our site and avoid
                having to re-enter that information
              </li>
              <li>
                allow you access to stored information if you register for any of
                our on-line services
              </li>
              <li>
                enable us to produce statistical information (anonymous) which
                helps us to improve the structure and content of our web site
              </li>
              <li>
                enable us to evaluate the effectiveness of our advertising and
                promotions
              </li>
            </ul>
            <p className="mb-4 leading-relaxed text-text-tertiary">
              Cookies do not enable us to gather personal information about you
              unless you give the information to our server. Most Internet
              browser software allows the blocking of all cookies or enables you
              to receive a warning before a cookie is stored. For further
              information, please refer to your Internet browser software
              instructions or help screen.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Internet Communications
            </H3>
            <p className="mb-4 leading-relaxed text-text-tertiary">
              In order to maintain the security of our systems, protect our
              staff, record transactions, and, in certain circumstances, to
              prevent and detect crime or unauthorized activities, Mahaana Wealth
              Ltd reserves the right to monitor all internet communications
              including web and email traffic into and out of its domains.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Contacting You</H3>
            <p className="mb-4 leading-relaxed text-text-tertiary">
              In providing your telephone, postal and e-mail address or similar
              details, you agree that Mahaana Wealth may contact you by these
              methods to keep you informed about Mahaana Wealth&apos;s products
              and services or for any other reason. Mahaana Wealth reserves the
              right to amend its prevailing Data Protection and Privacy
              Statement at any time and will place any such amendments on this
              Web Site. This Privacy Statement is not intended to, nor does it,
              create any contractual rights whatsoever or any other legal rights,
              nor does it create any obligations on Mahaana Wealth in respect of
              any other party or on behalf of any party.
            </p>
          </Container>
        </section>
      </article>
    </div>
  );
}
