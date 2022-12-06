import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLoginPopup } from "../components/LoginPopup";
import { useAuth } from "../hooks/useAuth";
import { UserData } from "../types";

const Profile = () => {

  const { getProfile, profileState, status } = useAuth();
  const { showLoginPopup, hideLoginPopup } = useLoginPopup()

  useEffect(() => {
    if (!profileState.data) {
      console.log(profileState.statusCode);
      if (profileState.statusCode === null) {
        getProfile()
      }
      if (profileState.statusCode === 401) {
        showLoginPopup()
      }
    }

  }, [profileState, getProfile])

  useEffect(() => {
    if (status === 'success') {
      hideLoginPopup();
      getProfile();
    }
  }, [status, hideLoginPopup])

  if (!profileState.data) return null

  return (
    <Flex direction={"column"}>
      <Text as={"h4"}>Nickname</Text>
      <Text as={"h4"}>{profileState.data.name}</Text>
    </Flex>
  );
};

export default Profile
