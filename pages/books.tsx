/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
 import Image from "next/image";
import { Inter } from "next/font/google";
import { HeaderSimple } from "@/components/HeaderSimple";
import { FooterSocial } from "@/components/FooterSocial";
import { Card, Container, Flex, Group, Pagination, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books`
  );
  const res = await req.data.data;

  return {
    props: {
      books: res.data,
      totalPages: res.last_page,
    },
  };
}

export default function Books(props: any) {
  const { books: initialBooks, totalPages } = props;
  const [books, setBooks] = useState(initialBooks);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Memindahkan posisi ke atas halaman
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books?page=${currentPage}`
        );
        const newData = response.data.data;
        setBooks(newData.data); // Menyimpan data baru dalam state books
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>bukunia | All Books</title>
      </Head>

      <HeaderSimple />

      <Container mt={86} size={"xl"}>
        <Group gap="xl" w={"100%"} justify="center" align="center">
          {books.map((book: any, index: number) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card shadow="md" style={{ maxWidth: 400 }}>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BACKEND}${book.cover}`}
                  alt={book.title}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                <Flex direction="column" mt={'sm'}>
                  <Text>{book.title}</Text>
                  <Text size="sm" c="gray">
                    {book.writer}
                  </Text>
                </Flex>
              </Card>
            </motion.div>
          ))}
        </Group>

        <Group w={"100%"} my={40}>
          {totalPages >= 0 && (
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={handlePageChange}
              withControls
              withEdges
              mx={"auto"}
            />
          )}
        </Group>
      </Container>

      <FooterSocial />
    </>
  );
}
