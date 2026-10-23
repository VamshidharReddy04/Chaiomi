// Privacy Policy content. Edit the text here, not in the page component.
// Block types: p (paragraph), h3 (sub-heading), ul (bullet list), ol (numbered
// list), table ({ head, rows }). Use **double asterisks** for bold text.

export const privacyPolicy = {
  title: "Privacy Policy",
  effectiveDate: "January 1, 2026",
  lastUpdated: "December 26, 2025",
  version: "1.0.0.1",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      blocks: [
        {
          t: "p",
          x: 'Welcome to Chaiomi. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how Chaiomi Tech Private Limited ("we," "us," or "our") collects, uses, stores, and protects your information when you use our mobile application, website, and robotic beverage services.',
        },
        {
          t: "p",
          x: "By using Chaiomi, you agree to the collection and use of information in accordance with this policy.",
        },
        { t: "p", x: "**Compliance:** This policy complies with:" },
        {
          t: "ul",
          x: [
            "India's Digital Personal Data Protection Act (DPDP Act, 2023)",
            "EU General Data Protection Regulation (GDPR)",
            "Apple App Store Guidelines",
            "Google Play Store Data Safety Requirements",
          ],
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      blocks: [
        { t: "h3", x: "2.1 Personal Information" },
        { t: "p", x: "Information you provide directly:" },
        {
          t: "ul",
          x: [
            "**Account Information:** Name, email address, phone number, date of birth",
            "**Beverage Preferences:** Chai strength, sweetness level, milk type, spice preferences, temperature, dietary restrictions",
            "**Order History:** Past orders, favorite drinks, purchase patterns",
            "**Profile Data:** Profile photo (optional), communication preferences",
          ],
        },
        { t: "h3", x: "2.2 Payment Information" },
        {
          t: "ul",
          x: [
            "**Payment Methods:** UPI ID, tokenized credit/debit card information",
            "**Transaction Data:** Order amount, date, time, payment status",
            "**Billing Information:** Invoice details, transaction history",
          ],
        },
        {
          t: "p",
          x: "**Note:** We do NOT store complete credit card numbers. All payment processing is handled by certified PCI-DSS compliant payment processors.",
        },
        { t: "h3", x: "2.3 Technical & Device Information" },
        {
          t: "ul",
          x: [
            "**Device Data:** Device type, operating system, app version, device ID",
            "**Location Data:** GPS location (with your permission) to find nearest kiosks",
            "**Usage Data:** App interactions, session duration, features used, clicks",
            "**Network Information:** IP address, mobile network information",
          ],
        },
        { t: "h3", x: "2.4 Optional Information" },
        {
          t: "ul",
          x: [
            "**Feedback & Surveys:** Your responses to surveys and feedback forms",
            "**Customer Support:** Messages, inquiries, and support tickets",
            "**Social Features:** Chai Club memberships, shared stories (if you opt-in)",
          ],
        },
        { t: "h3", x: "2.5 Information We DO NOT Collect" },
        { t: "p", x: "We do not collect:" },
        {
          t: "ul",
          x: [
            "Biometric data",
            "Religious or caste information",
            "Sexual orientation",
            "Political opinions",
            "Health information (beyond dietary preferences you voluntarily provide)",
            "Contact lists or SMS messages",
            "Photos or media from your device (except profile pictures you choose to upload)",
          ],
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      title: "3. How We Use Your Information",
      blocks: [
        { t: "p", x: "We use your data for the following purposes:" },
        { t: "h3", x: "3.1 Service Delivery" },
        {
          t: "ul",
          x: [
            "Create and manage your Chaiomi account",
            "Process and fulfill beverage orders",
            "Personalize drinks based on your saved preferences",
            "Locate nearest kiosks using location data",
            "Facilitate contactless ordering at our robotic units",
          ],
        },
        { t: "h3", x: "3.2 Personalization & AI Features" },
        {
          t: "ul",
          x: [
            "Use AI to recommend beverages based on mood, weather, time of day",
            "Learn your taste preferences over time",
            "Suggest new flavors and seasonal specials",
            "Customize the app experience",
          ],
        },
        { t: "h3", x: "3.3 Payment Processing" },
        {
          t: "ul",
          x: [
            "Process payments securely",
            "Generate invoices and receipts",
            "Manage refunds and disputes",
            "Prevent fraudulent transactions",
          ],
        },
        { t: "h3", x: "3.4 Communication" },
        {
          t: "ul",
          x: [
            "Send order confirmations and updates",
            "Provide customer support",
            "Share loyalty rewards and offers (Sips & Scripts™)",
            "Send promotional content (only with your consent)",
            "Notify you of app updates and new features",
          ],
        },
        { t: "h3", x: "3.5 Analytics & Improvement" },
        {
          t: "ul",
          x: [
            "Analyze usage patterns to improve our services",
            "Test new features and perform A/B testing",
            "Monitor app performance and fix bugs",
            "Conduct market research",
          ],
        },
        { t: "h3", x: "3.6 Legal & Security" },
        {
          t: "ul",
          x: [
            "Comply with legal obligations",
            "Prevent fraud and unauthorized access",
            "Enforce our Terms of Service",
            "Protect our rights and property",
            "Respond to legal requests from authorities",
          ],
        },
        { t: "p", x: "**Legal Basis (GDPR):**" },
        {
          t: "ul",
          x: [
            "Consent (for marketing, location, personalization)",
            "Contract performance (to provide services you requested)",
            "Legitimate interests (fraud prevention, service improvement)",
            "Legal obligation (compliance with laws)",
          ],
        },
      ],
    },
    {
      id: "consent-and-permissions",
      title: "4. Consent & Permissions",
      blocks: [
        { t: "h3", x: "4.1 Permissions We Request" },
        {
          t: "table",
          head: ["Permission", "Purpose", "Required/Optional"],
          rows: [
            [
              "Location",
              "Find nearest kiosks, location-based offers",
              "Optional",
            ],
            [
              "Notifications",
              "Order updates, offers, loyalty rewards",
              "Optional",
            ],
            ["Camera", "Upload profile picture, scan QR codes", "Optional"],
            [
              "Storage",
              "Save receipts, cache preferences locally",
              "Required for functionality",
            ],
            ["Phone State", "Optimize app performance", "Optional"],
          ],
        },
        { t: "h3", x: "4.2 How to Provide/Withdraw Consent" },
        {
          t: "ul",
          x: [
            "**During onboarding:** You grant consent when creating your account",
            "**App permissions:** Managed through your device settings",
            "**Marketing communications:** Opt-in/opt-out in App → Settings → Notifications",
            "**Location access:** Enable/disable in App → Settings → Privacy → Location",
            "**Complete withdrawal:** App → Profile → Settings → Delete Account or email privacy@chaiomi.com",
          ],
        },
        { t: "h3", x: "4.3 Account Deletion" },
        {
          t: "p",
          x: "Users can delete their account and associated personal data at any time using one of the following methods:",
        },
        {
          t: "p",
          x: "**Option 1: In-App Deletion.** Open the app and follow this path: App → Profile → Settings → Delete Account",
        },
        {
          t: "p",
          x: "Once confirmed, the account and associated personal data will be permanently deleted.",
        },
        {
          t: "p",
          x: "**Option 2: Email Request.** If you are unable to access the app, you may request account deletion by emailing: privacy@chaiomi.com",
        },
        {
          t: "p",
          x: "Please use the subject line “Delete My Account” and include the registered email address associated with your account.",
        },
      ],
    },
    {
      id: "data-sharing",
      title: "5. Data Sharing & Third Parties",
      blocks: [
        {
          t: "p",
          x: "**We DO NOT sell, rent, or trade your personal data.**",
        },
        {
          t: "p",
          x: "We share limited data with trusted third parties only for specific purposes:",
        },
        { t: "h3", x: "5.1 Service Providers" },
        {
          t: "ul",
          x: [
            "**Payment Processors:** Razorpay, Stripe, PayU (for secure transactions)",
            "**Cloud Hosting:** AWS, Google Cloud (for data storage)",
            "**Analytics Providers:** Firebase Analytics, Mixpanel (privacy-compliant)",
            "**Communication Services:** Twilio (SMS), SendGrid (email)",
            "**Robotics Maintenance:** Technical partners for kiosk servicing (limited operational data only)",
          ],
        },
        { t: "h3", x: "5.2 Legal Requirements" },
        { t: "p", x: "We may disclose your information if required by law:" },
        {
          t: "ul",
          x: [
            "Court orders or subpoenas",
            "Government investigations",
            "Protection of our legal rights",
            "Prevention of fraud or illegal activity",
            "Emergency situations involving safety",
          ],
        },
        { t: "h3", x: "5.3 Business Transfers" },
        {
          t: "p",
          x: "In case of merger, acquisition, or sale of assets, your data may be transferred. You will be notified of any such change.",
        },
        { t: "p", x: "**All third-party partners:**" },
        {
          t: "ul",
          x: [
            "Sign strict data processing agreements",
            "Use data only for specified purposes",
            "Maintain security standards equivalent to ours",
            "Are prohibited from using your data for their own marketing",
          ],
        },
      ],
    },
    {
      id: "data-storage-security-retention",
      title: "6. Data Storage, Security & Retention",
      blocks: [
        { t: "h3", x: "6.1 Where We Store Data" },
        {
          t: "ul",
          x: [
            "**Primary Servers:** India (Mumbai region)",
            "**Backup Servers:** Secure cloud infrastructure with encryption",
            "**International Transfers:** When data is transferred outside India/EU, we use Standard Contractual Clauses and encryption",
          ],
        },
        { t: "h3", x: "6.2 Security Measures" },
        {
          t: "ul",
          x: [
            "**Encryption:** AES-256 for data at rest, TLS 1.3 for data in transit",
            "**Payment Security:** PCI-DSS compliant tokenization",
            "**Access Controls:** Role-based access, multi-factor authentication for internal systems",
            "**Monitoring:** Real-time threat detection and audit logging",
            "**Regular Audits:** Third-party security assessments",
          ],
        },
        { t: "h3", x: "6.3 Data Breach Protocol" },
        { t: "p", x: "In the unlikely event of a data breach:" },
        {
          t: "ul",
          x: [
            "We will notify affected users within 72 hours",
            "Authorities will be informed as per legal requirements",
            "We will provide guidance on protective measures",
            "Investigation and remediation will be conducted immediately",
          ],
        },
      ],
    },
    {
      id: "your-privacy-rights",
      title: "7. Your Privacy Rights",
      blocks: [
        {
          t: "p",
          x: "Depending on your location, you have the following rights:",
        },
        { t: "h3", x: "7.1 Rights Available to All Users" },
        {
          t: "ul",
          x: [
            "**Access:** Request a copy of your personal data",
            "**Correction:** Update inaccurate or incomplete information",
            '**Deletion:** Request deletion of your account and data ("Right to be Forgotten")',
            "**Opt-Out:** Unsubscribe from marketing communications",
            "**Withdraw Consent:** Revoke previously granted permissions",
          ],
        },
        { t: "h3", x: "7.2 Additional Rights (GDPR/DPDP)" },
        {
          t: "ul",
          x: [
            "**Data Portability:** Receive your data in a machine-readable format",
            "**Restriction:** Limit how we process your data",
            "**Object:** Object to processing based on legitimate interests",
            "**Automated Decisions:** Request human review of AI-driven decisions",
          ],
        },
        { t: "h3", x: "7.3 How to Exercise Your Rights" },
        {
          t: "ul",
          x: [
            "**Email:** privacy@chaiomi.com",
            "**In-App:** Settings → Privacy → Data Rights",
            '**Subject Line:** Include "Privacy Rights Request - [Your Name]"',
          ],
        },
        { t: "p", x: "**Response Time:**" },
        {
          t: "ul",
          x: [
            "Acknowledgment: Within 3 business days",
            "Fulfillment: Within 15-30 business days",
            "Complex requests may take up to 45 days (we will inform you)",
          ],
        },
        {
          t: "p",
          x: "**Verification:** We may ask for identification to protect your privacy.",
        },
        {
          t: "p",
          x: "**No Fee:** Exercising your rights is free unless requests are excessive or unfounded.",
        },
      ],
    },
    {
      id: "childrens-privacy",
      title: "8. Children's Privacy",
      blocks: [
        {
          t: "p",
          x: "Chaiomi is not intended for children under 13 years of age (or applicable local age of digital consent).",
        },
        {
          t: "ul",
          x: [
            "We do not knowingly collect data from children",
            "If we discover we have collected data from a child, we will delete it immediately",
            "Parents/guardians can contact us at privacy@chaiomi.com if they believe their child's data was collected",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "9. Cookies & Tracking Technologies",
      blocks: [
        { t: "h3", x: "9.1 Types of Cookies We Use" },
        {
          t: "table",
          head: ["Type", "Purpose", "Duration", "Your Control"],
          rows: [
            [
              "Essential",
              "App functionality, authentication",
              "Session",
              "Cannot be disabled",
            ],
            [
              "Preferences",
              "Remember settings, language",
              "Persistent",
              "App Settings",
            ],
            [
              "Analytics",
              "Understand usage patterns",
              "24 months",
              "Opt-out available",
            ],
            [
              "Marketing",
              "Personalized offers (with consent)",
              "12 months",
              "Opt-out in Settings",
            ],
          ],
        },
        { t: "h3", x: "9.2 Third-Party Tracking" },
        {
          t: "ul",
          x: [
            "We use Firebase Analytics (Google) and Mixpanel",
            "These tools help us improve user experience",
            "No advertising cookies are used without explicit consent",
            "You can opt-out: Settings → Privacy → Analytics",
          ],
        },
        { t: "h3", x: "9.3 Do Not Track" },
        {
          t: "p",
          x: "We honor Do Not Track (DNT) signals where technically feasible.",
        },
      ],
    },
    {
      id: "marketing-and-communications",
      title: "10. Marketing & Communications",
      blocks: [
        { t: "h3", x: "10.1 Types of Communication" },
        {
          t: "ul",
          x: [
            "**Transactional:** Order confirmations, receipts (cannot opt-out)",
            "**Service Updates:** App updates, policy changes (cannot opt-out)",
            "**Marketing:** Offers, new menu items, Sips & Scripts™ content (opt-in required)",
            "**Push Notifications:** Real-time order updates, personalized suggestions (optional)",
          ],
        },
        { t: "h3", x: "10.2 How to Manage" },
        {
          t: "ul",
          x: [
            '**Email:** Click "Unsubscribe" in any marketing email',
            "**Push Notifications:** Device settings or App → Settings → Notifications",
            "**SMS:** Reply STOP to any promotional SMS",
            "**In-App Messages:** Settings → Preferences → Marketing",
          ],
        },
      ],
    },
    {
      id: "international-users",
      title: "11. International Users & Data Transfers",
      blocks: [
        { t: "p", x: "If you access Chaiomi from outside India:" },
        {
          t: "ul",
          x: [
            "Your data may be transferred to and processed in India",
            "We ensure adequate protection through: Standard Contractual Clauses (EU), encryption and security measures, and compliance with local data protection laws",
            "EU users retain all GDPR rights regardless of data location",
          ],
        },
      ],
    },
    {
      id: "updates-to-this-policy",
      title: "12. Updates to This Privacy Policy",
      blocks: [
        { t: "p", x: "We may update this policy to reflect:" },
        {
          t: "ul",
          x: [
            "New features or services",
            "Legal or regulatory changes",
            "Security enhancements",
            "User feedback",
          ],
        },
        { t: "p", x: "**How we notify you:**" },
        {
          t: "ul",
          x: [
            "**Major Changes:** In-app notification + email 30 days before changes take effect",
            '**Minor Updates:** Posted on website with updated "Last Updated" date',
            "**Continued use after changes:** Constitutes acceptance",
          ],
        },
        {
          t: "p",
          x: "**Version History:** Available at www.chaiomi.com/privacy-history",
        },
      ],
    },
    {
      id: "additional-information",
      title: "13. Additional Information",
      blocks: [
        { t: "h3", x: "13.1 California Privacy Rights (CCPA)" },
        {
          t: "p",
          x: "California residents have additional rights including:",
        },
        {
          t: "ul",
          x: [
            "Know what personal information is collected",
            "Know if personal information is sold or disclosed",
            "Say no to sale of personal information (we don't sell data)",
            "Access personal information",
            "Request deletion",
          ],
        },
        { t: "h3", x: "13.2 Data Protection Officer" },
        {
          t: "p",
          x: "For privacy-related inquiries: **Email:** dpo@chaiomi.com. **Response Time:** 5 business days",
        },
        { t: "h3", x: "13.3 Supervisory Authority" },
        {
          t: "p",
          x: "EU users may lodge complaints with their local data protection authority. Indian users may approach the Data Protection Board of India.",
        },
      ],
    },
    {
      id: "contact-information",
      title: "14. Contact Information",
      blocks: [
        {
          t: "p",
          x: "**Chaiomi Tech Private Limited**",
        },
        {
          t: "p",
          x: "**Registered Office:** TRENDZ ORBIT, 1st Floor, Plot No:127, Lumbini Enclave, Gachibowli, Hyderabad-500032",
        },
        { t: "p", x: "**Corporate Office:** Hyderabad, India" },
        {
          t: "ul",
          x: [
            "**Privacy Inquiries (Email):** privacy@chaiomi.com",
            "**Data Protection Officer (Email):** dpo@chaiomi.com",
            "**Phone:** +91 7569297513",
            "**Website:** www.chaiomi.com/privacy-policy",
          ],
        },
        {
          t: "p",
          x: "**Response Time:** We respond to all privacy inquiries within 5 business days.",
        },
      ],
    },
    {
      id: "acceptance",
      title: "15. Acceptance of This Policy",
      blocks: [
        { t: "p", x: "By using Chaiomi, you acknowledge that:" },
        {
          t: "ul",
          x: [
            "You have read and understood this Privacy Policy",
            "You consent to the collection and use of information as described",
            "You are at least 13 years old (or legal age of consent in your jurisdiction)",
            "You agree to receive essential service communications",
          ],
        },
      ],
    },
  ],
};
