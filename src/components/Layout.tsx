import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="h-full">
            {children}
        </div>
    );
};

export default Layout;
