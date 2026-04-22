import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {

    const response = await axiosInstance.post("/login", {
        email,
        password
    });

    return response.data;
};

export const register = async (data: any) => {
    const res = await axiosInstance.post("/register", data);
    return res.data;
};