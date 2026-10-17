export default function ProjectIdentity({ name, role }: { name: string; role: string }) {
  return <div className="paper-project-identity"><p className="paper-organization">{name}</p><p className="paper-role">{role}</p></div>;
}
