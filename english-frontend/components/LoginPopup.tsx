import { Modal, ModalOverlay, ModalContent, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks";
import { setShowLoginModal } from "../store/auth";
import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginData } from "../api/types";
import { useAuth } from "../hooks/useAuth";

export const useLoginPopup = () => {
  const dispatch = useDispatch();

  const showLoginPopup = () => {
    dispatch(setShowLoginModal(true));
  };

  const hideLoginPopup = () => {
    dispatch(setShowLoginModal(false));
  };

  return {
    showLoginPopup,
    hideLoginPopup,
  };
};

export default function LoginPopup() {
  const showLoginPopup = useAppSelector(
    (state) => state.authReducer.showLoginModal
  );

  const { hideLoginPopup } = useLoginPopup();

  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { login, status, error, resetApi } = useAuth();

  const onSubmit = (data: any) => {
    login(data);
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        onCloseComplete: () => {
          console.log("closed");
          resetApi();
        },
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (status === "success") {
      toast({
        title: "Success",
        description: "You've been succesfully authorized",
        status: "success",
        duration: 3000,
        onCloseComplete: () => {
          console.log("closed");
          resetApi();
        },
      });
    }
  }, [status, toast]);

  return (
    <Modal isOpen={showLoginPopup} onClose={hideLoginPopup}>
      <ModalOverlay />
      <ModalContent p={5}>
        <Flex direction={'column'} gap={2}>
        <Text fontWeight={"bold"}>Login</Text>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Flex
            direction={"column"}
            w="100%"
            h="100%"
            m="auto"
            maxW={"600px"}
            gap={4}
          >
            <Input
              focusBorderColor={"white"}
              placeholder="Username"
              {...register("username")}
            />
            <Input
              focusBorderColor={"white"}
              {...register("password")}
              type="password"
              placeholder="password"
            />

            <Button
              colorScheme="white"
              variant="outline"
              type="submit"
              isLoading={status === "pending"}
            >
              Login
            </Button>
          </Flex>
        </form>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
