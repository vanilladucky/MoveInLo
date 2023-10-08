import { TextInput } from "react-native";
import { useTheme } from "@src/assets/theme/ThemeProvider";
import React from "react";
import { styled } from "nativewind";

const BaseInput = ({ placeholder, title, primary, value, ...props }) => {
  const { theme } = useTheme();
  const StyledInputBox = styled(TextInput);

  return (
    <StyledInputBox
      className={`border-2 border-gray rounded-md justify-center items-center
      font-RobotoMedium w-full py-2 px-2 my-2`}
      style={{
        backgroundColor: props.primary ? theme.primary : theme.white,
      }}
      placeholder={placeholder}
      defaultValue={title}
      value={value}
      {...props} // Grant access to all props
    />
  );
};

export default BaseInput;
