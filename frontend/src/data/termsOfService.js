// Terms of Service content. Edit the text here, not in the page component.
// Block types: p (paragraph), h3 (sub-heading), ul (bullet list), ol (numbered
// list). Use **double asterisks** for bold text.

export const termsOfService = {
  title: "Terms of Service",
  effectiveDate: "January 1, 2026",
  lastUpdated: "December 26, 2025",
  version: "1.0.0.1",
  documentId: "CHAIOMI-TOS-2026-V1",
  sections: [
    {
      id: "agreement-to-terms",
      title: "1. Agreement to Terms",
      blocks: [
        {
          t: "p",
          x: 'Welcome to Chaiomi. These Terms of Service ("Terms," "Agreement") constitute a legally binding agreement between you ("User," "you," "your") and Chaiomi Tech Private Limited, operating as Chaiomi ("Chaiomi," "we," "us," "our").',
        },
        { t: "p", x: "These Terms govern your access to and use of:" },
        {
          t: "ul",
          x: [
            "The Chaiomi mobile application (iOS and Android)",
            "The Chaiomi website (www.chaiomi.com)",
            "Our robotic beverage kiosks and OMI™ brewing units",
            "Digital services including AI personalization, Sips & Scripts™ loyalty program",
            'All related features, content, and services (collectively, the "Platform")',
          ],
        },
        {
          t: "p",
          x: "By creating an account, downloading our app, placing an order, or using any part of the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.",
        },
        {
          t: "p",
          x: "If you do not agree to these Terms, you must not access or use the Platform.",
        },
      ],
    },
    {
      id: "eligibility-and-accounts",
      title: "2. Eligibility & Account Registration",
      blocks: [
        { t: "h3", x: "2.1 Age Requirement" },
        {
          t: "p",
          x: "You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to:",
        },
        {
          t: "ul",
          x: [
            "Create a Chaiomi account",
            "Place orders through the Platform",
            "Use our payment services",
            "Participate in loyalty programs",
          ],
        },
        {
          t: "p",
          x: "**If you are under 18:** You may use the Platform only with the involvement and consent of a parent or legal guardian who agrees to be bound by these Terms.",
        },
        { t: "h3", x: "2.2 Account Registration" },
        {
          t: "p",
          x: "To use certain features of the Platform, you must register for an account by providing:",
        },
        {
          t: "ul",
          x: [
            "Accurate and complete information (name, email, phone number, date of birth)",
            "Valid payment information",
            "Your beverage preferences (optional but recommended for personalization)",
          ],
        },
        { t: "p", x: "You agree to:" },
        {
          t: "ul",
          x: [
            "Keep your account information current and accurate",
            "Update your details promptly if they change",
            "Not create multiple accounts without authorization",
            "Not use another person's account without permission",
            "Not create an account using false or misleading information",
          ],
        },
        { t: "h3", x: "2.3 Account Security" },
        { t: "p", x: "You are responsible for:" },
        {
          t: "ul",
          x: [
            "Maintaining the confidentiality of your password and login credentials",
            "All activities that occur under your account",
            "Immediately notifying us of any unauthorized access or security breach",
          ],
        },
        { t: "p", x: "We are not liable for any loss or damage arising from:" },
        {
          t: "ul",
          x: [
            "Your failure to maintain account security",
            "Unauthorized access due to compromised credentials",
            "Activities conducted by anyone using your account with or without your permission",
          ],
        },
        { t: "p", x: "**Security Best Practices:**" },
        {
          t: "ul",
          x: [
            "Use a strong, unique password",
            "Do not share your login credentials",
            "Log out from shared devices",
            "Enable two-factor authentication if available",
          ],
        },
      ],
    },
    {
      id: "orders-payments-pricing",
      title: "3. Orders, Payments & Pricing",
      blocks: [
        { t: "h3", x: "3.1 Placing Orders" },
        { t: "p", x: "Orders can be placed:" },
        {
          t: "ul",
          x: [
            "Through the mobile app",
            "At physical kiosks using QR codes or app integration",
            "Via the website (where available)",
          ],
        },
        { t: "p", x: "**Order Confirmation:**" },
        {
          t: "ul",
          x: [
            "Orders are confirmed only after successful payment processing",
            "You will receive a confirmation notification via app, email, or SMS",
            "Confirmation does not guarantee immediate availability in case of technical issues",
          ],
        },
        { t: "h3", x: "3.2 Product Availability" },
        {
          t: "ul",
          x: [
            "All orders are subject to product and ingredient availability",
            "We reserve the right to refuse or cancel orders due to: ingredient unavailability, technical malfunctions, suspected fraudulent activity, violation of these Terms, or force majeure events",
          ],
        },
        { t: "h3", x: "3.3 Pricing" },
        {
          t: "ul",
          x: [
            "All prices are displayed in Indian Rupees (INR) unless otherwise stated",
            "Prices include applicable taxes unless stated otherwise",
            "Prices are subject to change without notice",
            "Promotional pricing is subject to specific terms and conditions",
          ],
        },
        { t: "h3", x: "3.4 Payment Processing" },
        { t: "p", x: "We accept the following payment methods:" },
        {
          t: "ul",
          x: [
            "UPI (Unified Payments Interface)",
            "Credit and debit cards",
            "Digital wallets",
            "Net banking",
            "Other payment methods as made available",
          ],
        },
        { t: "p", x: "**Payment Terms:**" },
        {
          t: "ul",
          x: [
            "Payment is due at the time of order placement",
            "We use third-party payment processors (Razorpay, Stripe, PayU, etc.)",
            "By making a payment, you authorize us to share necessary transaction information with payment processors",
            "Payment processing is subject to the terms of the payment service provider",
            "We do not store complete credit card numbers on our servers",
          ],
        },
        { t: "p", x: "**Payment Security:**" },
        {
          t: "ul",
          x: [
            "All transactions are encrypted and secure",
            "We comply with PCI-DSS standards",
            "Payment information is tokenized for your protection",
          ],
        },
        { t: "h3", x: "3.5 Failed Transactions" },
        {
          t: "ul",
          x: [
            "If payment fails, your order will not be processed",
            "You may be charged a nominal fee for repeated failed transactions due to insufficient funds",
            "Refunds for failed transactions where money was deducted will be processed within 5-7 business days",
          ],
        },
      ],
    },
    {
      id: "refunds-and-cancellations",
      title: "4. Refunds & Cancellations",
      blocks: [
        { t: "h3", x: "4.1 Cancellation Policy" },
        { t: "p", x: "**Before Preparation:**" },
        {
          t: "ul",
          x: [
            "Orders can be cancelled before the brewing process begins",
            "Cancellations must be made through the app",
            "Full refund will be issued to the original payment method",
          ],
        },
        { t: "p", x: "**After Preparation Begins:**" },
        {
          t: "ul",
          x: [
            "Orders cannot be cancelled once brewing has started",
            "This is typically within 30 seconds of order confirmation at the kiosk",
          ],
        },
        { t: "h3", x: "4.2 Refund Policy" },
        { t: "p", x: "Refunds are available in the following circumstances:" },
        {
          t: "ul",
          x: [
            "Technical malfunction resulting in non-delivery",
            "Incorrect order preparation due to system error",
            "Payment charged but order not processed",
            "Quality issues reported within 10 minutes of collection",
          ],
        },
        { t: "p", x: "**Refund Process:**" },
        {
          t: "ul",
          x: [
            "Request refunds through the app within 24 hours of order",
            "Provide order number and reason for refund",
            "Include photos/videos if applicable",
            "Refunds are processed within 5-7 business days",
            "Refunds are issued to the original payment method",
          ],
        },
        { t: "p", x: "**Non-Refundable Situations:**" },
        {
          t: "ul",
          x: [
            "Change of mind after order confirmation",
            "Delay in collecting the order from the kiosk",
            "Personal taste preferences after customization",
            "Orders collected and consumed",
            "Promotional or discounted orders (unless defective)",
          ],
        },
        { t: "h3", x: "4.3 Loyalty Points & Credits" },
        {
          t: "ul",
          x: [
            "Loyalty points and promotional credits are non-refundable",
            "Credits expire as per the terms of the specific promotion",
            "Points cannot be transferred or exchanged for cash",
          ],
        },
      ],
    },
    {
      id: "product-information-and-health",
      title: "5. Product Information & Health Disclaimers",
      blocks: [
        { t: "h3", x: "5.1 Beverage Customization" },
        {
          t: "ul",
          x: [
            "Chaiomi offers extensive customization options (1 billion+ combinations)",
            "You are responsible for selecting options suitable for your preferences",
            "AI recommendations are suggestions based on algorithms and are not guarantees of satisfaction",
          ],
        },
        { t: "h3", x: "5.2 Allergen Information" },
        { t: "p", x: "**IMPORTANT ALLERGEN NOTICE:**" },
        {
          t: "p",
          x: "Chaiomi beverages may contain or come into contact with:",
        },
        {
          t: "ul",
          x: [
            "Dairy products (milk, cream)",
            "Nuts and nut-derived products",
            "Soy products",
            "Caffeine",
            "Spices and botanical ingredients",
          ],
        },
        { t: "p", x: "We cannot guarantee allergen-free preparation because:" },
        {
          t: "ul",
          x: [
            "Equipment is shared across multiple beverage types",
            "Cross-contamination may occur despite cleaning protocols",
            "Ingredient suppliers may process allergens in their facilities",
          ],
        },
        {
          t: "p",
          x: "**If you have food allergies or dietary restrictions:**",
        },
        {
          t: "ul",
          x: [
            "Review ingredient information before ordering",
            "Contact us at hello@chaiomi.com for specific allergen queries",
            "Consult with medical professionals if you have severe allergies",
            "Use the Platform at your own risk",
          ],
        },
        { t: "h3", x: "5.3 Health Conditions & Dietary Restrictions" },
        { t: "p", x: "You acknowledge that:" },
        {
          t: "ul",
          x: [
            "Beverages contain caffeine unless specifically caffeine-free",
            "High caffeine intake may not be suitable for pregnant women, children, or individuals with certain health conditions",
            "Sugar, milk, and spice content can be customized but may not be suitable for all dietary needs",
            "We are not responsible for adverse health effects resulting from consumption",
          ],
        },
        { t: "p", x: "**You are solely responsible for:**" },
        {
          t: "ul",
          x: [
            "Ensuring beverages are suitable for your health conditions",
            "Consulting healthcare providers about dietary concerns",
            "Reading ingredient lists and making informed choices",
          ],
        },
        { t: "h3", x: "5.4 Temperature Warnings" },
        {
          t: "ul",
          x: [
            "Beverages are served hot and may cause burns",
            "Allow adequate cooling time before consumption",
            "Keep hot beverages away from children",
            "We are not liable for burns or injuries from hot beverages",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      blocks: [
        { t: "h3", x: "6.1 Ownership" },
        {
          t: "p",
          x: "All intellectual property rights in and to the Platform and its content are owned by or licensed to Chaiomi Tech Private Limited (operating under Ayaanz Food Labs Pvt Ltd), including but not limited to:",
        },
        { t: "p", x: "**Technology & Systems:**" },
        {
          t: "ul",
          x: [
            "OMI™ robotic brewing technology (patented)",
            "AI-driven personalization algorithms",
            "Machine learning models and taste prediction engines",
            "Robotic automation systems",
            "Software, source code, and applications",
          ],
        },
        { t: "p", x: "**Brand & Creative Assets:**" },
        {
          t: "ul",
          x: [
            'Chaiomi name, logo, and tagline ("It knows you")',
            "Sips & Scripts™ loyalty program",
            "Visual identity, color schemes, and design elements",
            "Marketing materials and advertising content",
            "Product photography and videos",
          ],
        },
        { t: "p", x: "**Digital Content:**" },
        {
          t: "ul",
          x: [
            "Website content and app interfaces",
            "Audio stories and curated content",
            "User interface designs",
            "Database structures and architectures",
          ],
        },
        { t: "p", x: "**Recipes & Methods:**" },
        {
          t: "ul",
          x: [
            "Beverage recipes and formulations",
            "Brewing methodologies and processes",
            "Ingredient combinations and ratios",
          ],
        },
        { t: "h3", x: "6.2 Prohibited Uses" },
        { t: "p", x: "You may NOT, without express written permission:" },
        {
          t: "ul",
          x: [
            "Copy, reproduce, distribute, or publicly display any Platform content",
            "Modify, adapt, translate, or create derivative works",
            "Reverse engineer, decompile, or disassemble any software or technology",
            "Extract data through scraping, crawling, or automated means",
            "Use the Chaiomi name, logo, or branding for any purpose",
            "Train artificial intelligence or machine learning models using Chaiomi data",
            "Use Platform content for commercial purposes",
            "Frame or mirror any part of the Platform on other websites",
            "Remove or alter copyright notices, trademarks, or proprietary rights notices",
          ],
        },
        { t: "h3", x: "6.3 User-Generated Content" },
        {
          t: "p",
          x: "If you submit content to the Platform (reviews, feedback, photos, suggestions):",
        },
        {
          t: "ul",
          x: [
            "You grant Chaiomi a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content",
            "You represent that you own or have rights to the content submitted",
            "You waive any moral rights in the content",
            "Chaiomi may remove any user content at its discretion",
          ],
        },
        { t: "h3", x: "6.4 Enforcement" },
        {
          t: "p",
          x: "Violation of intellectual property rights may result in:",
        },
        {
          t: "ul",
          x: [
            "Immediate account termination",
            "Legal action and prosecution",
            "Claims for damages and injunctive relief",
            "Referral to law enforcement authorities",
          ],
        },
      ],
    },
    {
      id: "data-privacy-and-ai",
      title: "7. Data Collection, Privacy & AI Training",
      blocks: [
        { t: "h3", x: "7.1 Data We Collect" },
        {
          t: "p",
          x: "By using the Platform, you acknowledge that we collect and process:",
        },
        {
          t: "ul",
          x: [
            "Account information and personal details",
            "Order history and beverage preferences",
            "Usage patterns and app interactions",
            "Location data (when permitted)",
            "Payment information",
            "Device and technical data",
          ],
        },
        {
          t: "p",
          x: "For complete details, please review our Privacy Policy.",
        },
        { t: "h3", x: "7.2 How We Use Your Data" },
        { t: "p", x: "Your data is used to:" },
        {
          t: "ul",
          x: [
            "Fulfill orders and provide services",
            "Personalize beverage recommendations using AI",
            "Improve our algorithms and machine learning models",
            "Enhance user experience",
            "Provide customer support",
            "Send order confirmations and service updates",
            "Offer loyalty rewards and promotional content (with consent)",
            "Conduct analytics and research",
            "Comply with legal obligations",
          ],
        },
        { t: "h3", x: "7.3 AI Training & Personalization" },
        {
          t: "ul",
          x: [
            "We use aggregated and anonymized data to train our AI models",
            "Your preference data helps improve recommendation accuracy",
            "AI-driven suggestions are based on patterns, mood indicators, weather, and historical preferences",
            "You can opt out of certain data collection in app settings",
          ],
        },
        { t: "h3", x: "7.4 Data Sharing" },
        {
          t: "ul",
          x: [
            "We do NOT sell your personal data to third parties",
            "We share limited data with service providers (payment processors, cloud hosting, analytics)",
            "All third parties are bound by strict confidentiality agreements",
            "We may disclose data when required by law",
          ],
        },
        { t: "h3", x: "7.5 Your Data Rights" },
        { t: "p", x: "You have the right to:" },
        {
          t: "ul",
          x: [
            "Access your personal data",
            "Correct inaccurate information",
            "Request deletion of your account and data",
            "Opt out of marketing communications",
            "Withdraw consent for data processing",
          ],
        },
        {
          t: "p",
          x: "See our Privacy Policy for details on exercising these rights.",
        },
      ],
    },
    {
      id: "loyalty-and-promotions",
      title: "8. Loyalty Programs & Promotions",
      blocks: [
        { t: "h3", x: "8.1 Sips & Scripts™ Loyalty Program" },
        { t: "p", x: "The Sips & Scripts™ program offers:" },
        {
          t: "ul",
          x: [
            "StorySip Points for every purchase",
            "Exclusive audio stories and cultural content",
            "Access to Chai Clubs and community features",
            "Special offers and seasonal promotions",
          ],
        },
        { t: "p", x: "**Program Terms:**" },
        {
          t: "ul",
          x: [
            "Membership is free with account creation",
            "Points are earned based on purchase amount",
            "Points have no cash value and cannot be transferred",
            "Points may expire after 12 months of inactivity",
            "Chaiomi reserves the right to adjust point values or redemption tiers",
          ],
        },
        { t: "h3", x: "8.2 Promotional Offers & Discounts" },
        {
          t: "ul",
          x: [
            "Promotional codes and offers are subject to specific terms",
            "Offers cannot be combined unless explicitly stated",
            "Promotional pricing is subject to availability",
            "Chaiomi reserves the right to cancel or modify promotions without notice",
            "Fraudulent use of promotional codes will result in account termination",
          ],
        },
        { t: "h3", x: "8.3 Referral Programs" },
        {
          t: "ul",
          x: [
            "Referral rewards are credited upon successful completion of the referred user's first order",
            "Referral codes are for personal use and may not be publicly distributed for commercial gain",
            "Abuse of the referral system will result in forfeiture of rewards and potential account termination",
          ],
        },
        { t: "h3", x: "8.4 Changes to Benefits" },
        {
          t: "p",
          x: "Chaiomi may, at any time and without prior notice:",
        },
        {
          t: "ul",
          x: [
            "Modify point earning rates",
            "Change redemption options",
            "Suspend or discontinue the loyalty program",
            "Revoke benefits due to Terms violations",
            "Expire unused points or credits",
          ],
        },
      ],
    },
    {
      id: "platform-usage-and-conduct",
      title: "9. Platform Usage & Conduct",
      blocks: [
        { t: "h3", x: "9.1 Acceptable Use" },
        {
          t: "p",
          x: "You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree NOT to:",
        },
        { t: "p", x: "**Prohibited Activities:**" },
        {
          t: "ul",
          x: [
            "Violate any applicable laws or regulations",
            "Infringe on intellectual property rights of Chaiomi or others",
            "Transmit viruses, malware, or harmful code",
            "Attempt to gain unauthorized access to systems or accounts",
            "Interfere with or disrupt Platform functionality",
            "Use automated systems (bots, scrapers) without permission",
            "Impersonate others or provide false information",
            "Harass, abuse, or harm other users or staff",
            "Post offensive, defamatory, or inappropriate content",
            "Engage in fraudulent activities or payment disputes in bad faith",
            "Exploit bugs or vulnerabilities for personal gain",
            "Share or resell login credentials",
          ],
        },
        { t: "h3", x: "9.2 Account Suspension & Termination" },
        {
          t: "p",
          x: "Chaiomi may, without prior notice, suspend or terminate your account if:",
        },
        {
          t: "ul",
          x: [
            "You violate these Terms",
            "We suspect fraudulent or abusive activity",
            "We receive legal requests or court orders",
            "Your account remains inactive for extended periods",
            "You engage in conduct harmful to other users or our business",
          ],
        },
        { t: "p", x: "**Effects of Termination:**" },
        {
          t: "ul",
          x: [
            "Access to the Platform will be revoked immediately",
            "Unused loyalty points or credits will be forfeited",
            "Outstanding orders will be cancelled",
            "You remain liable for any amounts owed prior to termination",
          ],
        },
        { t: "h3", x: "9.3 Kiosk Usage" },
        { t: "p", x: "When using physical kiosks:" },
        {
          t: "ul",
          x: [
            "Follow all posted instructions and safety guidelines",
            "Do not tamper with equipment or attempt repairs",
            "Report malfunctions immediately through the app",
            "Ensure collection of orders within the specified time frame",
            "Be courteous and respectful to other users",
            "Comply with location-specific rules and regulations",
          ],
        },
      ],
    },
    {
      id: "service-availability",
      title: "10. Service Availability & Technical Issues",
      blocks: [
        { t: "h3", x: "10.1 Service Interruptions" },
        {
          t: "p",
          x: "Chaiomi strives to provide continuous service but may experience interruptions due to:",
        },
        {
          t: "ul",
          x: [
            "Scheduled maintenance and updates",
            "Technical failures or equipment malfunctions",
            "Network connectivity issues",
            "Server downtime or upgrades",
            "Force majeure events (natural disasters, pandemics, etc.)",
            "Third-party service provider issues",
          ],
        },
        { t: "p", x: "**We do not guarantee:**" },
        {
          t: "ul",
          x: [
            "Uninterrupted or error-free service",
            "Specific uptime percentages",
            "Availability at all kiosk locations at all times",
          ],
        },
        { t: "h3", x: "10.2 Technical Support" },
        { t: "p", x: "For technical issues or support inquiries:" },
        {
          t: "ul",
          x: [
            "Contact us at support@chaiomi.com",
            "Use the in-app help center",
            "Report issues through the app feedback feature",
            "Response time: Within 24-48 hours for most inquiries",
          ],
        },
        { t: "h3", x: "10.3 Platform Updates" },
        {
          t: "ul",
          x: [
            "We may update the app, website, or kiosk software at any time",
            "Updates may introduce new features or modify existing ones",
            "Continued use after updates constitutes acceptance of changes",
            "Some updates may require device compatibility or operating system upgrades",
          ],
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "11. Limitation of Liability",
      blocks: [
        { t: "h3", x: "11.1 Disclaimer of Warranties" },
        {
          t: "p",
          x: 'TO THE FULLEST EXTENT PERMITTED BY LAW, THE PLATFORM AND ALL SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:',
        },
        {
          t: "ul",
          x: [
            "Warranties of merchantability",
            "Fitness for a particular purpose",
            "Non-infringement",
            "Accuracy or completeness of content",
            "Uninterrupted or error-free service",
          ],
        },
        { t: "h3", x: "11.2 Limitation of Damages" },
        {
          t: "p",
          x: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:",
        },
        {
          t: "p",
          x: "Chaiomi and its affiliates, directors, employees, agents, and partners shall NOT be liable for:",
        },
        {
          t: "ul",
          x: [
            "Indirect, incidental, special, consequential, or punitive damages",
            "Loss of profits, revenue, data, or business opportunities",
            "Personal injury or property damage (except where caused by our gross negligence)",
            "Damages arising from use or inability to use the Platform",
            "Errors, mistakes, or inaccuracies of content",
            "Unauthorized access to your account or personal information",
            "Interruption or cessation of services",
            "Bugs, viruses, or harmful components transmitted through the Platform",
            "Third-party content, products, or services",
          ],
        },
        { t: "p", x: "**Maximum Liability:**" },
        {
          t: "ul",
          x: [
            "Our total liability for any claim arising from your use of the Platform shall not exceed the amount you paid to Chaiomi in the 30 days immediately preceding the claim",
            "If no payment was made, our liability shall not exceed INR 1,000",
          ],
        },
        { t: "h3", x: "11.3 Indemnification" },
        {
          t: "p",
          x: "You agree to indemnify, defend, and hold harmless Chaiomi, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:",
        },
        {
          t: "ul",
          x: [
            "Your violation of these Terms",
            "Your use or misuse of the Platform",
            "Your violation of any third-party rights",
            "Your violation of applicable laws or regulations",
            "Content you submit to the Platform",
            "Fraudulent or illegal activities",
          ],
        },
        { t: "h3", x: "11.4 Exceptions" },
        {
          t: "p",
          x: "Nothing in these Terms excludes or limits liability for:",
        },
        {
          t: "ul",
          x: [
            "Death or personal injury caused by negligence",
            "Fraud or fraudulent misrepresentation",
            "Any liability that cannot be excluded by law",
          ],
        },
      ],
    },
    {
      id: "third-party-services",
      title: "12. Third-Party Services & Links",
      blocks: [
        { t: "h3", x: "12.1 Third-Party Payment Processors" },
        {
          t: "ul",
          x: [
            "We use third-party payment processors (Razorpay, Stripe, PayU, etc.)",
            "Your use of payment services is subject to their terms and conditions",
            "We are not responsible for payment processor errors, delays, or security breaches",
          ],
        },
        { t: "h3", x: "12.2 Third-Party Links" },
        {
          t: "ul",
          x: [
            "The Platform may contain links to third-party websites or services",
            "We do not endorse or control third-party content",
            "Access to third-party sites is at your own risk",
            "Third-party terms and privacy policies apply",
          ],
        },
        { t: "h3", x: "12.3 Integration Partners" },
        {
          t: "ul",
          x: [
            "We may integrate with delivery partners, location services, or analytics providers",
            "These integrations are subject to separate terms",
            "We are not liable for third-party service failures",
          ],
        },
      ],
    },
    {
      id: "dispute-resolution",
      title: "13. Dispute Resolution & Governing Law",
      blocks: [
        { t: "h3", x: "13.1 Governing Law" },
        {
          t: "p",
          x: "These Terms are governed by and construed in accordance with the laws of India, without regard to conflict of law principles.",
        },
        { t: "h3", x: "13.2 Jurisdiction" },
        {
          t: "p",
          x: "Any disputes, claims, or controversies arising from or relating to these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.",
        },
        {
          t: "p",
          x: "You irrevocably submit to the jurisdiction of such courts and waive any objection to venue.",
        },
        { t: "h3", x: "13.3 Dispute Resolution Process" },
        { t: "p", x: "Before initiating legal action, you agree to:" },
        {
          t: "ol",
          x: [
            "Contact us at legal@chaiomi.com with details of your dispute",
            "Allow us 30 days to attempt to resolve the issue amicably",
            "Engage in good-faith negotiations",
          ],
        },
        { t: "h3", x: "13.4 Arbitration (Optional)" },
        {
          t: "p",
          x: "For disputes exceeding INR 50,000, either party may elect binding arbitration:",
        },
        {
          t: "ul",
          x: [
            "Conducted in Hyderabad, India",
            "Governed by the Arbitration and Conciliation Act, 1996",
            "Single arbitrator appointed by mutual agreement",
            "Language: English",
            "Costs shared equally unless arbitrator decides otherwise",
          ],
        },
        { t: "h3", x: "13.5 Class Action Waiver" },
        {
          t: "p",
          x: "You agree to bring claims only in your individual capacity and not as a plaintiff or class member in any purported class or representative proceeding.",
        },
      ],
    },
    {
      id: "updates-to-terms",
      title: "14. Updates to Terms of Service",
      blocks: [
        { t: "h3", x: "14.1 Right to Modify" },
        {
          t: "p",
          x: "Chaiomi reserves the right to modify, update, or replace these Terms at any time at our sole discretion.",
        },
        { t: "p", x: "Reasons for updates may include:" },
        {
          t: "ul",
          x: [
            "Changes to services or features",
            "Legal or regulatory requirements",
            "Security or operational improvements",
            "Business model changes",
          ],
        },
        { t: "h3", x: "14.2 Notification of Changes" },
        { t: "p", x: "When we make material changes to these Terms:" },
        {
          t: "ul",
          x: [
            'We will update the "Last Updated" date at the top',
            "We will notify you via email or in-app notification",
            "Notice will be provided at least 30 days before changes take effect",
            "For minor changes, we may post updates without individual notice",
          ],
        },
        { t: "h3", x: "14.3 Acceptance of Changes" },
        {
          t: "ul",
          x: [
            "Continued use of the Platform after changes take effect constitutes acceptance",
            "If you do not agree to revised Terms, you must stop using the Platform and may request account deletion",
            "Material changes will not apply retroactively",
          ],
        },
        { t: "h3", x: "14.4 Version History" },
        {
          t: "p",
          x: "Previous versions of these Terms are available at: www.chaiomi.com/terms-history",
        },
      ],
    },
    {
      id: "general-provisions",
      title: "15. General Provisions",
      blocks: [
        { t: "h3", x: "15.1 Entire Agreement" },
        {
          t: "p",
          x: "These Terms, together with our Privacy Policy and any additional terms applicable to specific services, constitute the entire agreement between you and Chaiomi regarding the Platform.",
        },
        { t: "h3", x: "15.2 Severability" },
        {
          t: "p",
          x: "If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.",
        },
        { t: "h3", x: "15.3 Waiver" },
        {
          t: "p",
          x: "Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.",
        },
        { t: "h3", x: "15.4 Assignment" },
        {
          t: "ul",
          x: [
            "You may not assign or transfer these Terms or your account without our written consent",
            "Chaiomi may assign or transfer these Terms to affiliates, successors, or third parties without restriction",
          ],
        },
        { t: "h3", x: "15.5 Force Majeure" },
        {
          t: "p",
          x: "Chaiomi shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to:",
        },
        {
          t: "ul",
          x: [
            "Natural disasters",
            "War, terrorism, or civil unrest",
            "Government actions or restrictions",
            "Pandemics or public health emergencies",
            "Labor disputes or strikes",
            "Network or infrastructure failures",
            "Supplier or vendor failures",
          ],
        },
        { t: "h3", x: "15.6 Survival" },
        {
          t: "p",
          x: "Provisions that by their nature should survive termination (including intellectual property, limitation of liability, indemnification, and dispute resolution) shall survive termination of these Terms.",
        },
        { t: "h3", x: "15.7 Language" },
        {
          t: "p",
          x: "These Terms are provided in English. In case of any translation, the English version shall prevail.",
        },
      ],
    },
    {
      id: "contact-information",
      title: "16. Contact Information",
      blocks: [
        {
          t: "p",
          x: "**Chaiomi Tech Private Limited** (Operating under Ayaanz Food Labs Pvt Ltd)",
        },
        {
          t: "p",
          x: "**Registered Office:** TRENDZ ORBIT, 1st Floor, Plot No:127, Lumbini Enclave, Gachibowli, Hyderabad-500032, India",
        },
        {
          t: "p",
          x: "**Corporate Office:** Hyderabad, Telangana, India",
        },
        {
          t: "ul",
          x: [
            "**For General Inquiries (Email):** hello@chaiomi.com",
            "**Website:** www.chaiomi.com",
            "**For Legal Matters (Email):** hello@chaiomi.com",
            "**For Privacy Concerns (Email):** hello@chaiomi.com",
          ],
        },
        {
          t: "p",
          x: "**Customer Support Hours:** Monday - Sunday: 8:00 AM - 10:00 PM IST",
        },
        { t: "p", x: "**Response Time:**" },
        {
          t: "ul",
          x: [
            "General inquiries: 24-48 hours",
            "Technical support: 24-48 hours",
            "Legal matters: 5-7 business days",
          ],
        },
      ],
    },
    {
      id: "acknowledgment",
      title: "17. Acknowledgment & Acceptance",
      blocks: [
        {
          t: "p",
          x: 'By clicking "I Agree," creating an account, downloading the app, placing an order, or otherwise using the Platform, you acknowledge that:',
        },
        {
          t: "ul",
          x: [
            "You have read and understood these Terms of Service in their entirety",
            "You have read and understood our Privacy Policy",
            "You agree to be legally bound by these Terms and any future amendments",
            "You are at least 18 years of age (or have parental/guardian consent)",
            "You have the legal capacity to enter into this binding agreement",
            "All information you provide is accurate and complete",
            "You will comply with all applicable laws while using the Platform",
            "You understand the allergen warnings and health disclaimers",
            "You accept the limitations of liability outlined herein",
          ],
        },
        { t: "p", x: "**BY USING CHAIOMI, YOU AGREE TO THESE TERMS.**" },
      ],
    },
  ],
};
