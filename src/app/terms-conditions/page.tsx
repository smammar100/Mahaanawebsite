import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { H1, H3 } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms and Conditions | Mahaana",
  description:
    "Terms and conditions governing your use of the Mahaana investment platform and website. Please read carefully before using our services.",
  path: "terms-conditions",
});

export default function TermsConditionsPage() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <article>
        {/* Hero */}
        <section className="py-12 sm:py-16 lg:py-24">
          <Container className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
            <H1 className="max-w-3xl text-text-primary">
              Terms and Conditions
            </H1>
          </Container>
        </section>

        {/* Content */}
        <section className="pt-10 pb-16">
          <Container className="max-w-3xl readable-line-length">
            <p className="mb-4 leading-relaxed text-text-secondary">
              {cleanCopy("Dynasty Financial Advisors (DFA) owns and maintains website ")}
              <a
                href="https://www.mahaana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-text-primary"
              >
                www.mahaana.com
              </a>
              {cleanCopy(' ("the Site"). The site has been developed to provide a platform for various parties, including mutual funds, beneficial owners, corporates, clearing members, participants, investors, and regulator(s). By accessing, browsing, and using this site, you agree that the following Terms and Conditions (T&C) apply to your use of this Site. DFA reserves the right to amend these T&C at any time without prior intimation. You are responsible for regularly reviewing these T&C since such changed terms will govern your continued use of the Site. If you do not agree to these Terms and Conditions, do not use this site. The T&C – as may be amended from time to time – constitute the entire agreement and supersede any other agreements or understandings (oral or written), between you and us with respect to their subject matters unless explicitly stated otherwise. DFA accepts no liability for any losses, damages, costs, or expenses which may be incurred by you as a result of any changes to the terms and conditions.')}
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">No Warranties</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              We do not represent or warrant that this Site will be available or
              that it will meet your requirements, that access will be
              uninterrupted, that there will be no delays, failures, errors or
              omissions or loss of transmitted information, that no viruses or
              other contaminating or destructive properties will be transmitted
              or that no damage will occur to your computer system. You have
              sole responsibility for adequate protection and back up of data
              and/or equipment and for undertaking reasonable and appropriate
              precautions to scan for computer viruses or other destructive
              properties.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              We make no representations or warranties regarding the accuracy,
              functionality or performance of any third-party software that may
              be used in connection with this Site. DFA disclaims all
              representations, conditions, and warranties of any kind, either
              express or implied, including, but not limited to, the implied
              conditions or warranties of merchantability or satisfactory
              workmanlike effort, informational content, title, or
              non-infringement of the rights of third parties. DFA does not
              warrant or make any representations that the site will operate
              error-free or uninterrupted, that defects will be corrected, or
              that the site and/or its servers will be free of viruses and/or
              other harmful components. DFA does not warrant or make any
              representations regarding suitability, availability, accuracy,
              reliability, completeness, or timeliness of any material of any
              kind contained within the site for any purpose, including products,
              services, information, text, and related graphics content.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              DFA is not responsible for any failures caused by server errors,
              misdirected or redirected transmissions, failed internet
              connections, interruptions in the transmission or receipt of
              reservations or, any computer virus or other technical defect,
              whether human or technical in nature.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              DFA accepts no liability whatsoever for the provision of
              information forwarded to you by e-mail or other circumstances
              related to this facility, including without limitation: (i)
              misuse of the password, (ii) interception or alteration of the
              information, (iii) revocation of the password, (iv) any action or
              inaction taken by the concerned parties (including any action
              which was not intended by you) due to the timeliness, inaccuracy,
              completeness or correctness of the information provided by you,
              (v) any redemption (including incorrect redemption) effectuated by
              DFA and/or the Trustee and any payment errors or issues which are
              caused directly due to your negligence or due to a failure on your
              part to provide correct, complete and accurate information to us,
              (vi) any failure by you to receive any form of report due to
              technical problems involving the e-mail transmission or due to a
              failure of whatever nature by third parties, (vii) failure of the
              Trustee and/or the bankers to effectuate the given transaction
              within the stipulated time period for any reasons whatsoever,
              (viii) failure of the request to be processed due to incorrect
              authorization code being provided by you, or due to an incorrect
              and/or invalid email ID provided by you as a result of which the
              authorization code is not provided to you.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Internet E-Mail</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Messages sent over the internet cannot be guaranteed to be
              completely secure or error free as they are subject to possible
              interception, corruption, delays, loss, or possible alteration. We
              are not responsible for them and will not be liable to you or
              anyone else for any damages or otherwise in connection with any
              messages sent by you to us or any message sent by us to you over
              the internet. If you send E-Mail (encrypted or not) to us over the
              internet, you are accepting the associated risks of lack of
              confidentiality and the fact that such communication over the
              internet can be hacked, intercepted, monitored, delayed, lost or be
              incomplete.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Governing Law</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              This agreement constitutes the entire agreement between you and
              DFA with respect to using this Site and it supersedes all prior or
              contemporaneous communications and proposals, whether electronic,
              oral, or written with respect to this Site. Your use of this Site
              and any dispute arising out of such use of the website is subject
              to the laws of Pakistan, with the Courts of Karachi having the
              exclusive jurisdiction in this regard.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Generally, if you are dissatisfied with any portion of this Site,
              or with any of these Terms of use, your sole and exclusive remedy
              is to discontinue using this Site and the online investment request
              service.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              We reserve the right in our sole discretion to deny any user access
              to this Site, any interactive service herein, or any portion of
              this Site without notice, and the right to change the terms,
              conditions, and notices under which this Site is offered. Any
              rights not expressly granted herein are reserved.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Purchase & Redemption Prices
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Units of the Scheme(s) are being offered at NAV based prices. The
              AMC calculates and publishes Net Asset Values (NAV&apos;s); offer
              and redemption prices on all Business Days, in line with their
              constitutive documents. Each fund/plan has its cut-off timings for
              submission of transaction requests. Applicable cut-off timings are
              made available on the company website for each fund.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              In case of submission of an e-transaction, the DFA Online system
              date and time stamp will solely be considered and given precedence
              to determine the cut-off time in which the application request is
              submitted and the applicability of the NAV on the transaction. DFA
              will not be responsible for any network or system delays in
              submitting and receiving the application request.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              It is solely your responsibility to ensure that correct, complete,
              and accurate information is submitted in the Online
              Investment/Redemption Form. This includes the details of the
              scheme, types of units to be subscribed, amount/units to be
              subscribed/redeemed, details for payment processing and with all
              other details as are required. You shall be solely liable in case
              of any inaction and/or any action is taken by DFA, the Trustees
              and/or the banks based on incorrect or inaccurate details provided
              by you.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Zakat Deduction</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Zakat will be deducted at the time of redemption of units if a
              duly filled and signed Zakat Affidavit Form is not provided to the
              company for its records. It will be the investors&apos;
              responsibility to provide the Affidavit if he/she wishes that
              Zakat may not be deducted. It is also the investors&apos;
              responsibility to confirm if Zakat status is marked as &apos;Not
              Applicable&apos; in the company&apos;s records if the Affidavit
              has been submitted.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Tax Deductions</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Tax may be deducted as per prevailing and applicable Tax Laws and
              as per the constitutive documents of the funds/plans available on
              our website.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Permitted E-Transaction Requests
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Currently, the following e-transaction requests can be submitted
              through the DFA E-Transaction Request facility:
            </p>
            <ol className="list-inside list-decimal space-y-2 pl-6 pb-4 text-text-secondary">
              <li>Investment/purchase of units;</li>
              <li>Redemption/Encashment of Units (From Fund or Plan);</li>
              <li>Conversion of units (from one fund to another)</li>
            </ol>

            <H3 className="mt-8 mb-3 text-text-primary">
              Rejection of E-Transaction Requests
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Your e-transaction request may be rejected if there is any
              discrepancy or incomplete information in the request that is
              submitted. In case an e-transaction request is rejected, the
              rejected request will be cancelled, and a new request will have to
              be submitted.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Payment Instrument for Redemption Proceeds
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              In case of a redemption/withdrawal e-transaction request, if
              incorrect or incomplete Bank Account or Payment Details are
              mentioned in the request for Online Bank Account Transfer, a
              physical instrument will be made and sent to the investor. DFA or
              the Trustee/banks shall not be liable for any delays that this
              might cause in processing the payment to you.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Application Processing Time
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              E-transaction requests will be processed as per the time frame
              mentioned in the constitutive documents of the funds/plans
              available on our website.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Multiple Transactions
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              In case multiple transactions (through physical form submission
              and/or e-transaction request submission) involving a single or
              multiple funds/plans are received from an investor, the
              applications will be processed in chronological order i.e., the
              application received first will be processed first.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Submission of Physical Signed Form or Other Documents
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              DFA may on a case-to-case basis require an investor to submit a
              physical form (of the same transaction) in addition to his/her
              e-transaction request, which shall be duly provided by the
              investor without any delay.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Verifications of E-Transaction Requests
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              The Management Company from time to time on a case-to-case basis
              may require verification from the investor prior to processing the
              investors&apos; e-transaction request through email and/or phone
              call.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Book Closure Periods
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              All E-Transaction Request received during the book closure period
              (notified on website) pertaining to respective funds/plans shall be
              marked Rejected and customers would be required to re-submit
              his/her request after the Book Closure period is complete.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Security of DFA Online Credentials
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              You agree that any person who supplies DFA with your DFA Online
              username, password, and E-transaction request PIN Code (where
              applicable) will be allowed access to the Site and to your
              Account. It is the responsibility of the investor to keep his/her
              username, password, and E-transaction request PIN secure and take
              steps to prevent unauthorized use of them. You must not tell or
              disclose them to another person or allow them to be seen by another
              person (including family or friends). You must not keep a record of
              them in a way which can be determined by another person. You must
              not record them together.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              You must notify DFA immediately if a record of your login
              credentials and PIN is lost or stolen or you become aware or suspect
              another person knows your online credentials and has attempted to
              or made unauthorized use of the Site. DFA may cancel your Online
              credentials at any time without notice if it believes either is
              being misused.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Records and Statements
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              You should carefully check Account records and statements given on
              this Site. If you believe that there has been any discrepancy or
              inconsistency in any transaction on this Site, or an unauthorized
              transaction, you must notify DFA immediately. Failure to do so may
              render you liable for unauthorized transaction which you may not
              otherwise be liable for.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Our records, unless proven to be wrong, will be evidence of your
              dealings with DFA in connection with the Site.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Liability for Unauthorized E-Transactions
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              You will be liable for any loss of funds arising from any
              unauthorized e-transaction on your Account if the loss occurs
              before you notify DFA that your Online Credentials have been
              misused, lost or stolen or become known to someone else and if you
              contribute to the loss because of your failure to look after and
              keep your Online credentials secure or your extreme carelessness
              in failing to protect their security is the dominant cause of your
              loss; Or your unreasonable delay in notifying DFA of the misuse,
              loss or theft of your Online Credentials becoming known to someone
              else and the loss occurs between the time you did, or should
              reasonably have, become aware of these matters and the time you
              notify DFA.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              You will not be liable for losses which are incurred before you
              have received your Online credentials; if the e-transaction
              occurs after you notify DFA that your Online Credentials have been
              misused or become known to someone else.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              Copyrights & Intellectual Property Rights
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              The Site contains copyright material, trade names and other
              proprietary information, including, but not limited to, text,
              software, photos, graphics and may in future include video,
              graphics, music, and sound. The entire contents of the Site are
              protected by copyright law. DFA owns copyright and/or database
              right in the selection, coordination, arrangement, and enhancement
              of such content, as well as in the content original to it. No part
              of this Site may be copied, redistributed, retransmitted,
              reproduced, reworded, converted, or utilized in any form or by any
              electronic, mechanical, or other means which exist or may exist in
              the future. No commercial exploitation of downloaded material
              will be permitted under any circumstances whatsoever.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              You acknowledge that you do not acquire any ownership rights by
              downloading, accessing, reading or in any other manner using
              copyright material contained on the Site. DFA reserves the right at
              its sole discretion to immediately block all automatic querying,
              scanning and/or copying of the content available on the Site
              without prior notice.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Liability</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              You will be liable for and agree to indemnify DFA against any loss
              or damage DFA and any of the Funds being offered (including its
              Trustee) may suffer because you did not observe your obligations
              under these T&C or acted negligently or fraudulently when using
              this Site. DFA and any of the Fund (including its Trustee) under
              its Management will not be responsible for any loss that you may
              incur if you fail to comply with the T&C. The use of the Internet
              is subject to other risks which are not of a security nature
              described above but which arise from factors beyond DFA&apos;s
              control, for example failure of communication networks, mechanical
              failures, power failures, malfunction, breakdown, or inadequacy of
              equipment. These risks may result in your e-transaction requests
              being delayed, lost, or inaccurately transmitted and may cause you
              to suffer losses.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              To the extent permitted by law, in no event shall DFA or its
              officers, directors, employees, executives, sponsors,
              representatives, subsidiaries, affiliates, agents or others
              involved in creating, sponsoring, promoting, or otherwise making
              available the site and its contents (collectively the &quot;covered
              parties&quot;), be liable to any person or entity whatsoever for
              any direct, indirect, incidental, special, exemplary, compensatory,
              consequential, or punitive damages or any damages or losses
              whatsoever, including but not limited to (where relevant, caused
              by): (i) loss of production, loss of profit, loss of revenue, loss
              of contract, loss of or damage to goodwill or reputation, loss of
              claim, business interruption, data or other intangible losses;
              (ii) your inability to use, unauthorized use of, delay,
              performance or non-performance of the site; (iii) unauthorized
              access to or tampering with your personal information or
              transmissions; (iv) the provision or failure to provide any
              service, including services rendered or products offered by DFA or
              any of its subsidiaries, associates, affiliates or agents (v) errors
              or inaccuracies contained on the site or any information (including
              but not limited to the (descriptive) information, products,
              services, and related graphics obtained through the site; (vi) any
              transactions entered into through the Site; (vii) any property
              damage including damage to your computer or computer system
              caused by viruses or other harmful components, during or on
              account of access to or use of the site or any site to which it
              provides hyperlinks; or (viii) damages otherwise arising out of
              the use of the Site, any use, delay or inability to use the Site,
              or any information, products, or services obtained through the Site;
              or (ix) any damages caused by a force majeure event. The
              limitations of liability shall apply regardless of the form of
              action, whether based on contract, tort, negligence, strict
              liability or otherwise, even if a covered party has been advised of
              the possibility of damages.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Subject to the provisions contained above, DFA shall not be able to
              benefit from any limitation of liability or indemnity for any acts
              of fraud or intentional and willful misconduct committed by DFA.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Termination</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              You may stop your use of DFA in its entirety at any time by
              giving a written notice to DFA. DFA may terminate the Service at
              any time by giving you a written intimation.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Special Note</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Due to any technical/operational reason, fund transfer may be
              delayed. In such case, please contact our Sales Services Department
              for further facilitation. Funds are transferred as per TATs
              (Turn-Around-Time) defined by respective authorities (Banks, SECP,
              SBP, 1-Link). DFA does not have control over this funds transfer
              process, and therefore, it does not accept any liability under any
              circumstances whatsoever for any delays or later transfer made by
              any party for any reasons whatsoever.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">Undertaking</H3>
            <ol className="list-inside list-decimal space-y-2 pl-6 pb-4 text-text-secondary">
              <li>
                I/We am/are fully informed and understand that investment in
                units of Mutual Fund/CIS are not bank deposit, not guaranteed,
                and not issued by any person. Shareholders of AMCs are not
                responsible for any loss to investor resulting from the
                operations of any CIS launched/to be launched by AMC unless
                otherwise mentioned.
              </li>
              <li>
                I understand that the risk profiling questionnaire only help me
                in assessing my risk appetite based on the information provided
                by me in present circumstances, and I have the sole right &
                discretion to choose the CIS(s)/Plan(s) as I deem fit which may
                be different compared to my risk profile. I am aware that my
                financial needs may change over time depending on my
                circumstances.
              </li>
              <li>
                The provided source of income/fund, wealth and occupation details
                are genuine/authentic and true to the best of my knowledge.
              </li>
              <li>
                I/We understand and agree that DFA has suggested me a specific
                fund category as per my risk profile. However, I/We reserve the
                discretion to invest in any other fund category. I/We confirm
                that I am aware of associated risks of investment in this fund
                category and confirm that I/We will not hold DFA responsible
                for any loss which may occur because of my/our decision.
              </li>
            </ol>

            <H3 className="mt-8 mb-3 text-text-primary">Disclaimer</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              I/We understand that investment in CIS(s)/Plan(s)/VPS(s) are
              subject to market risks and fund prices may go up or down based on
              market conditions. I/We understand that past performance is not
              necessarily an indicator of future results, and there is no fixed
              or guaranteed return. I/We hereby also acknowledge that I/We have
              reviewed and understood detail of Sales Load, the Total Expense
              Ratio, Back-end, and Contingent Load percentages including taxes
              of the Scheme as disclosed at offering Document(s) & AMC website.
              Under the Cooling-off Right, Investor can claim first time
              investment in a CIS(s)/Plan(s)/VPS(s), through a written request
              at the applicable NAV on the date of the application within three
              business days of the said investment.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">
              FATCA Declaration
            </H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              I/We hereby acknowledge and declare that the FATCA information
              provided is correct and true and complete to the best of my/our
              knowledge and belief. I/We agree to provide supporting evidence
              and provide updates within 30 days in case any of the
              aforementioned information changes.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              I/We expressly and unconditionally authorize DFA to disclose
              relevant account and/or personal information to third parties
              including US tax authorities as well as take necessary action
              including stopping redemption from any/all of my/our account(s)
              and/or withholding of tax for the purpose of AMC compliance with
              its obligations under the US foreign Account Tax Compliance Act
              (&quot;FATCA&quot;).
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              I/we undertake to fully cooperate with DFA & AMC in meeting its
              obligation under FATCA in connection with my/our account(s). I/We
              irrevocably confirm and undertake that I/we shall indemnify, defend
              and hold harmless DFA & AMC, its Directors, Officers and Employees
              from any loss, action (including, but not limited to, sums paid in
              settlement of claims, reasonable attorney and consultant fees, and
              expert fees), claim, damages or liability which may be suffered or
              incurred by DFA in discharging its obligations under FATCA and/or
              as a result of disclosures to the US tax authorities. I/We
              acknowledge and accept that DFA reserves the right to close or
              suspend, without prior notice, any/all of my/our account(s), if
              required documentation/information is not submitted within a
              stipulated time.
            </p>

            <H3 className="mt-8 mb-3 text-text-primary">CRS Declaration</H3>
            <p className="mb-4 leading-relaxed text-text-secondary">
              I understand that the information supplied by me is covered by the
              full provision of the terms and conditions governing the Account
              Holder&apos;s relationship with DFA and its funds under management
              setting out how AMC and its Funds under management may use and
              share the information supplied by me.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              I acknowledge that the information contained in this form and
              information regarding the Account Holder and any Reportable
              Account(s) may be provided to the tax authorities of the country in
              which this account(s) is/are maintained and exchanged with tax
              authorities of another country or countries in which the Account
              Holder may be tax resident pursuant to intergovernmental agreements
              to exchange financial account information.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              I certify that I am an account holder (or an authorized person to
              sign for the Account Holder) of all the account(s) to which this
              form relates. I declare that I have neither asked for, nor
              received from DFA or AMC and its Fund under management in
              determining my classification as a reportable person or otherwise.
            </p>
          </Container>
        </section>
      </article>
    </div>
  );
}
