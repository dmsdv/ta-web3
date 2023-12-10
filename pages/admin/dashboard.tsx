import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Layout } from "@/components/Layout";
import { Card, SimpleGrid, Text, Title } from "@mantine/core";
import axios from "axios";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

//fetch with "getServerSideProps"
export async function getServerSideProps() {
  //http request
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books`
  );
  const res = await req.data.data;

  return {
    props: {
      totalBuku: res.total, // <-- assign response
    },
  };
}

export default function AdminDashboard(props: any) {
  const { totalBuku } = props;

  return (
    <>
      <Head>
        <title>bukunia | Admin - Dashboard</title>
      </Head>
      <Layout>
        <Title order={4} mb={20}>
          Dashboard
        </Title>

        <SimpleGrid
          cols={{ base: 2, sm: 3, lg: 4 }}
          spacing={{ base: "md", sm: "xl" }}
          verticalSpacing={{ base: "xl", sm: "xl" }}
        >
          <Link href="/admin/books" style={{ textDecoration: "none" }}>
            <Card
              withBorder
              radius="md"
              padding="xl"
              bg="var(--mantine-color-body)"
            >
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                Total Buku
              </Text>
              <Text fz="lg" fw={500}>
                {totalBuku}
              </Text>
            </Card>
          </Link>
        </SimpleGrid>
      </Layout>
    </>
  );
}
