
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AiChatBot from '../AiChatBot';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <AiChatBot />
    </div>
  );
};

export default Layout;
