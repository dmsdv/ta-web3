import { Text, Box, Stack, rem } from "@mantine/core";
import {
    IconSun,
    IconMapPin,
    IconAt,
    IconPhone,
} from "@tabler/icons-react";
import classes from "@/styles/ContactIcons.module.css";

interface ContactIconProps
    extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
    icon: typeof IconSun;
    title: React.ReactNode;
    description: React.ReactNode;
}

function ContactIcon({
    icon: Icon,
    title,
    description,
    ...others
}: ContactIconProps) {
    return (
        <div className={classes.wrapper} {...others}>
            <Box mr="md">
                <Icon style={{ width: rem(24), height: rem(24), color: "gray" }} />
            </Box>

            <div>
                <Text size="xs" className={classes.title}>
                    {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    );
}

const MOCKDATA = [
    { title: "Email", description: "example@gmail.com", icon: IconAt },
    { title: "Whatsapp", description: "+62 882 1234 5678", icon: IconPhone },
    { title: "Address", description: "844 Morris Park avenue", icon: IconMapPin },
    { title: "Working hours", description: "08:00 – 16:00", icon: IconSun },
];

export function ContactIconsList() {
    const items = MOCKDATA.map((item, index) => (
        <ContactIcon key={index} {...item} />
    ));
    return <Stack>{items}</Stack>;
}
