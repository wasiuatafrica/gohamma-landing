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
		description: '',
		iconName: 'BookOpen',
		guides: [
			{
				id: 'account-setup',
				title: 'Account Setup',
				description: '',
				steps: [
					{
						title: 'Visit the Registration Page: ',
						content: 'Start by navigating to the Gohamma.com website and clicking on the "Register" or "Sign Up" button to begin the process.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757695841/Screenshot_2025-09-12_174833_pyktqu.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Fill Out Your Details:',
						content: 'Complete the registration form with your personal information, including your full name, a valid email address, a strong password, and ensure to check the box that you accept the terms and you are 18 years or above.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757875040/Screenshot_2025-09-14_193607_q5n0au.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Verify Your Email:',
						content: 'Check your inbox for a one-time password (OTP) sent by Gohamma.com. Enter this code on the verification page to confirm your email address.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757875441/Screenshot_2025-09-14_194330_mdtbmj.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Access Your Dashboard:',
						content: 'After email verification, you will be automatically logged in and redirected to your trading dashboard.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757875806/Screenshot_2025-09-14_194940_mx4kpr.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Navigate to Profile:',
						content: 'Click on the profile icon, typically located in the top-left corner, and select "Profile" from the menu.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757876206/Screenshot_2025-09-14_195548_m1uxjy.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Complete Account Information:',
						content: 'In your profile, click on "Account Information" to proceed with the verification process.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757876534/Screenshot_2025-09-14_200146_jdj1ic.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Upload Proof of ID:',
						content: 'On the Account Information page, click on "Proof of ID" to upload a valid form of identification.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757877297/Screenshot_2025-09-14_201001_fdhwjg.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Upload Your Image:',
						content: 'Click on document icon to select and upload an image of your valid ID.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757877297/Screenshot_2025-09-14_201022_dkpwuj.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Save:',
						content: 'Click the "Save" button to submit the document.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757877298/Screenshot_2025-09-14_201115_nbfvo7.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Repeat for Other Documents:',
						content: 'Repeat the same process for "Proof of Address" (utility bill) and "Upload a photograph" to complete the verification.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757877826/Screenshot_2025-09-14_201400_hq4fm0.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Navigate to Payments:',
						content: 'In your profile, find and click on the "Payment" section to add your banking details.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757878049/Screenshot_2025-09-14_202448_jcr7iy.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Add Bank Details:',
						content: 'Select your bank from the list and enter your account number.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757878049/Screenshot_2025-09-14_202523_cxmigl.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Save:',
						content: 'Click "Save" to store your bank information securely.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757878049/Screenshot_2025-09-14_202557_faawsi.webp',
								caption: ''
							}
						]
					},
					{
						title: "You're All Set!:",
						content: 'Your account is now fully set up and verified, allowing you to begin trading and managing funds on the platform.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757878050/Screenshot_2025-09-14_202656_fm9ylt.webp',
								caption: ''
							}
						]
					}
				]
			},
			// {
			// 	id: 'funding-account',
			// 	title: 'Funding Your Account',
			// 	description: 'Learn about the different ways to fund your trading account',
			// 	steps: [
			// 		{
			// 			title: 'Access Fund Account Section',
			// 			content: 'Log into your HAMMA account and navigate to the "Wallet" section from the main dashboard. Click on "Fund Account" to see all available funding options. The minimum deposit amount is ₦5,000.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Fund account page showing different payment options'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Bank Transfer',
			// 			content: "For bank transfers, you'll be provided with HAMMA's account details. Make the transfer from your registered bank account, and include your unique reference code in the transfer description. Funds typically reflect within 1-3 hours during business days.",
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Bank transfer details screen with account information'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Card Payment',
			// 			content: 'For instant funding, you can use your debit card. Select "Card Payment," enter your card details, and follow the prompts to complete the transaction. Card payments are processed instantly, and your account will be credited immediately.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Card payment screen with secure input fields'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Verify Your Deposit',
			// 			content: "After making a deposit, check your transaction history to confirm that the funds have been credited to your account. You'll also receive an email notification confirming your deposit. If you encounter any issues, contact customer support with your transaction reference.",
			// 			media: [
			// 				{
			// 					type: 'video',
			// 					url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			// 					caption: 'How to verify your deposit and check transaction history'
			// 				}
			// 			]
			// 		}
			// 	]
			// },
			// {
			// 	id: 'navigating-platform',
			// 	title: 'Navigating the Platform',
			// 	description: 'Learn how to navigate the HAMMA trading platform effectively',
			// 	steps: [
			// 		{
			// 			title: 'Dashboard Overview',
			// 			content: 'The dashboard is your central hub, showing your portfolio summary, market overview, watchlist, and recent transactions. From here, you can quickly access all platform features through the main navigation menu.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'HAMMA dashboard with labeled sections'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Market Data Section',
			// 			content: 'The Market Data section provides real-time information on stock prices, indices, and market trends. You can view stock details, historical charts, and company information to make informed investment decisions.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Market data screen showing stock listings and indices'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Portfolio Management',
			// 			content: 'The Portfolio section displays all your investments, current market value, profit/loss, and performance metrics. You can track individual stock performance and view detailed transaction history.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Portfolio management screen with asset breakdown'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Setting Up Alerts',
			// 			content: 'Create customized price alerts to stay informed about market movements. Navigate to the Alerts section, select a stock, set your desired price threshold, and choose your notification method (email, SMS, or push notification).',
			// 			media: [
			// 				{
			// 					type: 'video',
			// 					url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			// 					caption: 'How to set up and manage stock price alerts'
			// 				}
			// 			]
			// 		}
			// 	]
			// }
		]
	},
        {
		id: 'trading-account-setup',
		title: 'Trading Account Setup',
		description: '',
		iconName: 'FileText',
		guides: [
			{
				id: 'choosing-the-right-account',
				title: 'Choosing the Right Account',
				description: '',
				steps: [
					{
						title: 'Log In:',
						content: 'Access your Gohamma.com dashboard.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880372/Screenshot_2025-09-14_205913_fnx5g7.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Navigate to Accounts:',
						content: 'Click on the "Accounts" section located in the sidebar or menu bar.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880371/Screenshot_2025-09-14_210019_hrh9yr.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Click on Add New Account:',
						content: 'Select this option to create a new trading account.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880372/Screenshot_2025-09-14_210054_y5pjtb.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Name and Select Account Type:',
						content: 'Give your new account a descriptive name (e.g., "My Stocks Portfolio") and choose the account type that best suits your needs',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880373/Screenshot_2025-09-14_210328_mziica.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Create Account:',
						content: 'Click the "Create Account" button to finalize the setup of your trading account.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880373/Screenshot_2025-09-14_210410_kwsds4.webp',
								caption: ''
							}
						]
					}
				]
			},
			// {
			// 	id: 'tax-documents',
			// 	title: 'Tax Documentation',
			// 	description: 'Understanding and accessing your tax documents',
			// 	steps: [
			// 		{
			// 			title: 'Available Tax Documents',
			// 			content: 'HAMMA provides several types of tax documents to help you with your filing obligations. These include annual account statements, dividend and interest income reports, and capital gains summaries. These documents are available in your account after the end of each fiscal year.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Tax document selection screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Accessing Tax Documents',
			// 			content: 'To access your tax documents, navigate to the "Documents" section in your account menu. Select the "Tax Documents" tab and choose the relevant tax year. You can view documents online or download them as PDF files for your records.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Tax documents library showing available years'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Understanding Capital Gains',
			// 			content: 'The Capital Gains Report details all your realized gains and losses from stock transactions during the tax year. It includes information about the purchase date, sale date, cost basis, proceeds, and the resulting gain or loss for each transaction.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Sample capital gains report'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Dividend and Interest Income',
			// 			content: 'The Dividend and Interest Income Report summarizes all dividend payments and interest earned on your account during the tax year. It categorizes income by type (qualified dividends, non-qualified dividends, interest) to help with proper tax reporting.',
			// 			media: [
			// 				{
			// 					type: 'video',
			// 					url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			// 					caption: 'How to interpret your dividend and interest income report'
			// 				}
			// 			]
			// 		}
			// 	]
			// }
		]
	},
	{
		id: 'trading',
		title: 'Trading Guide: How to Place a Buy or Sell Trade',
		description: '',
		iconName: 'BarChart3',
		guides: [
			{
				id: 'how-to-place-a-buy-or-sell-trade',
				title: 'How to Place a Buy or Sell Trade',
				description: '',
				steps: [
					{
						title: 'Log In to Your Account:',
						content: 'Ensure you are logged into your dashboard.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880372/Screenshot_2025-09-14_205913_fnx5g7.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Navigate to Market:',
						content: 'Use the search bar to find the specific Nigerian stock you wish to trade.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880371/Screenshot_2025-09-14_210019_hrh9yr.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Search for the Stock:',
						content: 'Use the search bar to find the specific Nigerian stock you wish to trade.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757882150/Screenshot_2025-09-14_213127_rjfnei.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Initiate a Trade:',
						content: 'Click the Buy or Sell button depending on your trading decision.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757882150/Screenshot_2025-09-14_213127_rjfnei.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Set Trade Parameters:',
						content: 'A trade order window will appear. Here, you must set your desired Lot Size, Order type (Market Price or Limit Price), Stop Loss (SL), Take Profit (TP), etc.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757882150/Screenshot_2025-09-14_213344_zuianc.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Click the Buy or Sell Button:',
						content: 'Confirm your parameters and click the appropriate button to place the order.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757882150/Screenshot_2025-09-14_213344_zuianc.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Review and Confirm:',
						content: 'A final pop-up will show you a summary of your order. Review all the details and click "Confirm" to finalize the trade.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757917758/Screenshot_2025-09-14_213413_grxdem.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Congratulation:',
						content: 'Yes! You have successfully placed your first trade. ',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757882151/Screenshot_2025-09-14_213438_ltkxeg.webp',
								caption: ''
							}
						]
					},
					
				]
			},
			// {
			// 	id: 'order-types',
			// 	title: 'Understanding Order Types',
			// 	description: 'Learn about different order types and when to use them',
			// 	steps: [
			// 		{
			// 			title: 'Market Orders',
			// 			content: 'Market orders are executed immediately at the best available current price. Use market orders when you want to ensure your order is filled quickly and price precision is less important than execution speed. Be aware that the execution price may differ slightly from the quoted price, especially for volatile stocks.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Market order placement screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Limit Orders',
			// 			content: "Limit orders allow you to set a specific price at which you're willing to buy or sell. Your order will only execute if the stock reaches your specified price or better. Use limit orders when you have a target price in mind and are willing to wait for that price to be reached.",
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Limit order setup with price specification'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Stop Orders',
			// 			content: 'Stop orders become market orders when a stock reaches a specified price (the stop price). Use stop orders to limit potential losses or protect profits on existing positions. Stop orders are particularly useful for managing risk in volatile markets.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Stop order configuration screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Day vs. Good Till Canceled (GTC) Orders',
			// 			content: 'Day orders expire at the end of the trading day if not executed, while Good Till Canceled orders remain active until they are either executed or manually canceled. Choose the appropriate time-in-force based on your trading strategy and how long you want your order to remain active.',
			// 			media: [
			// 				{
			// 					type: 'video',
			// 					url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			// 					caption: 'How to set order durations and manage active orders'
			// 				}
			// 			]
			// 		}
			// 	]
			// }
		]
	},
	{
		id: 'price-alerts',
		title: 'Trading Guide: How to Set a Price Alert',
		description: '',
		iconName: 'BarChart3',
		guides: [
			{
				id: 'how-to-set-a-price-alert',
				title: 'How to Set a Price Alert',
				description: '',
				steps: [
					{
						title: 'Log In:',
						content: 'Access your dashboard.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880372/Screenshot_2025-09-14_205913_fnx5g7.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Navigate to Alert:',
						content: 'Click on the "Alert" option in the sidebar menu.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880371/Screenshot_2025-09-14_210019_hrh9yr.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Fill Out the Form:',
						content: "Enter the Alert Name, define the Condition (e.g., 'price of MTNNG crosses below a specific price'), specify the Price Level, and choose the alert's Schedule ('once' or 'repetitive').",
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757918782/Screenshot_2025-09-15_074122_hv8ges.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Save Alert:',
						content: 'Click the "Proceed" button to set the alert and activate it.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757918570/Screenshot_2025-09-15_074159_ke4ojt.webp',
								caption: ''
							}
						]
					},
					
					
				]
			},
			// {
			// 	id: 'order-types',
			// 	title: 'Understanding Order Types',
			// 	description: 'Learn about different order types and when to use them',
			// 	steps: [
			// 		{
			// 			title: 'Market Orders',
			// 			content: 'Market orders are executed immediately at the best available current price. Use market orders when you want to ensure your order is filled quickly and price precision is less important than execution speed. Be aware that the execution price may differ slightly from the quoted price, especially for volatile stocks.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Market order placement screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Limit Orders',
			// 			content: "Limit orders allow you to set a specific price at which you're willing to buy or sell. Your order will only execute if the stock reaches your specified price or better. Use limit orders when you have a target price in mind and are willing to wait for that price to be reached.",
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Limit order setup with price specification'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Stop Orders',
			// 			content: 'Stop orders become market orders when a stock reaches a specified price (the stop price). Use stop orders to limit potential losses or protect profits on existing positions. Stop orders are particularly useful for managing risk in volatile markets.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Stop order configuration screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Day vs. Good Till Canceled (GTC) Orders',
			// 			content: 'Day orders expire at the end of the trading day if not executed, while Good Till Canceled orders remain active until they are either executed or manually canceled. Choose the appropriate time-in-force based on your trading strategy and how long you want your order to remain active.',
			// 			media: [
			// 				{
			// 					type: 'video',
			// 					url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			// 					caption: 'How to set order durations and manage active orders'
			// 				}
			// 			]
			// 		}
			// 	]
			// }
		]
	},
	{
		id: 'open-positions',
		title: 'Trading Guide: How to Manage Open Positions',
		description: '',
		iconName: 'BarChart3',
		guides: [
			{
				id: 'how-to-manage-open-positions',
				title: 'How to Manage Open Positions',
				description: '',
				steps: [
					{
						title: 'Log In:',
						content: 'Access your dashboard.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880372/Screenshot_2025-09-14_205913_fnx5g7.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Navigate to Positions:',
						content: 'Click on the "Positions" option in the sidebar menu.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880371/Screenshot_2025-09-14_210019_hrh9yr.webp',
								caption: ''
							}
						]
					},
					{
						title: 'View and Filter Positions:',
						content: 'See a detailed list of all your trades. Use the search bar or filters to sort by status (e.g., "opened," "pending," "closed").',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757919476/Screenshot_2025-09-15_075611_e85sha.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Take Action:',
						content: 'In the "Action" column, you can either Close Position to exit a trade or Modify to adjust your SL and TP levels.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757919476/Screenshot_2025-09-15_075719_msi3r8.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Export Trading History:',
						content: 'Use the export buttons to download your trading history for personal records and analysis.',
						media: [
							// {
							// 	type: 'image',
							// 	url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757919476/Screenshot_2025-09-15_075719_msi3r8.webp',
							// 	caption: ''
							// }
						]
					},
					
					
				]
			},
			// {
			// 	id: 'order-types',
			// 	title: 'Understanding Order Types',
			// 	description: 'Learn about different order types and when to use them',
			// 	steps: [
			// 		{
			// 			title: 'Market Orders',
			// 			content: 'Market orders are executed immediately at the best available current price. Use market orders when you want to ensure your order is filled quickly and price precision is less important than execution speed. Be aware that the execution price may differ slightly from the quoted price, especially for volatile stocks.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Market order placement screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Limit Orders',
			// 			content: "Limit orders allow you to set a specific price at which you're willing to buy or sell. Your order will only execute if the stock reaches your specified price or better. Use limit orders when you have a target price in mind and are willing to wait for that price to be reached.",
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Limit order setup with price specification'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Stop Orders',
			// 			content: 'Stop orders become market orders when a stock reaches a specified price (the stop price). Use stop orders to limit potential losses or protect profits on existing positions. Stop orders are particularly useful for managing risk in volatile markets.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Stop order configuration screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Day vs. Good Till Canceled (GTC) Orders',
			// 			content: 'Day orders expire at the end of the trading day if not executed, while Good Till Canceled orders remain active until they are either executed or manually canceled. Choose the appropriate time-in-force based on your trading strategy and how long you want your order to remain active.',
			// 			media: [
			// 				{
			// 					type: 'video',
			// 					url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			// 					caption: 'How to set order durations and manage active orders'
			// 				}
			// 			]
			// 		}
			// 	]
			// }
		]
	},
	{
		id: 'ai-generated-signals',
		title: 'Trading Guide: How to Use AI-Generated Signals',
		description: '',
		iconName: 'BarChart3',
		guides: [
			{
				id: 'how-to-use-ai-generated-signals',
				title: 'How to Use AI-Generated Signals',
				description: '',
				steps: [
					{
						title: 'Log In:',
						content: 'Access your dashboard.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757880372/Screenshot_2025-09-14_205913_fnx5g7.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Navigate to Market:',
						content: 'Go to the "Market" section and click on the "AI" tab.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757930424/Screenshot_2025-09-15_082401_ayeqcm.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Set Up Your AI Profile:',
						content: 'Answer the questions to define your trading profile, including Trading Frequency, Preferred Asset Type, and Risk Tolerance.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757930424/Screenshot_2025-09-15_084044_brxwml.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Purchase the Subscription:',
						content: 'Pay the subscription fee to unlock access to the AI signals or click on “Continue Free Trial” to see AI signals for the next 14 days.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/v1757930425/Screenshot_2025-09-15_095718_r0cyvd.png',
								caption: ''
							}
						]
					},
					{
						title: 'Access the Signals:',
						content: 'Upon activation, you will see a list of AI-suggested trades, each with its confidence level measured in percentage.',
						media: [
							// {
							// 	type: 'image',
							// 	url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757919476/Screenshot_2025-09-15_075719_msi3r8.webp',
							// 	caption: ''
							// }
						]
					},
					{
						title: 'Execute the Trade',
						content: 'Click the Long or Short button next to a signal you wish to follow.',
						media: [
							// {
							// 	type: 'image',
							// 	url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757919476/Screenshot_2025-09-15_075719_msi3r8.webp',
							// 	caption: ''
							// }
						]
					},
					{
						title: 'Set Parameters:',
						content: 'A form will appear, allowing you to set the Lot Size, TP, and SL.',
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757931938/Screenshot_2025-09-15_105921_peicch.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Review and Proceed:',
						content: "A final review screen will appear. Confirm the details and click 'Proceed' to place the trade based on the AI's recommendation.",
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757917758/Screenshot_2025-09-14_213413_grxdem.webp',
								caption: ''
							}
						]
					},
					{
						title: 'Congratulations:',
						content: "Yes! You have successfully placed a trade based on AI recommendation.",
						media: [
							{
								type: 'image',
								url: 'https://res.cloudinary.com/ddlupbcws/image/upload/q_auto/v1757882151/Screenshot_2025-09-14_213438_ltkxeg.webp',
								caption: ''
							}
						]
					},
					
					
				]
			},
			// {
			// 	id: 'order-types',
			// 	title: 'Understanding Order Types',
			// 	description: 'Learn about different order types and when to use them',
			// 	steps: [
			// 		{
			// 			title: 'Market Orders',
			// 			content: 'Market orders are executed immediately at the best available current price. Use market orders when you want to ensure your order is filled quickly and price precision is less important than execution speed. Be aware that the execution price may differ slightly from the quoted price, especially for volatile stocks.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Market order placement screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Limit Orders',
			// 			content: "Limit orders allow you to set a specific price at which you're willing to buy or sell. Your order will only execute if the stock reaches your specified price or better. Use limit orders when you have a target price in mind and are willing to wait for that price to be reached.",
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Limit order setup with price specification'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Stop Orders',
			// 			content: 'Stop orders become market orders when a stock reaches a specified price (the stop price). Use stop orders to limit potential losses or protect profits on existing positions. Stop orders are particularly useful for managing risk in volatile markets.',
			// 			media: [
			// 				{
			// 					type: 'image',
			// 					url: 'https://placehold.co/600x400/png',
			// 					caption: 'Stop order configuration screen'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			title: 'Day vs. Good Till Canceled (GTC) Orders',
			// 			content: 'Day orders expire at the end of the trading day if not executed, while Good Till Canceled orders remain active until they are either executed or manually canceled. Choose the appropriate time-in-force based on your trading strategy and how long you want your order to remain active.',
			// 			media: [
			// 				{
			// 					type: 'video',
			// 					url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			// 					caption: 'How to set order durations and manage active orders'
			// 				}
			// 			]
			// 		}
			// 	]
			// }
		]
	},
	
	// {
	// 	id: 'security',
	// 	title: 'Security',
	// 	description: 'Protecting your account and assets',
	// 	iconName: 'Shield',
	// 	guides: [
	// 		{
	// 			id: '2fa-setup',
	// 			title: 'Setting Up Two-Factor Authentication',
	// 			description: 'Enhance your account security with 2FA',
	// 			steps: [
	// 				{
	// 					title: 'Access Security Settings',
	// 					content: 'Log into your HAMMA account and navigate to "Account Settings." Select the "Security" tab to view all available security options. Two-factor authentication is a critical security feature that adds an extra layer of protection to your account.',
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Security settings page highlighting 2FA option'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Choose Authentication Method',
	// 					content: 'HAMMA offers multiple 2FA methods. SMS Authentication sends a verification code to your registered phone number. Authenticator App requires you to install an app like Google Authenticator or Authy on your smartphone. Biometric Authentication may be available on supported devices.',
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: '2FA method selection screen'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Setup Authenticator App',
	// 					content: "If you choose the authenticator app method, you'll be shown a QR code. Open your authenticator app, scan the QR code, and enter the 6-digit verification code displayed in your app to complete the setup. This links your authenticator app to your HAMMA account.",
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'QR code scanning screen for authenticator app setup'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Generate Backup Codes',
	// 					content: "It's essential to generate and safely store backup codes in case you lose access to your primary 2FA method. These one-time use codes will allow you to log in if your phone is lost or unavailable. Store these codes in a secure location separate from your login credentials.",
	// 					media: [
	// 						{
	// 							type: 'video',
	// 							url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
	// 							caption: 'How to generate and use backup codes'
	// 						}
	// 					]
	// 				}
	// 			]
	// 		},
	// 		{
	// 			id: 'suspicious-activity',
	// 			title: 'Detecting Suspicious Activity',
	// 			description: 'Learn to identify and report suspicious account activity',
	// 			steps: [
	// 				{
	// 					title: 'Understanding Security Alerts',
	// 					content: "HAMMA's security system continuously monitors your account for unusual activity. You'll receive security alerts via email, SMS, or push notification when the system detects suspicious login attempts, unusual trading patterns, or unrecognized devices accessing your account.",
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Sample security alert notification'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Reviewing Account Activity',
	// 					content: 'Regularly check your account activity log to monitor all actions taken on your account. Navigate to "Account Settings" > "Security" > "Activity Log" to view a chronological list of all logins, trading activities, and account changes with details like date, time, and IP address.',
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Account activity log screen'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Identifying Red Flags',
	// 					content: "Be alert for warning signs such as unrecognized transactions, failed login attempts, changes to your account settings that you didn't make, or emails about account activities you didn't perform. These could indicate that someone is attempting to compromise your account.",
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Security red flags illustration'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Reporting Suspicious Activity',
	// 					content: 'If you detect any suspicious activity, immediately contact HAMMA\'s security team. Navigate to "Help & Support" > "Report Suspicious Activity" or call our dedicated security hotline at +234 800 123 4567. Our team will investigate the issue and help secure your account.',
	// 					media: [
	// 						{
	// 							type: 'video',
	// 							url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
	// 							caption: 'How to report and respond to suspicious account activity'
	// 						}
	// 					]
	// 				}
	// 			]
	// 		}
	// 	]
	// },
	// {
	// 	id: 'payments',
	// 	title: 'Payments & Withdrawals',
	// 	description: 'Managing your funds and withdrawals',
	// 	iconName: 'Wallet',
	// 	guides: [
	// 		{
	// 			id: 'withdrawal-process',
	// 			title: 'Withdrawal Process',
	// 			description: 'How to withdraw funds from your HAMMA account',
	// 			steps: [
	// 				{
	// 					title: 'Access Withdrawal Page',
	// 					content: 'Log into your HAMMA account and navigate to the "Wallet" section. Click on the "Withdraw" button to start the withdrawal process. Ensure that you have available funds in your account balance before proceeding.',
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Withdrawal section in the wallet dashboard'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Select Bank Account',
	// 					content: "Choose the registered bank account to which you want to withdraw funds. HAMMA only allows withdrawals to previously verified bank accounts in your name. If you need to add a new bank account, you'll need to complete the verification process first.",
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Bank account selection screen'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Enter Withdrawal Amount',
	// 					content: 'Specify the amount you wish to withdraw. The minimum withdrawal amount is ₦1,000, and the maximum daily withdrawal limit is ₦5,000,000. The system will display any applicable fees, which typically range from 0.5% to 1% depending on the withdrawal amount and processing time.',
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Withdrawal amount entry form showing fees'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Confirm and Complete',
	// 					content: "Review all details carefully before confirming your withdrawal request. You may be required to enter your account password or a 2FA code as an additional security measure. Once confirmed, you'll receive a confirmation email with the transaction details and estimated processing time.",
	// 					media: [
	// 						{
	// 							type: 'video',
	// 							url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
	// 							caption: 'Complete withdrawal process and verification steps'
	// 						}
	// 					]
	// 				}
	// 			]
	// 		},
	// 		{
	// 			id: 'payment-methods',
	// 			title: 'Payment Methods',
	// 			description: 'Different ways to fund your HAMMA account',
	// 			steps: [
	// 				{
	// 					title: 'Bank Transfer',
	// 					content: 'Bank transfers are a secure way to fund your account. Navigate to "Wallet" > "Fund Account" > "Bank Transfer" to view HAMMA\'s banking details. Transfers typically reflect in your account within 1-3 hours during business days. Remember to include your unique reference code when making the transfer.',
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Bank transfer instructions screen'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Debit Card Payments',
	// 					content: 'For instant funding, you can use your Nigerian debit card. Select "Debit Card" from the funding options, enter your card details, and complete the transaction. Card payments are processed immediately, and your account is credited instantly. We accept Visa, Mastercard, and Verve cards.',
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'Debit card payment form'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'USSD Transfer',
	// 					content: 'USSD transfers offer a convenient option if you don\'t have internet banking access. Select "USSD Transfer," choose your bank, and follow the displayed USSD code format. Complete the transaction on your phone, and your account will be credited once the payment is confirmed.',
	// 					media: [
	// 						{
	// 							type: 'image',
	// 							url: 'https://placehold.co/600x400/png',
	// 							caption: 'USSD transfer instructions for different banks'
	// 						}
	// 					]
	// 				},
	// 				{
	// 					title: 'Mobile Money',
	// 					content: 'HAMMA supports various mobile money platforms for funding your account. Select "Mobile Money," choose your preferred provider (e.g., Paga, OPay), and follow the prompts to complete the transaction. This method is useful for users without traditional banking access.',
	// 					media: [
	// 						{
	// 							type: 'video',
	// 							url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
	// 							caption: 'Using mobile money services to fund your account'
	// 						}
	// 					]
	// 				}
	// 			]
	// 		}
	// 	]
	// }
];
