import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import type { CredentialResponse } from "@react-oauth/google";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

import PawPrint from "@/icons/PawPrint";
import TabBar from "@/components/TabBar/TabBar";
import { googleLogin, login, register } from "@/services/auth.service";

import { authPageStyles as styles } from "./AuthPageStyles";
import { HttpStatusCode } from "axios";

const AUTH_TABS = {
  LOGIN: {
    tabContent: "Login",
    greeting: "Welcome Back",
    description: "Login to connect with the pet community",
    errorMessage: "Invalid username or password.",
    usernamePlaceholder: "Enter your username",
    passwordPlaceholder: "Enter your password",
  },
  SIGN_UP: {
    tabContent: "Sign Up",
    greeting: "Join Petopia",
    description: "Create an account to help pets in need",
    errorMessage: "Something went wrong. Please try again.",
    usernamePlaceholder: "Choose a username",
    passwordPlaceholder: "Choose a password",
  },
};

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={styles.fieldLabel}>{children}</Typography>
);

const CleanInput = (props: React.ComponentProps<typeof TextField>) => (
  <TextField fullWidth variant="outlined" sx={styles.input} {...props} />
);

const AuthPage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [activeTab, setActiveTab] = useState<keyof typeof AUTH_TABS>("LOGIN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [petsCount, setPetsCount] = useState("0");
  const [petOwnerSince, setPetOwnerSince] = useState(today);
  const [errorMessage, setErrorMessage] = useState("");

  const isLogin = activeTab === "LOGIN";
  const queryClient = useQueryClient();

  const handleSuccess = async () =>
    await queryClient.resetQueries({ queryKey: ["userInfo"] });

  const handleError = (error: unknown) => {
    const status = (error as { status?: number })?.status;

    let errorMsg;
    if (status === HttpStatusCode.Conflict) {
      errorMsg = "Username already exists. Try a different one." ;
    } else if (status === HttpStatusCode.NotFound) {
      errorMsg = "User not found. Please sign up first.";
    } else if (status === HttpStatusCode.InternalServerError) {
      errorMsg = "Something went wrong. Please try again.";
    }

    setErrorMessage(errorMsg || AUTH_TABS[activeTab].errorMessage);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as keyof typeof AUTH_TABS);
    setErrorMessage("");
  };

  const handleAuth = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register({
          username,
          password,
          petsCount: Number(petsCount),
          petOwnerSince,
        });
      }

      handleSuccess();
    } catch (error) {
      handleError(error);
    }
  };

  const handleDateChange = (date: string) =>
    date > today ? setPetOwnerSince(today) : setPetOwnerSince(date);

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      await googleLogin(credentialResponse?.credential || "");
      handleSuccess();
    } catch(error) {
      handleError(error);
    }
  };

  return (
    <Box sx={styles.pageWrapper}>
      <Box sx={styles.contentContainer}>
        <Box sx={styles.logoSection}>
          <PawPrint sx={styles.logo} />
          <Typography fontWeight={600} fontSize="1.6rem">
            Petopia
          </Typography>
          <Typography color="text.secondary" fontSize="0.875rem">
            Your pet community hub
          </Typography>
        </Box>
        <TabBar
          tabs={Object.entries(AUTH_TABS).reduce(
            (tabs, [key, value]) => ({
              ...tabs,
              [key]: value.tabContent,
            }),
            {},
          )}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          sx={{ mb: "12px" }}
        />
        <Paper elevation={0} sx={styles.card}>
          <Box sx={styles.cardInner}>
            <Box sx={styles.headingSection}>
              <Typography variant="subtitle1" fontWeight={700}>
                {AUTH_TABS[activeTab].greeting}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize="0.82rem"
              >
                {AUTH_TABS[activeTab].description}
              </Typography>
            </Box>
            {errorMessage && (
              <Box sx={styles.errorBanner}>
                <Typography
                  variant="caption"
                  sx={styles.errorText}
                  title={errorMessage}
                >
                  {errorMessage}
                </Typography>
              </Box>
            )}
            <Box component="form" onSubmit={handleAuth}>
              <FieldLabel>Username</FieldLabel>
              <CleanInput
                required
                placeholder={AUTH_TABS[activeTab].usernamePlaceholder}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <FieldLabel>Password</FieldLabel>
              <CleanInput
                required
                type="password"
                placeholder={AUTH_TABS[activeTab].passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin && (
                <>
                  <FieldLabel>Number of Pets</FieldLabel>
                  <CleanInput
                    required
                    type="number"
                    placeholder="1"
                    value={petsCount}
                    onChange={(e) => setPetsCount(e.target.value)}
                  />
                  <FieldLabel>When did you become a pet owner?</FieldLabel>
                  <Box
                    component="input"
                    type="date"
                    value={petOwnerSince}
                    max={today}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleDateChange(event.target.value)
                    }
                    required
                    sx={styles.dateInput}
                  />
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={styles.submitButton}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
              {isLogin && (
                <>
                  <Divider sx={styles.divider}>Or continue with</Divider>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => handleError(new Error("Google login failed"))}
                      width="370"
                      theme="outline"
                      shape="rectangular"
                      text="signin_with"
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AuthPage;
