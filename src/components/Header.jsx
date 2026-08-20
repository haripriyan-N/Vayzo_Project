export default function Header({ title, breadcrumb = "Dashboard" }) {
  return <header className="reference-header users-header"><div className="header-title"><button type="button" aria-label="Toggle menu">☰</button><div><strong>{title}</strong><small>{breadcrumb}　›　{title}</small></div></div><div className="header-tools"><span className="badge-icon">♧<b>6</b></span><span className="badge-icon">♧<b>3</b></span><div className="admin-profile"><i>PM</i><span><strong>Prathap M</strong><small>Admin</small></span>⌄</div></div></header>;
}
