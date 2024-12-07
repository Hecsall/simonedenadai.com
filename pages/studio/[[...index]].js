import { NextStudio } from 'next-sanity/studio'
export {metadata, viewport} from 'next-sanity/studio'
import { StudioLayout, StudioProvider } from 'sanity'
import config from 'sanity.config'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle(({ theme }) => ({
  html: { backgroundColor: theme.sanity.color.base.bg },
  body: { fontSize: '16px !important' }
}))

export default function StudioPage() {
  return (
      <NextStudio config={config}>
        <StudioProvider config={config}>
          <GlobalStyle />
          <StudioLayout />
        </StudioProvider>
      </NextStudio>
  )
}