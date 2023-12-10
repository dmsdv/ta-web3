import { Container, Title, Text, Button } from "@mantine/core";
import classes from "@/styles/HeroImageRight.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={classes.animatedElement}
            >
              <Title className={classes.title}>
                Pengetahuan anda kurang?{" "}
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "#F3EEEA", to: "#B99470" }}
                >
                  Baca buku Solusinya
                </Text>
              </Title>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={classes.animatedElement}
            >
              <Text className={classes.description} mt={30}>
                Kami menyediakan berbagai buku populer untuk memperluas
                pengetahuan anda. Jelajahi koleksi kami dan temukan buku-buku
                inspiratif untuk anda baca.
              </Text>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={classes.animatedElement}
            >
              <Link href={"/books"}>
                <Button
                  variant="gradient"
                  gradient={{ from: "#F3EEEA", to: "#B99470" }}
                  size="sm"
                  className={classes.control}
                  mt={51}
                >
                  Lihat Daftar Buku
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
