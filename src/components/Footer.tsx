const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 py-16 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="text-2xl font-display text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            Alex Morgan
          </p>
          <p className="text-sm text-muted-foreground mt-1">Designer & Creative Strategist</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Dribbble
          </a>
          <a href="mailto:hello@alexmorgan.design" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
