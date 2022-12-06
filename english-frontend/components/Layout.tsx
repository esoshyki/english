import { Box, Heading } from "@chakra-ui/react";
import { PropsWithChildren, ReactNode } from "react";
import LoginPopup from "./LoginPopup";

type LayoutProps<T> = {
  pageInfo: {
    pageTitle: string;
  };
  children: ReactNode;
} & T;

export default function Layout({ pageInfo, children }: LayoutProps<any>) {
  return (
    <>
      <Box bg={"tomato"} w={"100vw"} minH={"100vh"} p={4} color={"white"}>
        <Heading as="h1">{pageInfo.pageTitle}</Heading>
        {children}
      </Box>
      <LoginPopup />
    </>
  );
}
