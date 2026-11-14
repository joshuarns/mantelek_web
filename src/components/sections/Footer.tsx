import Image from "next/image";
import { brand, contact, footer, isExternal } from "@/content/home";
import { Button } from "../ui/Button";

export function Footer() {
  return (
    <footer className="footer theme-dark" data-nav-theme="dark">
      <div className="wrap footer__grid">
        <div className="footer__intro">
          <Image
            src={brand.logo.white}
            alt={brand.fullName}
            width={brand.logo.width}
            height={brand.logo.height}
            className="footer__logo"
          />
          <h2 className="heading-m">{footer.title}</h2>
          <Button href={footer.cta.href} variant="accent">
            {footer.cta.label}
          </Button>
        </div>

        <nav className="footer__col footer__col--menu">
          <p className="eyebrow footer__label">Menú</p>
          {footer.menu.map((l) => (
            <a key={l.label} href={l.href} className="footer__link" {...(isExternal(l.href) ? { target: "_blank", rel: "noreferrer" } : {})}>
              {l.label}
            </a>
          ))}
        </nav>

        <nav className="footer__col footer__col--rentals">
          <p className="eyebrow footer__label">Equipos en renta</p>
          {footer.rentals.map((l) => (
            <a key={l.label} href={l.href} className="footer__link" {...(isExternal(l.href) ? { target: "_blank", rel: "noreferrer" } : {})}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer__col footer__col--social">
          <p className="eyebrow footer__label">Síganos</p>
          {footer.socials.map((l) => (
            <a key={l.label} href={l.href} className="footer__link" target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>

        <div className="footer__contact">
          <p className="eyebrow footer__label">¡Llame ahora!</p>
          <a href={contact.phone.href} className="heading-l footer__phone">
            {contact.phone.label}
          </a>
          <div className="footer__contact-list">
            <a href={contact.phoneAlt.href} className="footer__link">
              Tel. {contact.phoneAlt.label}
            </a>
            <a href={contact.whatsapp.href} className="footer__link" target="_blank" rel="noreferrer">
              WhatsApp {contact.whatsapp.label}
            </a>
            <a href={contact.email.href} className="footer__link">
              {contact.email.label}
            </a>
          </div>
        </div>

        <address className="footer__address">
          <p className="eyebrow footer__label">Ubícanos</p>
          {contact.address.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>
      </div>

      <div className="wrap footer__bottom">
        <span>
          © {footer.year} {brand.fullName}. Todos los derechos reservados.
        </span>
        <div className="footer__legal">
          {footer.legal.map((l) => (
            <a key={l.label} href={l.href} className="footer__link" {...(isExternal(l.href) ? { target: "_blank", rel: "noreferrer" } : {})}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
