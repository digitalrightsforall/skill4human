import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="home-footer">
      <Logo size={48} />
      <h2 className="footer-brand">Skill4Human</h2>
      <p className="footer-creed">解构 AI 逻辑，增强人类本能。</p>
      <p className="copyright">© 2026 Skill4Human. Produced by 普通人的数字权利</p>
    </footer>
  );
}
