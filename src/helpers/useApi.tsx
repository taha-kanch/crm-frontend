// api.js (or useApi.js)
import { useState } from 'react';
import { authHeader } from './authHeader';
import { AuthHeader } from '@/utils/constants';

const apiUrl = 'http://localhost:8080/api/v1'; // Base URL for your API

// Helper function to handle JSON response
const handleResponse = async (response: any) => {
  if (!response.ok) {
    const error = await response.json();
    return error
  }
  if(response.url.includes('Get') || response.url.includes('Authenticate')) {
    return response.json();
  } else {
    return response.json();
  }
};

// Generic function for POST requests
export const post = async (endpoint: string, body: any) => {
  const requestOptions: AuthHeader = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(body),
  };

  const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
  return handleResponse(response);
};

export const get = async (endpoint: string) => {
  const requestOptions: AuthHeader = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
  return handleResponse(response);
};

export const getById = async (endpoint: string) => {
  const requestOptions:AuthHeader = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
  return handleResponse(response);
};

export const put = async (endpoint: string, body: any) => {
  const requestOptions: AuthHeader = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(body),
  };

  const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
  return handleResponse(response);
};

export const deleteById = async (endpoint: string) => {
  const requestOptions: AuthHeader = {
    method: 'DELETE',
    headers: authHeader(),
  };

  const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
  return handleResponse(response);
};

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (endpoint: string, method: any, body: any) => {
    setLoading(true);
    try {
      const response = await method(endpoint, body);
      setLoading(false);
      return response;
    } catch (error: any) {
      setLoading(false);
      setError(error);
      throw error; // Propagate the error for further handling
    }
  };

  const resetError = () => setError(null);

  return {
    loading,
    error,
    makeRequest,
    resetError,
  };
};
