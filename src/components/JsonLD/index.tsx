import Head from 'next/head';

export interface JsonLDProps {
  object: Partial<Record<string, string>>;
}

export const JsonLD = (props: JsonLDProps) => {
  const { object } = props;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(object) }}
      />
    </Head>
  );
};
