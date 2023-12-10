import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { HeaderSimple } from "@/components/HeaderSimple";
import { HeroImageRight } from "@/components/HeroImageRight";
import { FooterSocial } from "@/components/FooterSocial";
import { HeroBullets } from "@/components/HeroBullets";

const inter = Inter({ subsets: ["latin"] });

export default function Contact() {
    return (
        <>
            <Head>
                <title>bukunia | Contact</title>
            </Head>

            <HeaderSimple />
            <HeroBullets />
            <FooterSocial />
        </>
    );
}
