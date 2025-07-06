export function useMockApi() {
    const config = useRuntimeConfig()
    return config.public.useMockApi
}
