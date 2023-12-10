import { Container, Group, ActionIcon, rem, Text } from "@mantine/core";
import {
    IconBrandInstagram,
    IconBrandWhatsapp,
} from "@tabler/icons-react";
import classes from "../styles/FooterSocial.module.css";

export function FooterSocial() {
    return (
        <div className={classes.footer}>
            <Container className={classes.inner} size={"xl"}>
                <Text c="dimmed" size="md">
                    © 2023 bukunian. All rights reserved.
                </Text>
                <Group
                    gap={0}
                    className={classes.links}
                    justify="flex-end"
                    wrap="nowrap"
                >
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram
                            style={{ width: rem(28), height: rem(28) }}
                            stroke={2}
                        />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}
