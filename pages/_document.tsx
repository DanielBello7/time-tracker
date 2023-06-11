import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Time Tracker App</title>
                <meta charSet='utf-8' />
                <link rel="icon" type="image/svg+xml" href="/next.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <body className='w-full h-screen bg-gray-800'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}