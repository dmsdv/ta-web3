import {
  AppShell,
  Avatar,
  Burger,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from "@/styles/Layout.module.css";
import { IconBook2, IconDashboard, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const data = [
  { link: "/admin/dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "/admin/books", label: "Books", icon: IconBook2 },
];

export function Layout({ children }: any) {
  const [opened, { toggle }] = useDisclosure();

  const [active, setActive] = useState("");
  const router = useRouter();

  //get token
  const token = Cookies.get("token");

  //state user
  const [user, setUser] = useState<{ username?: string; email?: string }>({});
  console.log(user);

  // Periksa apakah data pengguna sudah ada sebelum pemanggilan fetch data
  const isUserDataLoaded = Object.keys(user).length > 0;

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/books`)
      .then((response) => {
        //set response user to state
        setUser(response.data.auth);
      });
  };

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  //hook useEffect
  useEffect(() => {
    const fetchDataAndCheckToken = async () => {
      if (!token) {
        setIsUserLoggedIn(false);
        Router.push("/admin/login");
      } else {
        const decodedToken = decodeToken(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
          Cookies.remove("token");
          Router.push("/admin/login");
        } else {
          // Fetch data only if user data is not loaded
          if (!isUserDataLoaded) {
            await fetchData();
          }
          setIsUserLoggedIn(true);
        }
      }
    };

    fetchDataAndCheckToken();
  }); // Update useEffect dependencies

  //function logout
  const logoutHandler = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");

    if (confirmLogout) {
      // set axios header dengan type Authorization + Bearer token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // fetch Rest API
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`)
        .then(() => {
          // hapus token dari cookies
          Cookies.remove("token");

          // redirect halaman login
          Router.push("/admin/login");
        })
        .catch((error) => {
          // tangani kesalahan di sini
          console.error("Logout error:", error);

          // hapus token dari cookies meskipun ada kesalahan
          Cookies.remove("token");

          // redirect halaman login
          Router.push("/admin/login");
        });
    }
  };

  // Function to decode JWT token
  function decodeToken(token: string | null) {
    if (!token) {
      return null;
    }

    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = atob(tokenParts[1]);
    return JSON.parse(payload);
  }

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      {item.label}
    </Link>
  ));

  // Render only if the user is logged in
  if (!isUserLoggedIn) {
    return null;
  }

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className={classes.mainHeader} px={20}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title order={4}>Admin Dashboard</Title>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div className={classes.mainNavbar}>
          <Group className={classes.header}>
            <Avatar variant="filled" radius="xl" src="" />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user.username}
              </Text>

              <Text c="dimmed" size="xs">
                {user.email}
              </Text>
            </div>
          </Group>

          {links}
        </div>

        <Group className={classes.footer}>
          <Text
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              logoutHandler();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            Logout
          </Text>
        </Group>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
