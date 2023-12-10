import { Layout } from "@/components/Layout";
import { Container } from "@mantine/core";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Create() {
  //state
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");

  //state validation
  const [validation, setValidation] = useState<{
    message?: string;
    cover?: string;
    title?: string;
    writer?: string;
  }>({});

  //get token
  const token = Cookies.get("token");

  //function "handleFileChange"
  const handleFileChange = (e: any) => {
    //define variable for get value image data
    const imageData = e.target.files[0];

    //check validation file
    if (!imageData.type.match("image.*")) {
      //set state "image" to null
      setCover("");

      return;
    }

    //assign file to state "image"
    setCover(imageData);
  };

  //method "storePost"
  const storePost = async (e: any) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("cover", cover);
    formData.append("title", title);
    formData.append("writer", writer);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //send data to server
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/books`, formData)
      .then(() => {
        //redirect
        Router.push("/admin/books");
      })
      .catch((error) => {
        //assign validation on state
        error.response.data.errors
          ? setValidation(error.response.data.errors)
          : setValidation(error.response.data);
      });
  };

  return (
    <Layout>
      <Container size={"xs"}>
        {validation.message && (
          <div className="alert alert-danger">{validation.message}</div>
        )}
        <form onSubmit={storePost}>
          <div className="form-group">
            <label className="form-label fw-bold">Cover</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          {validation.cover && (
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
          {validation.title && (
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
          {validation.writer && (
            <div className="text text-danger mb-3">{validation.writer}</div>
          )}

          <button
            className="btn btn-primary border-0 shadow-sm mt-3"
            type="submit"
          >
            Simpan
          </button>
        </form>
      </Container>
    </Layout>
  );
}
