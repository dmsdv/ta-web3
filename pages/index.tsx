import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { HeaderSimple } from '@/components/HeaderSimple'
import { HeroImageRight } from '@/components/HeroImageRight'
import { FooterSocial } from '@/components/FooterSocial'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>bukunia | Home</title>
      </Head>

      <HeaderSimple />
      <HeroImageRight />
      <FooterSocial />
    </>
  )
}
