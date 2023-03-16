import Head from 'next/head'


export default function Meta() {
  return (
    <Head>
      <meta name="robots" content={
        process.env.NODE_ENV !== 'production' ? "noindex, nofollow" : "index, follow"
      } />

      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="theme-color" content="#ffffff"></meta>

      <title>{process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
      <meta name="description" content={process.env.NEXT_PUBLIC_DEFAULT_META_DESCRIPTION} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )
}
