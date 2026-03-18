import Navbar from "@/app/components/Navbar";
import StickyCTA from "@/app/components/StickyCTA";

export default function PrivacyPolicy() {
    // Add your accordion content here. Each object will render as an accordion.
    const additionalAccordions = [
        {
            title: "INFORMATION WE MAY COLLECT FROM YOU",
            content: (
                <div className="space-y-4">
                    <p>We May Collect And Process The Following Data About You:</p>
                    <p>
                        i) Information you give us. You may give us information about you by filling in forms on our sites, or by submitting your CV, or by corresponding with us by phone, e-mail or otherwise or, by you interacting with any of our business partners, suppliers or sub-contractors (including estate agents, sales agents and our professional advisors) engaged on our behalf. This includes information you provide when you register to use our sites, subscribe to our service, email us, arrange property viewings with us, request brochures from us, complete an enquiry form, provide your CV and when you report a problem with our sites. The information you give us may include your name, address, e-mail address, phone number, profile picture and any other information relevant to your enquiry or request for information or services which we may request and you may choose to provide to us from time to time. In addition to the aforesaid, you may choose to import your address book contacts or enter your contacts' information manually to access certain features of the Sites.
                    </p>
                    <p>
                        ii) Information we collect about you. We may automatically collect: technical information, including the IP address, your login information, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform; and information about your visit, including the full URL clickstream to, through and from our sites; materials you viewed or searched for; page response times, download errors, length of visits to certain pages, page interaction information, and methods used to browse away from the page and any phone number used to call our customer service number.
                    </p>
                    <p>
                        iii) Information we receive from other sources. We may receive information about you if you use our sites or the other services we provide. In this case we will have informed you when we collected that data that it may be shared internally and combined with data collected on our sites. We also work closely with third parties (including, for example, business partners, sub-contractors in technical, payment and delivery services, advertising networks, analytics providers, search information providers, credit reference agencies) and may receive information about you from them.
                    </p>
                </div>
            ),
        },
        {
            title: "USE MADE OF THE INFORMATION",
            content: (
                <div className="space-y-4">
                    <p>We Use Information Held About You In The Following Ways:</p>
                    <p>
                        i) Information you give to us. We will use this information: to carry out our obligations arising from any contracts entered into between you and us and to provide you with the information and services that you request from us relating to the projects, properties, ventures or opportunities detailed on our sites or otherwise notified to you; to provide you with information about other goods and services we offer that are similar to those that you have already purchased or enquired about; to provide you, or permit selected third parties to provide you, with information about opportunities, goods or services we feel may interest you. If you are an existing customer, we will only contact you by e-mail, Whatsapp, SMS, telephone or your preferred method of contact if different, with information about opportunities, goods and services similar to those which were the subject of a previous sale or negotiations of a sale to you. If you are a new customer, and where we permit third parties to use your data, we (or they) will contact you by e-mail, Whatsapp, SMS, telephone or your preferred method of contact if different only if you have consented to this.
                    </p>
                    <p>
                        ii) Information we collect about you. We will use this information: to administer our sites and for internal operations, including troubleshooting, data analysis, testing, research, statistical and survey purposes; to improve our sites to ensure that content is presented in the most effective manner for you and for your computer; to allow you, when required, to participate in interactive features of our service; as part of our efforts to keep our sites safe and secure; to measure or understand the effectiveness of advertising we serve to you and others, and to deliver relevant advertising to you; to make suggestions and recommendations to you and other users of our sites about goods or services that may interest you or them.
                    </p>
                    <p>
                        iii) Information we receive from other sources. We may combine this information with information you give to us and information we collect about you. This includes but is not limited to information we receive from our sales agents. We may use this information and the combined information for the purposes set out above (depending on the types of information we receive).
                    </p>
                </div>
            ),
        },
        {
            title: "DISCLOSURE OF YOUR INFORMATION",
            content: (
                <div className="space-y-4">
                    <p>A) We may share your personal information with any member of our group, which means our subsidiaries, our ultimate holding company and its subsidiaries.</p>
                    <p>B) We may share your information with selected third parties including, where applicable: i. Business partners, suppliers and sub-contractors (including, but not limited to, estate agents, sales agents and our professional advisors) for the performance of any contract or any potential contract we may enter into with them or you, or in relation to any ancillary requirements; ii. Advertisers and advertising networks that require the data to select and serve relevant adverts to you and others; and iii. Analytics and search engine providers that assist us in the improvement and optimisation of our sites.</p>
                    <p>C) We may disclose your personal information to third parties: i. If we sell or buy any business or assets, we may disclose your personal data to the prospective seller or buyer of such business or assets; ii. If Developer or substantially all of its assets are acquired by a third party, your personal data will be one of the transferred assets; and iii. If we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or in order to enforce or apply our terms of use and other agreements; or to protect the rights, property, or safety of Developer, our customers, or others. This includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction.</p>
                    <p>D) We may share your non sales related information such as Cookies, Email IDs, Phone number etc to external parties. But, we do not share your sales related information such as PAN Card No, Credit / Debit Card details, Preference details with the external parties.</p>
                </div>
            ),
        },
        {
            title: "WHERE WE STORE YOUR PERSONAL DATA",
            content: (
                <div className="space-y-4">
                    <p>A) The data that we collect from you may be transferred, stored and processed by staff who work for us or for one of our suppliers or one of our group companies. Such staff maybe engaged in, among other things, the fulfilment of your order or enquiry and the provision of support services. By submitting your personal data, you agree to this transfer, storing or processing. We will take all steps reasonably necessary to ensure that your data is treated securely.</p>
                    <p>B) We have put in place appropriate technical and organisational measures to guard against unauthorised or unlawful processing of personal data and accidental loss or destruction of, or damage to, personal data. Unfortunately, the transmission of information via the internet is not completely secure and we cannot guarantee the security of your data transmitted to our sites and any transmission is at your own risk.</p>
                </div>
            ),
        },
        {
            title: "COOKIES",
            content: (
                <div className="space-y-4">
                    <p>Our sites may use cookies to distinguish you from other users of our sites. This helps us to provide you with a good experience when you browse our sites and also allows us to improve our sites. By continuing to browse our sites, you are agreeing to our use of cookies. A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer&apos;s hard drive.</p>
                    <p>We use cookies that are required for the operation of our sites (they include, for example, cookies that enable you to log into the secure area of our sites); to allow us to recognise and count the number of visitors and to see how visitors move around our sites when they are using it; to recognise you when you return to our sites in order to enable us to personalise our content for you; to record your visit to our sites, the pages you have visited and the links you have followed in order to make our sites more relevant to your interests. Further information about the individual cookies we use on our sites and the purposes for which we use them can be found here. Please note that third parties may also use cookies, over which we have no control.</p>
                    <p>You block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.</p>
                </div>
            ),
        },
        {
            title: "YOUR RIGHTS",
            content: (
                <div className="space-y-4">
                    <p>A) You have the right to ask us not to process your personal data for marketing purposes.</p>
                    <p>B) Our sites may contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites.</p>
                </div>
            ),
        },
        {
            title: "CONTACT",
            content: (
                <div className="space-y-4">
                    <p>Questions, comments and requests regarding this privacy policy Contact Us.</p>
                </div>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <div className="pt-[140px] pb-20 px-4 bg-[#f7f6ef] min-h-screen">
                <div className="max-w-[1000px] mx-auto bg-white rounded-[16px] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <h1 className="text-[2.6rem] leading-[1.2] mb-6 text-center text-[#a78a41] font-gobold-light uppercase tracking-wide">
                        Legal Information
                    </h1>

                    <div className="flex flex-col gap-10">
                        {/* Disclaimer Section */}
                        <div>
                            <h2 className="text-[1.8rem] font-semibold text-[#a78a41] mb-4">Disclaimer</h2>
                            <div className="text-[#8a8a9a] leading-relaxed text-[0.95rem]">
                                <p>
                                    <strong>Prestige Kollur:</strong> This website is meant only for information purposes. It should not be considered/ claimed as an official site. This website belongs to authorised channel partner of Prestige Group.
                                </p>
                            </div>
                        </div>

                        {/* Privacy Policy Section */}
                        <div>
                            <h2 className="text-[1.8rem] font-semibold text-[#a78a41] mb-4">Privacy Policy</h2>
                            <div className="text-[#8a8a9a] leading-relaxed text-[0.95rem] space-y-4">
                                <p>
                                    Developer Of companies (that is, our subsidiaries, our ultimate holding company and its subsidiaries) ("we", "our", "us") are committed to protecting and respecting your privacy. This privacy policy (together with our terms of use and any other documents referred to on it) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it. By visiting website, or any other of Our websites / mobile applications to which this privacy policy applies ("Sites") or otherwise providing us with information you are accepting and consenting to the practices described in this policy.
                                </p>
                            </div>
                        </div>

                        {/* Additional Accordions Section */}
                        {additionalAccordions.length > 0 && (
                            <div className="mt-8 flex flex-col gap-4 border-t border-[rgba(201,169,110,0.2)] pt-10">
                                <h2 className="text-[1.8rem] font-semibold text-[#a78a41] mb-2">More Information</h2>
                                {additionalAccordions.map((item, index) => (
                                    <details key={index} className="group border border-[rgba(201,169,110,0.2)] rounded-[8px] overflow-hidden bg-white">
                                        <summary className="cursor-pointer p-5 font-semibold text-[1.2rem] flex justify-between items-center text-[#a78a41] bg-[#fdfbf7] hover:bg-[#f8f5eb] transition-colors list-none [&::-webkit-details-marker]:hidden">
                                            {item.title}
                                            <span className="transition-transform duration-300 group-open:rotate-180 text-[#a88a4e]">▼</span>
                                        </summary>
                                        <div className="p-5 text-[#8a8a9a] leading-relaxed border-t border-[rgba(201,169,110,0.1)] text-[0.95rem]">
                                            <div className="space-y-4">
                                                {item.content}
                                            </div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Simple Footer for Subpages */}
            <footer className="bg-gradient-to-bl from-[#a78a41] from-[50%] to-black to-[10%] text-white/80 py-8 px-8 text-center mt-auto">
                <a href="/" target="_blank" className="text-[0.9rem] mb-4 underline underline-offset-4">Back to Prestige Kollur</a>
            </footer>
        </>
    );
}
