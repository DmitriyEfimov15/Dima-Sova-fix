import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { IWorker } from "../types/Iworker";

export const workerAPI = createApi({
    reducerPath: "workerAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    tagTypes: ['Worker'],
    endpoints: (build) => ({
        fetchAllWorkers: build.query<IWorker[], number>({
            query: () => ({
                url: '/workers',
            }),

            providesTags: result => ['Worker']
        }),

        fetchOneUser: build.query<IWorker, string>({
            query: (id) => ({
                url: `/workers/?id=${id}`
            }),

            providesTags: result => ['Worker']
        })
    })
})
