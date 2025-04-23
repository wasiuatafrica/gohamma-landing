import React from "react";
import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux"; // Assuming react-redux is set up - Removed unused import

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
// import "./profile.css"; // Import the copied CSS - Removed potentially leftover CSS

// import AccountInformation from "@/components/settings/AccountInformation/AccountInformation"; // Removed missing component import


const Settings = () => {
  const { pathname } = useLocation();
  // Assuming a similar Redux state structure exists or will be created
  // const profile = useSelector((state: any) => state.page?.profile); // Add appropriate type for state
  const profile = true; // Temporary value for layout purposes

  console.log("Current pathname:", pathname);
  // console.log("Profile state:", profile);

  // Define data for tabs - placeholder content for now
  const data = [
    // {
    //   id: 1,
    //   name: "Profile",
    //   path: "/profile", // Adjust path based on DesignMockup routing if needed
    //   content: <MyAccount />, // Removed usage of missing component
    // },
    // { // Removed usage of missing component
    //   id: 2,
    //   name: "Account Information",
    //   path: "/accountinformation", // Adjust path
    //   content: <AccountInformation />,
    // },
    // {
    //   id: 3,
    //   name: "Privacy & Security",
    //   path: "/privacysecurity", // Adjust path
    //   content: <PrivacySecurity />, // Removed usage of missing component
    // },
    // {
    //   id: 4,
    //   name: "Help & Support",
    //   path: "/helpsupport", // Adjust path
    //   content: <HelpSupport />, // Removed usage of missing component
    // },
    // {
    //   id: 5,
    //   name: "Payment",
    //   path: "/payment", // Adjust path
    //   content: <Payment />, // Removed usage of missing component
    // },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Original profile.js content structure adapted */}
          {/* Consider adding a title like "Settings" or "Profile Settings" */}
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
          <div className="rounded-card-container"> {/* Ensure styles for this class are available */}
            <div className="rounded-card"> {/* Ensure styles for this class are available */}
              {/* Using the actual TabsComponent - Removed usage of missing component */}
              {/* <TabsComponent data={data} /> */}
              {/* Placeholder content where TabsComponent was */}
              <div>Tabs Component Placeholder - Content goes here</div>

              {/* Mobile specific logic from original file - might need review/adaptation. Needs Link from react-router-dom */}
              {/* {profile && pathname === "/profile" && (
                <div className="accountSettingDiv mt-8 lg:hidden">
                  <div className="accountSettingHeading border-b pb-2 mb-4">
                    <h3 className="text-xl font-semibold">Account Setting</h3>
                  </div>
                  <div className="accountSettingCards space-y-2">
                    {data.map(item => (
                      <Link
                        key={item.id}
                        // onClick={handleProfileActiveOnMobile} // Requires dispatch/redux setup
                        to={item.path} // Ensure routing is set up
                        className="accountSettingCard flex justify-between items-center p-3 border rounded hover:bg-muted"
                      >
                        <p>{item.name}</p>
                        {/* <IoIosArrowForward /> Placeholder for icon }
                        <span>></span>
                      </Link>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
