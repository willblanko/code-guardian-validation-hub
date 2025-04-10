
import React, { ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-guardian-blue" />
              <div>
                <h1 className="text-xl font-bold text-guardian-blue">Code Guardian</h1>
                <p className="text-xs text-gray-500">Validação de Aplicações Java Obfuscadas</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Code Guardian. Todos os direitos reservados.</p>
            <p className="mt-1">Uma solução para validação automática de aplicações Java obfuscadas.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
