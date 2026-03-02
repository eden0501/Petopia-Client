import React, { useState } from "react";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Divider,
} from "@mui/material";

import api from "../api/axios";
import PawPrint from "../icons/PawPrint";
import TabBar from "../components/TabBar/TabBar";
import { authPageStyles as styles } from "./AuthPageStyles";

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
    const [petsCount, setPetsCount] = useState("1");
    const [dateOfBirth, setDateOfBirth] = useState(today);
    const [hasError, setHasError] = useState(false);

    const isLogin = activeTab === "LOGIN";
    const navigate = useNavigate();

    const handleSuccess = () => {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/")
    };

    const handleError = () => setHasError(true);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab as keyof typeof AUTH_TABS);
        setHasError(false);
    };

    const handleAuth = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setHasError(false);

        try {
            const email = `${username}@petopia.com`;

            if (isLogin) {
                await api.post("/auth/login", { email, password });
            } else {
                await api.post("/auth/register", {
                    email,
                    username,
                    password,
                    petsCount: Number(petsCount),
                    dateOfBirth: new Date(dateOfBirth),
                });
            }

            handleSuccess();
        } catch {
            handleError();
        }
    };

    const handleDateChange = (date: string) => (date > today) ? setDateOfBirth(today) : setDateOfBirth(date)

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            await api.post("/auth/google", { credential: credentialResponse.credential });
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
                    <Typography fontWeight={600} fontSize="1.6rem">Petopia</Typography>
                    <Typography color="text.secondary" fontSize="0.875rem">Your pet community hub</Typography>
                </Box>
                <TabBar
                    tabs={Object.entries(AUTH_TABS).reduce((tabs, [key, value]) => ({
                        ...tabs,
                        [key]: value.tabContent,
                    }), {})}
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
                            <Typography variant="body2" color="text.secondary" fontSize="0.82rem">
                                {AUTH_TABS[activeTab].description}
                            </Typography>
                        </Box>
                        {hasError && (
                            <Box sx={styles.errorBanner}>
                                <Typography variant="caption" sx={styles.errorText} title={AUTH_TABS[activeTab].errorMessage}>
                                    {AUTH_TABS[activeTab].errorMessage}
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
                                    <FieldLabel>Date of Birth</FieldLabel>
                                    <Box
                                        component="input"
                                        type="date"
                                        value={dateOfBirth}
                                        max={today}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDateChange(event.target.value)}
                                        required
                                        sx={styles.dateInput}
                                    />
                                </>
                            )}
                            <Button type="submit" fullWidth variant="contained" disableElevation sx={styles.submitButton}>
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
