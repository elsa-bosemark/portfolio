import CompanyLogo from "./CompanyLogo";

export default function ProjectIdentity({ name, role }: { name: string; role: string }) {
  return <div className="paper-project-identity">
    <p className="paper-role">{role}</p>
    <CompanyLogo name={name} />
  </div>;
}
