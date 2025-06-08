import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            {/* You can add header, sidebar, footer here */}
            {children}
        </div>
    );
};

export default Layout;
