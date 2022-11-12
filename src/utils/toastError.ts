import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { toast } from "react-toastify";
import { ErrorDataType } from "./interfaces";

function isFetchBaseQueryError(
    error: unknown
  ): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
  }

  const toastError = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (isFetchBaseQueryError(error)) {
      const errorData = error.data as ErrorDataType
      toast.error(`${errorData.message}`)
  }
}

 export default toastError