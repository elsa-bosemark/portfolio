export default function PaperTags({ tags, label }: { tags: string[]; label: string }) {
  return <ul className="paper-tags" aria-label={label}>{tags.map(tag => <li key={tag}>#{tag}</li>)}</ul>;
}
