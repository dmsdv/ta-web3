import { Image, Container, Title, List, ThemeIcon, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "../public/image.svg";
import classes from "@/styles/HeroBullets.module.css";
import { ContactIconsList } from "./ContactIcons";
import { motion } from "framer-motion";

export function HeroBullets() {
  return (
    <Container size="md" mt={"66px"}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <motion.div
            initial={{ opacity: 0, x: "50%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Title className={classes.title}>Contact Information</Title>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <ContactIconsList />
            </List>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: "-50%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image src={image.src} className={classes.image} alt="image" />
        </motion.div>
      </div>
    </Container>
  );
}
