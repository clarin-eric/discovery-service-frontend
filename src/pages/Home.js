import React from 'react';
import { useDispatch } from "react-redux";
import IdpView from "./IdpList";
import { CookiesProvider } from 'react-cookie';
import queryString from 'query-string';
import {createQueryParametersAction, fetchIdps} from "../actions";
import { useParams } from 'react-router-dom';

import './Home.css';

const Home = (props) => {
    const dispatch = useDispatch();
    const urlParams = useParams();

    React.useEffect(() => {
        const query = queryString.parse(window.location.search, { ignoreQueryPrefix: true });
        console.log("Query: ", query);
        dispatch(createQueryParametersAction(query.entityID, query.return, query.uy_auto_login));
        dispatch(fetchIdps(urlParams.id))
    }, [dispatch, urlParams]);

    return (
        <CookiesProvider>
            <IdpView id={urlParams.id} />
        </CookiesProvider>
    );
}

export default Home;