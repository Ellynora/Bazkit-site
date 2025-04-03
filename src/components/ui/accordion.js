export function Accordion({ children }) {
  return <div>{children}</div>;
}

export function AccordionItem({ title, children }) {
  return (
    <details className="mb-2">
      <summary className="font-semibold">{title}</summary>
      <div className="mt-2 text-gray-700">{children}</div>
    </details>
  );
}
