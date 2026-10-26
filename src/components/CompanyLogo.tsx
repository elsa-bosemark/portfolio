const logos: Record<string, { file: string; width: number; height: number }> = {
  OpenAI: { file: "openai-wordmark.png", width: 738, height: 414 },
  Amazon: { file: "amazon.svg", width: 603, height: 182 },
  Carta: { file: "carta.svg", width: 140, height: 20 },
  Focal: { file: "focal.svg", width: 181, height: 43 },
};

export default function CompanyLogo({ name }: { name: string }) {
  const logo = logos[name];
  return logo ? <img className={`paper-organization-logo paper-organization-logo--${name.toLowerCase()}`} src={`${import.meta.env.BASE_URL}${logo.file}`} alt={name} width={logo.width} height={logo.height} /> : <span>{name}</span>;
}
