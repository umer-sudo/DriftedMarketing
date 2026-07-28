/* Emits a JSON-LD block.

   JSON.stringify escapes nothing dangerous by default, so `<` is escaped explicitly:
   a `</script>` sequence inside any string would otherwise close the tag early. The
   data here is all authored, but the guard costs nothing and survives someone later
   feeding this from a CMS. */

export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
