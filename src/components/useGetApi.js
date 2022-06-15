/**
 * Файл пользовательского хука useGetApi. Управляет состояниями статуса, получает апи и возвращает их, когда это требуется.
 */

import { useRef, useState, useEffect } from 'react';
import SpotifyApi from './Api';
import { useSearchParams, useLocation } from "react-router-dom";


const useGetApi = () => {

    const [status, setStatus] = useState({
        isloading: false,
        data: undefined,
        error: undefined
      });

    const [searchParams] = useSearchParams();
    const searchResult = searchParams.get('search');
    let albumId = null;
    let location = useLocation();
    if (location.pathname.includes('id')) {
        albumId = location.pathname.slice(4);
    }
    // console.log(location);
    const api = useRef(new SpotifyApi());

    async function workWithApi() {
        let token = await api.current.getToken();
        if (searchResult) {
            try {
                setStatus({ isloading: false, data: await api.current.getSearch(searchResult, token) });
                return api.current.getSearch(searchResult, token);
            } catch (error) {
                setStatus({ loading: false, error });
            }
        } else if (albumId) {
            try {
                setStatus({ isloading: false, data: await Promise.all([api.current.getAlbum(albumId, token), api.current.getNewReleases5(token)])});
                return Promise.all([api.current.getAlbum(albumId, token), api.current.getNewReleases5(token)]);
            } catch (error) {
                setStatus({ loading: false, error });
            }
        } else {
            try {
                setStatus({ isloading: false, data: await api.current.getNewReleases12(token)});
                return api.current.getNewReleases12(token);
            } catch (error) {
                setStatus({ loading: false, error });
            }
        }
    }

    useEffect(() => {workWithApi()}, [albumId, searchResult]);

    return { ...status, workWithApi };
}

export default useGetApi;