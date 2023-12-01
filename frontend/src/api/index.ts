import axios from "axios";
import config from "../../config";

const baseUrl = config.app.backendUrl;

export const getTrending = async (token: string) => {
    const response = await axios.get(`${baseUrl}/trending`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.books;
}

export const getReadBooks = async (userId: string, token: string) => {
    const response = await axios.get(`${baseUrl}/read/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.books;
}

export const getOnGoingBooks = async (userId: string, token: string) => {
    const response = await axios.get(`${baseUrl}/ongoing/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.books;
}


export const listBooks = async (token: string) => {
    const response = await axios.get(`${baseUrl}/books`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.books;
}

export const getBook = async (id: string, token: string) => {
    const response = await axios.get(`${baseUrl}/books/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.book;
}

export const getUserBooksRecommendation = async (userId: string, token: string) => {
    const response = await axios.get(`${baseUrl}/recommendation/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.books;
}

export const getBookBooksRecommendation = async (bookId: string, userId: string, token: string) => {
    const response = await axios.post(
        `${baseUrl}/recommendation`,
        {
            book_id: bookId,
            user_id: userId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data.books;
}