export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export function parseApiError(error: any): ApiError {
  if (typeof error === "string") {
    return { message: "Erreur serveur." };
  }

  return {
    message: error?.message || "Une erreur est survenue.",
    errors: error?.errors,
  };
}
