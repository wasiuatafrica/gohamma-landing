export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface GuideStep {
  title: string;
  content: string;
  media?: MediaItem[];
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  steps: GuideStep[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  iconName: string;
  guides: Guide[];
}

export const guideCategories: Category[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using HAMMA',
    iconName: 'BookOpen',
    guides: [
      {
        id: 'account-setup',
        title: 'Account Setup',
        description: 'Learn how to set up your HAMMA account securely',
        steps: [
          {
            title: 'Create Your Account',
            content: 'Visit the HAMMA website and click on the "Sign Up" button at the top right corner of the page. Fill in your personal details including your full name, email address, and phone number. Create a strong password that includes uppercase letters, lowercase letters, numbers, and special characters.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'The HAMMA signup page showing the registration form'
              }
            ]
          },
          {
            title: 'Verify Your Identity',
            content: 'To comply with regulatory requirements, you\'ll need to verify your identity. Upload a valid government-issued ID (National ID, International Passport, or Driver\'s License) and a recent utility bill or bank statement for proof of address. These documents will be reviewed within 24 hours.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Document upload screen showing accepted ID types'
              }
            ]
          },
          {
            title: 'Complete BVN Verification',
            content: 'Enter your Bank Verification Number (BVN) to validate your identity. This helps protect your account and ensures that your account is compliant with Nigerian financial regulations. Your BVN is securely processed and stored with bank-level encryption.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'BVN verification screen'
              }
            ]
          },
          {
            title: 'Set Up Two-Factor Authentication',
            content: 'Enhance your account security by enabling two-factor authentication (2FA). You can choose between SMS verification or using an authenticator app like Google Authenticator. This adds an extra layer of protection to your account by requiring a verification code in addition to your password when logging in.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: '2FA setup screen showing options for SMS or authenticator app'
              }
            ]
          }
        ]
      },
      {
        id: 'funding-account',
        title: 'Funding Your Account',
        description: 'Learn about the different ways to fund your trading account',
        steps: [
          {
            title: 'Access Fund Account Section',
            content: 'Log into your HAMMA account and navigate to the "Wallet" section from the main dashboard. Click on "Fund Account" to see all available funding options. The minimum deposit amount is ₦5,000.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Fund account page showing different payment options'
              }
            ]
          },
          {
            title: 'Bank Transfer',
            content: 'For bank transfers, you\'ll be provided with HAMMA\'s account details. Make the transfer from your registered bank account, and include your unique reference code in the transfer description. Funds typically reflect within 1-3 hours during business days.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Bank transfer details screen with account information'
              }
            ]
          },
          {
            title: 'Card Payment',
            content: 'For instant funding, you can use your debit card. Select "Card Payment," enter your card details, and follow the prompts to complete the transaction. Card payments are processed instantly, and your account will be credited immediately.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Card payment screen with secure input fields'
              }
            ]
          },
          {
            title: 'Verify Your Deposit',
            content: 'After making a deposit, check your transaction history to confirm that the funds have been credited to your account. You\'ll also receive an email notification confirming your deposit. If you encounter any issues, contact customer support with your transaction reference.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'How to verify your deposit and check transaction history'
              }
            ]
          }
        ]
      },
      {
        id: 'navigating-platform',
        title: 'Navigating the Platform',
        description: 'Learn how to navigate the HAMMA trading platform effectively',
        steps: [
          {
            title: 'Dashboard Overview',
            content: 'The dashboard is your central hub, showing your portfolio summary, market overview, watchlist, and recent transactions. From here, you can quickly access all platform features through the main navigation menu.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'HAMMA dashboard with labeled sections'
              }
            ]
          },
          {
            title: 'Market Data Section',
            content: 'The Market Data section provides real-time information on stock prices, indices, and market trends. You can view stock details, historical charts, and company information to make informed investment decisions.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Market data screen showing stock listings and indices'
              }
            ]
          },
          {
            title: 'Portfolio Management',
            content: 'The Portfolio section displays all your investments, current market value, profit/loss, and performance metrics. You can track individual stock performance and view detailed transaction history.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Portfolio management screen with asset breakdown'
              }
            ]
          },
          {
            title: 'Setting Up Alerts',
            content: 'Create customized price alerts to stay informed about market movements. Navigate to the Alerts section, select a stock, set your desired price threshold, and choose your notification method (email, SMS, or push notification).',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'How to set up and manage stock price alerts'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'trading',
    title: 'Trading Guide',
    description: 'Learn how to place and manage trades',
    iconName: 'BarChart3',
    guides: [
      {
        id: 'placing-order',
        title: 'Placing Your First Order',
        description: 'A step-by-step guide to placing your first stock order',
        steps: [
          {
            title: 'Select a Stock',
            content: 'From the dashboard, navigate to the "Market" section where you\'ll find a list of all available stocks. You can use the search function to find specific companies or browse by sector. Click on a stock to view its detailed information, including current price, price history, and company fundamentals.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Stock selection screen with search functionality'
              }
            ]
          },
          {
            title: 'Analyze Stock Performance',
            content: 'Before placing an order, review the stock\'s performance data. Check the price chart, recent news, key ratios, and analyst recommendations. This information will help you make an informed decision about whether to buy or sell the stock.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Stock analysis page showing performance metrics and charts'
              }
            ]
          },
          {
            title: 'Place Your Order',
            content: 'Click the "Trade" or "Buy" button on the stock detail page. Select your order type (Market or Limit), enter the quantity of shares you want to purchase, and review the estimated total cost including fees. For limit orders, specify your desired price.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Order placement form showing order types and quantity input'
              }
            ]
          },
          {
            title: 'Confirm and Submit',
            content: 'Review all order details carefully before submission. Confirm that you have sufficient funds in your account to cover the purchase plus fees. Click "Submit Order" to finalize your transaction. You\'ll receive a confirmation message and the order will appear in your "Open Orders" until executed.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'Order confirmation process and tracking your order status'
              }
            ]
          }
        ]
      },
      {
        id: 'order-types',
        title: 'Understanding Order Types',
        description: 'Learn about different order types and when to use them',
        steps: [
          {
            title: 'Market Orders',
            content: 'Market orders are executed immediately at the best available current price. Use market orders when you want to ensure your order is filled quickly and price precision is less important than execution speed. Be aware that the execution price may differ slightly from the quoted price, especially for volatile stocks.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Market order placement screen'
              }
            ]
          },
          {
            title: 'Limit Orders',
            content: 'Limit orders allow you to set a specific price at which you\'re willing to buy or sell. Your order will only execute if the stock reaches your specified price or better. Use limit orders when you have a target price in mind and are willing to wait for that price to be reached.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Limit order setup with price specification'
              }
            ]
          },
          {
            title: 'Stop Orders',
            content: 'Stop orders become market orders when a stock reaches a specified price (the stop price). Use stop orders to limit potential losses or protect profits on existing positions. Stop orders are particularly useful for managing risk in volatile markets.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Stop order configuration screen'
              }
            ]
          },
          {
            title: 'Day vs. Good Till Canceled (GTC) Orders',
            content: 'Day orders expire at the end of the trading day if not executed, while Good Till Canceled orders remain active until they are either executed or manually canceled. Choose the appropriate time-in-force based on your trading strategy and how long you want your order to remain active.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'How to set order durations and manage active orders'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'account-management',
    title: 'Account Management',
    description: 'Help with managing your account settings',
    iconName: 'FileText',
    guides: [
      {
        id: 'profile-settings',
        title: 'Managing Your Profile',
        description: 'Learn how to update your personal information and preferences',
        steps: [
          {
            title: 'Access Account Settings',
            content: 'Log into your HAMMA account and click on your profile icon in the top-right corner of the screen. Select "Account Settings" from the dropdown menu to access your profile management page.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Account settings menu location'
              }
            ]
          },
          {
            title: 'Update Personal Information',
            content: 'In the "Personal Information" section, you can update details such as your phone number, email address, and mailing address. Some information, like your name and date of birth, may require additional verification if changed.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Personal information edit form'
              }
            ]
          },
          {
            title: 'Manage Communication Preferences',
            content: 'Navigate to the "Notifications" tab to customize how you receive communications from HAMMA. You can choose which types of notifications you want to receive (market alerts, account updates, etc.) and your preferred delivery methods (email, SMS, push notifications).',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Notification preferences configuration screen'
              }
            ]
          },
          {
            title: 'Link Bank Accounts',
            content: 'To manage your funding and withdrawal options, go to the "Banking" section. Here you can add, remove, or update your linked bank accounts. Each new bank account may require verification before it can be used for transactions.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'How to link and verify a new bank account'
              }
            ]
          }
        ]
      },
      {
        id: 'tax-documents',
        title: 'Tax Documentation',
        description: 'Understanding and accessing your tax documents',
        steps: [
          {
            title: 'Available Tax Documents',
            content: 'HAMMA provides several types of tax documents to help you with your filing obligations. These include annual account statements, dividend and interest income reports, and capital gains summaries. These documents are available in your account after the end of each fiscal year.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Tax document selection screen'
              }
            ]
          },
          {
            title: 'Accessing Tax Documents',
            content: 'To access your tax documents, navigate to the "Documents" section in your account menu. Select the "Tax Documents" tab and choose the relevant tax year. You can view documents online or download them as PDF files for your records.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Tax documents library showing available years'
              }
            ]
          },
          {
            title: 'Understanding Capital Gains',
            content: 'The Capital Gains Report details all your realized gains and losses from stock transactions during the tax year. It includes information about the purchase date, sale date, cost basis, proceeds, and the resulting gain or loss for each transaction.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Sample capital gains report'
              }
            ]
          },
          {
            title: 'Dividend and Interest Income',
            content: 'The Dividend and Interest Income Report summarizes all dividend payments and interest earned on your account during the tax year. It categorizes income by type (qualified dividends, non-qualified dividends, interest) to help with proper tax reporting.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'How to interpret your dividend and interest income report'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Protecting your account and assets',
    iconName: 'Shield',
    guides: [
      {
        id: '2fa-setup',
        title: 'Setting Up Two-Factor Authentication',
        description: 'Enhance your account security with 2FA',
        steps: [
          {
            title: 'Access Security Settings',
            content: 'Log into your HAMMA account and navigate to "Account Settings." Select the "Security" tab to view all available security options. Two-factor authentication is a critical security feature that adds an extra layer of protection to your account.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Security settings page highlighting 2FA option'
              }
            ]
          },
          {
            title: 'Choose Authentication Method',
            content: 'HAMMA offers multiple 2FA methods. SMS Authentication sends a verification code to your registered phone number. Authenticator App requires you to install an app like Google Authenticator or Authy on your smartphone. Biometric Authentication may be available on supported devices.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: '2FA method selection screen'
              }
            ]
          },
          {
            title: 'Setup Authenticator App',
            content: 'If you choose the authenticator app method, you\'ll be shown a QR code. Open your authenticator app, scan the QR code, and enter the 6-digit verification code displayed in your app to complete the setup. This links your authenticator app to your HAMMA account.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'QR code scanning screen for authenticator app setup'
              }
            ]
          },
          {
            title: 'Generate Backup Codes',
            content: 'It\'s essential to generate and safely store backup codes in case you lose access to your primary 2FA method. These one-time use codes will allow you to log in if your phone is lost or unavailable. Store these codes in a secure location separate from your login credentials.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'How to generate and use backup codes'
              }
            ]
          }
        ]
      },
      {
        id: 'suspicious-activity',
        title: 'Detecting Suspicious Activity',
        description: 'Learn to identify and report suspicious account activity',
        steps: [
          {
            title: 'Understanding Security Alerts',
            content: 'HAMMA\'s security system continuously monitors your account for unusual activity. You\'ll receive security alerts via email, SMS, or push notification when the system detects suspicious login attempts, unusual trading patterns, or unrecognized devices accessing your account.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Sample security alert notification'
              }
            ]
          },
          {
            title: 'Reviewing Account Activity',
            content: 'Regularly check your account activity log to monitor all actions taken on your account. Navigate to "Account Settings" > "Security" > "Activity Log" to view a chronological list of all logins, trading activities, and account changes with details like date, time, and IP address.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Account activity log screen'
              }
            ]
          },
          {
            title: 'Identifying Red Flags',
            content: 'Be alert for warning signs such as unrecognized transactions, failed login attempts, changes to your account settings that you didn\'t make, or emails about account activities you didn\'t perform. These could indicate that someone is attempting to compromise your account.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Security red flags illustration'
              }
            ]
          },
          {
            title: 'Reporting Suspicious Activity',
            content: 'If you detect any suspicious activity, immediately contact HAMMA\'s security team. Navigate to "Help & Support" > "Report Suspicious Activity" or call our dedicated security hotline at +234 800 123 4567. Our team will investigate the issue and help secure your account.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'How to report and respond to suspicious account activity'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Withdrawals',
    description: 'Managing your funds and withdrawals',
    iconName: 'Wallet',
    guides: [
      {
        id: 'withdrawal-process',
        title: 'Withdrawal Process',
        description: 'How to withdraw funds from your HAMMA account',
        steps: [
          {
            title: 'Access Withdrawal Page',
            content: 'Log into your HAMMA account and navigate to the "Wallet" section. Click on the "Withdraw" button to start the withdrawal process. Ensure that you have available funds in your account balance before proceeding.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Withdrawal section in the wallet dashboard'
              }
            ]
          },
          {
            title: 'Select Bank Account',
            content: 'Choose the registered bank account to which you want to withdraw funds. HAMMA only allows withdrawals to previously verified bank accounts in your name. If you need to add a new bank account, you\'ll need to complete the verification process first.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Bank account selection screen'
              }
            ]
          },
          {
            title: 'Enter Withdrawal Amount',
            content: 'Specify the amount you wish to withdraw. The minimum withdrawal amount is ₦1,000, and the maximum daily withdrawal limit is ₦5,000,000. The system will display any applicable fees, which typically range from 0.5% to 1% depending on the withdrawal amount and processing time.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Withdrawal amount entry form showing fees'
              }
            ]
          },
          {
            title: 'Confirm and Complete',
            content: 'Review all details carefully before confirming your withdrawal request. You may be required to enter your account password or a 2FA code as an additional security measure. Once confirmed, you\'ll receive a confirmation email with the transaction details and estimated processing time.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'Complete withdrawal process and verification steps'
              }
            ]
          }
        ]
      },
      {
        id: 'payment-methods',
        title: 'Payment Methods',
        description: 'Different ways to fund your HAMMA account',
        steps: [
          {
            title: 'Bank Transfer',
            content: 'Bank transfers are a secure way to fund your account. Navigate to "Wallet" > "Fund Account" > "Bank Transfer" to view HAMMA\'s banking details. Transfers typically reflect in your account within 1-3 hours during business days. Remember to include your unique reference code when making the transfer.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Bank transfer instructions screen'
              }
            ]
          },
          {
            title: 'Debit Card Payments',
            content: 'For instant funding, you can use your Nigerian debit card. Select "Debit Card" from the funding options, enter your card details, and complete the transaction. Card payments are processed immediately, and your account is credited instantly. We accept Visa, Mastercard, and Verve cards.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'Debit card payment form'
              }
            ]
          },
          {
            title: 'USSD Transfer',
            content: 'USSD transfers offer a convenient option if you don\'t have internet banking access. Select "USSD Transfer," choose your bank, and follow the displayed USSD code format. Complete the transaction on your phone, and your account will be credited once the payment is confirmed.',
            media: [
              {
                type: 'image',
                url: 'https://placehold.co/600x400/png',
                caption: 'USSD transfer instructions for different banks'
              }
            ]
          },
          {
            title: 'Mobile Money',
            content: 'HAMMA supports various mobile money platforms for funding your account. Select "Mobile Money," choose your preferred provider (e.g., Paga, OPay), and follow the prompts to complete the transaction. This method is useful for users without traditional banking access.',
            media: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                caption: 'Using mobile money services to fund your account'
              }
            ]
          }
        ]
      }
    ]
  }
];