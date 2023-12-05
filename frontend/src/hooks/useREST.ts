import React, { useState } from "react";
import { camelCase, isArray, transform, isObject, snakeCase } from "lodash";
import { handleDates } from "../common/parseDates";
import { useNavigate } from "react-router-dom";

interface RESTReturnType<InputType, returnType> {
    data: returnType | null,
    error: RESTError | null,
    loading: boolean,
    success: boolean,
    submitFn: (input: InputType) => void,
}

interface RESTError {
    detail: string,
    statusCode: string,
}

const camelize = (obj: Record<string, unknown>) => (
    transform(obj, (result: Record<string, unknown>, value: unknown, key: string, target) => {
        const camelKey = isArray(target) ? key : camelCase(key);
        result[camelKey] = isObject(value) ? camelize(value as Record<string, unknown>) : value;
    })
);

const snakecaseify = (obj: Record<string, unknown>) => (
    transform(obj, (result: Record<string, unknown>, value: unknown, key: string, target) => {
        const snakeKey = isArray(target) ? key : snakeCase(key);
        result[snakeKey] = isObject(value) ? snakecaseify(value as Record<string, unknown>) : value;
    }
))

function formatDatesInObject(obj: any): any {
    if (obj instanceof Date) {
      // If the value is a Date object, format it
      obj.setHours(0, 0, 0, 0);
      const formattedDate = obj.toISOString().split('T')[0];
      return formattedDate;
    } else if (typeof obj === 'object' && obj !== null) {
      // If the value is an object, recursively format dates in its properties
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = formatDatesInObject(obj[key]);
        }
      }
    }
    return obj;
  }

function makeSpacesNull(obj: any): any {
    if (typeof obj === 'string' && obj.trim() === '') {
        return null;
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = makeSpacesNull(obj[key]);
            }
        }
    }
    return obj;
}

function useREST<InputType, ReturnType>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE', resource: string
): RESTReturnType<InputType, ReturnType> {
    const [data, setData] = useState<ReturnType | null>(null);
    const [error, setError] = useState<RESTError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // I've added a success flag because there's a couple of endpoints where they're returning "204 no content"
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const submitFn = async (input: InputType) => {
        setLoading(true);
        try {
            // Send the HTTP request
            let params: {
                method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                body?: string,
            } = {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
            }
            if (method !== 'GET') {
                params['body'] = JSON.stringify(snakecaseify(formatDatesInObject(makeSpacesNull(input))), null, 2);
            }
            const res = await fetch(`${import.meta.env.BASE_URL}/api${resource}`, params);

            if (res.status === 401) {
                // Clear user data and redirect to login
                localStorage.removeItem('user');
                setData(null);
                const parsedRes: RESTError = await res.json();
                setError({detail: parsedRes?.detail, statusCode: '401'});
                setLoading(false);
                setSuccess(false);
                // If the current page is the login page, don't redirect
                if (window.location.pathname !== '/login') {
                    navigate('/login', { replace: true });
                    return
                }
            }

            // If the response's status code is not 2xx, set the error
            if (!res.ok) {
                try{
                    const parsedRes: RESTError = await res.json();
                    setError({
                        detail: parsedRes.detail,
                        statusCode: res.status.toString()
                    })
                } catch (e) {
                    setError({
                        detail: res.statusText,
                        statusCode: res.status.toString(),
                    });
                }
                
                setLoading(false);
                // console.error(res);
            } else {
                // Parse the response
                if (res.status === 204 || method == 'PATCH') {
                    // If nothing is returned but we have a successful status code (2xx), set the success flag and return
                    setSuccess(true);
                    setLoading(false);
                    return;
                }
                const parsedRes = camelize(await res.json()) as ReturnType & RESTError;
                // const parsedRes: ReturnType & RESTError = await res.json();
                // If the response has a detail field, it is an error
                if (parsedRes.detail) {
                    setError(
                        parsedRes.detail
                            ? { detail: parsedRes.detail, statusCode: res.status.toString() }
                            : { detail: res.statusText, statusCode: res.status.toString() },
                    )
                    // console.error(parsedRes);
                } else {
                    // Otherwise set the data and the success flags
                    setData(handleDates(parsedRes) as ReturnType);
                    setSuccess(true);
                }
            }
            
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError({ detail: e.message, statusCode: '0' });
            } else {
                setError({ detail: e as string, statusCode: '0' });
            }
            // console.error(e);
        }
        setLoading(false);
    }

    return { success, data, error, loading, submitFn };
}

export default useREST;
