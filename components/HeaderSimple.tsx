import { useEffect, useState } from "react";
import { Container, Group, Burger, Text, VisuallyHidden } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/styles/HeaderSimple.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
    { link: "/", label: "Home" },
    { link: "/books", label: "All Books" },
    { link: "/contact", label: "Contact" },
];

export function HeaderSimple() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState("");
    const router = useRouter();

    useEffect(() => {
        setActive(router.pathname);
    }, [router.pathname]);

    const items = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={`${classes.link} ${opened ? classes.linkOpened : ""}`}
            data-active={active === link.link || undefined}
            onClick={() => {
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <Link href={"/"} className={classes.logo}>
                    <Text size="xl" fw={700}>
                        bukunian
                    </Text>
                </Link>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Group hiddenFrom="xs">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
                    <Group>
                        {opened && <div className={classes.linkBox}>{items}</div>}
                    </Group>
                </Group>
            </Container>

            <VisuallyHidden>
                <Link href="/admin/login" accessKey="l"></Link>
            </VisuallyHidden>
        </header>
    );
}
