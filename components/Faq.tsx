export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section className="wrap sect">
      <div className="eye">FAQ</div>
      <div style={{ marginTop: 20 }}>
        {items.map((item, i) => (
          <details className="faq" key={item.q} open={i === 0}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
