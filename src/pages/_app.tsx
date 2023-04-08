import 'tailwindcss/tailwind.css'

import React from 'react'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
    // suppress useLayoutEffect warnings when running outside a browser
    if (!process.browser) React.useLayoutEffect = React.useEffect

    return (
        <Component {...pageProps} />
    )
}
export default App
