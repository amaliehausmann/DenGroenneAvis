import { useEffect } from "react"

export const usePageTitle = ({pageTitle}) => {
    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle])
}