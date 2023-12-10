/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import {
  Button,
  Center,
  Group,
  Loader,
  Pagination,
  Table,
  Title,
} from "@mantine/core";
import Link from "next/link";
import axios from "axios";

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

export default function AdminBooks(props: any) {
  const { books: initialBooks, totalPages } = props;
  const [books, setBooks] = useState(initialBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Menandakan bahwa data sedang dimuat

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books?page=${currentPage}`
        );
        const newData = response.data.data;
        setBooks(newData.data); // Menyimpan data baru dalam state books
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Memberhentikan indikator loading setelah selesai dimuat
      }
    };

    fetchData();
  }, [currentPage]);

  //function "deletePost"
  const deletePost = async (id: any) => {
    const confirmation = window.confirm("Apakah Anda yakin ingin menghapus?");

    // Jika pengguna mengkonfirmasi
    if (confirmation) {
      // sending
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books/${id}`
      );

      // Update state untuk memicu pembaruan UI
      setBooks((prevBooks: any) =>
        prevBooks.filter((book: any) => book.id !== id)
      );

      // Periksa apakah currentPage melampaui totalPages setelah penghapusan
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }
  };

  return (
    <>
      <Head>
        <title>bukunia | Admin - Daftar Buku</title>
      </Head>
      <Layout>
        <Group justify="space-between" mb={15}>
          <Title order={4}>Daftar Buku</Title>
          <Link href={"/admin/books/create"}>
            <Button size="xs">Add Book</Button>
          </Link>
        </Group>

        {loading ? (
          <Center h={500}>
            <Loader type="bars" color={"black"} size={"sm"} />
          </Center>
        ) : (
          <Table striped withTableBorder withColumnBorders>
            <Table.Thead fw={700}>
              <Table.Tr>
                <Table.Td>Cover</Table.Td>
                <Table.Td>Judul Buku</Table.Td>
                <Table.Td>Penulis</Table.Td>
                <Table.Td>Aksi</Table.Td>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {books.map((book: any) => (
                <Table.Tr key={book.id}>
                  <Table.Td className="text-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BACKEND}${book.cover}`}
                      width="56"
                      height="80"
                      style={{ borderRadius: 5 }}
                      alt={book.title}
                    />
                  </Table.Td>
                  <Table.Td>{book.title}</Table.Td>
                  <Table.Td style={{ wordBreak: "break-word" }}>
                    {book.writer}
                  </Table.Td>
                  <Table.Td className="text-center">
                    <Group gap={3}>
                      <Link href={`/admin/books/edit/${book.id}`}>
                        <Button size="xs">Edit</Button>
                      </Link>
                      <Button
                        size="xs"
                        color="red"
                        onClick={() => deletePost(book.id)}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}

        <Group w={"100%"} mt={20}>
          {totalPages >= 0 && (
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={handlePageChange}
              withControls
              withEdges
              ml={"auto"}
            />
          )}
        </Group>
      </Layout>
    </>
  );
}
