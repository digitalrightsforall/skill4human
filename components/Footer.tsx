import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="home-footer">
      <Logo size={48} />
      <h2 className="footer-brand">Skill4Human</h2>
      <p className="footer-creed">解构 AI 逻辑，增强人类本能。</p>
      <p className="copyright">© 2026 Skill4Human. Produced by <a href="https://putongren.org" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>普通人的数字权利</a></p>
    </footer>
  );
}
