import { Stack, Redirect } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/firebase/config";
import { setUser } from "@/redux/authSlice";
import { RootState } from "@/redux/store";

export default function AuthLayout() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch(setUser(user));
        });
        return unsubscribe;
    }, []);

    if (loading) return null;

    if (user) return <Redirect href="/(tabs)" />;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
