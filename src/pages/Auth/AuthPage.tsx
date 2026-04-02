import { toDate } from "date-fns";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import type { CredentialResponse } from "@react-oauth/google";
import { DesktopDatePicker as DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  TextField,
} from "@mui/material";

import PawPrint from "@/icons/PawPrint";
import TabBar from "@/components/TabBar/TabBar";
import { googleLogin, login, register } from "@/services/auth.service";

import { authPageStyles as styles } from "./AuthPageStyles";
import {
  AUTH_TABS,
  FIELDS_PROPS,
  defaultValues,
  type AuthFormType,
} from "./AuthPage.utils";

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={styles.fieldLabel}>{children}</Typography>
);

const CleanInput = (props: React.ComponentProps<typeof TextField>) => (
  <TextField fullWidth variant="outlined" sx={styles.input} {...props} />
);

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof AUTH_TABS>("LOGIN");
  const [hasError, setHasError] = useState(false);

  const isLogin = activeTab === "LOGIN";
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<AuthFormType>({
    defaultValues,
  });

  const handleSuccess = async () =>
    await queryClient.resetQueries({ queryKey: ["userInfo"] });

  const handleError = () => setHasError(true);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as keyof typeof AUTH_TABS);
    setHasError(false);
    reset();
  };

  const onSubmit = async (data: AuthFormType) => {
    setHasError(false);

    try {
      const email = `${data.username}@petopia.com`;

      if (isLogin) {
        await login(email, data.password);
      } else {
        await register({
          email,
          username: data.username,
          password: data.password,
          petsCount: Number(data.petsCount),
          petOwnerSince: data.petOwnerSince ?? "",
        });
      }

      handleSuccess();
    } catch {
      handleError();
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      await googleLogin(credentialResponse?.credential || "");
      handleSuccess();
    } catch {
      handleError();
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
            {hasError && (
              <Box sx={styles.errorBanner}>
                <Typography
                  variant="caption"
                  sx={styles.errorText}
                  title={AUTH_TABS[activeTab].errorMessage}
                >
                  {AUTH_TABS[activeTab].errorMessage}
                </Typography>
              </Box>
            )}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {FIELDS_PROPS.filter(
                (field) => !field.onlyFor || field.onlyFor === activeTab,
              ).map(({ name, label, type, rules, placeholder }) => (
                <React.Fragment key={name}>
                  <FieldLabel>{label}</FieldLabel>
                  <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState: { error } }) =>
                      name === "petOwnerSince" ? (
                        <DatePicker
                          maxDate={new Date()}
                          value={toDate(field.value ?? "")}
                          onChange={(value) =>
                            field.onChange(value?.toISOString() ?? "")
                          }
                          slotProps={{
                            textField: {
                              error: !!error,
                              helperText: error?.message,
                              fullWidth: true,
                            },
                          }}
                        />
                      ) : (
                        <CleanInput
                          {...field}
                          type={type}
                          placeholder={
                            placeholder ??
                            (name === "username"
                              ? AUTH_TABS[activeTab].usernamePlaceholder
                              : name === "password"
                                ? AUTH_TABS[activeTab].passwordPlaceholder
                                : "")
                          }
                          error={!!error}
                          helperText={error?.message}
                        />
                      )
                    }
                  />
                </React.Fragment>
              ))}
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
                      onError={handleError}
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
