//import hook useState
import { useState } from "react";

//import router
import Router from "next/router";

//import layout
import { Layout } from "@/components/Layout";

//import axios
import axios from "axios";
import { Container } from "@mantine/core";

// import js-cookie
import Cookies from "js-cookie";

//fetch with "getServerSideProps"
export async function getServerSideProps({ params }: any) {
  //http request
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books/${params.id}`
  );
  const res = await req.data.data;

  return {
    props: {
      book: res, // <-- assign response
    },
  };
}

function BookEdit(props: any) {
  //destruct
  const { book } = props;

  //state
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState(book.title);
  const [writer, setWriter] = useState(book.writer);

  // get token
  const token = Cookies.get("token");

  //state validation
  const [validation, setValidation] = useState<{
    cover?: string;
    title?: string; 
    writer?: string;
  }>({});

  console.log(validation)

  //function "handleFileChange"
  const handleFileChange = (e: any) => {
    //define variable for get value cover data
    const coverData = e.target.files[0];

    //check validation file
    if (!coverData.type.match("image.*")) {
      //set state "image" to null
      setCover("");

      return;
    }

    //assign file to state "image"
    setCover(coverData);
  };

  //method "updatePost"
  const updatePost = async (e: any) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("cover", cover);
    formData.append("title", title);
    formData.append("writer", writer);
    formData.append("_method", "PUT");

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //send data to server
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books/${book.id}`,
        formData
      )
      .then(() => {
        //redirect
        Router.push("/admin/books");
      })
      .catch((error) => {
        //assign validation on state
        setValidation(error.response.data.errors);
      });
  };

  return (
    <Layout>
      <Container size={"xs"}>
        <form onSubmit={updatePost}>
          <div className="form-group">
            <label className="form-label fw-bold">Cover</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          {validation && validation.cover && (
            <div className="text text-danger mb-3">{validation.cover}</div>
          )}

          <div className="form-group">
            <label className="form-label fw-bold">Judul Buku</label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul buku"
            />
          </div>
          {validation && validation.title && (
            <div className="text text-danger mb-3">{validation.title}</div>
          )}

          <div className="form-group">
            <label className="form-label fw-bold">Penulis</label>
            <input
              className="form-control"
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              placeholder="Masukkan nama penulis"
            />
          </div>
          {validation && validation.writer && (
            <div className="text text-danger">{validation.writer}</div>
          )}

          <button className="btn btn-primary border-0 shadow-sm mt-3" type="submit">
            Update
          </button>
        </form>
      </Container>
    </Layout>
  );
}

export default BookEdit;
