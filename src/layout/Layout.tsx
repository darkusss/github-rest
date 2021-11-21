import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
