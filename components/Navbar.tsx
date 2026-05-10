'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '智慧集锦', path: '/collections' },
    { name: '原子技能', path: '/skills' },
    { name: '关于项目', path: '/about' },
  ];

  return (
    <nav className="nav-bar container">
      <Link href="/" className="nav-brand">
        <Logo size={44} />
        <h1 className="nav-logo-text">Skill4Human</h1>
      </Link>

      {/* Desktop Links */}
      <div className="nav-links desktop-only">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path} 
            className={`nav-item ${pathname === link.path ? 'active' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle mobile-only" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="mobile-menu-links">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className={`mobile-nav-item ${pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
