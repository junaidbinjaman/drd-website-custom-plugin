import {useEffect} from "react";

declare global {
    interface window {
        drdData: {
            rootUrl: string;
            nonce: string;
        }
    }
}

export default function () {

    useEffect(()=> {
        fetch('http://localhost:10013/wp-json/drdcustomplugin/v1/retail-sales-report', {
            headers: {
                'X-WP-Nonce': window.drdData.nonce,
                'content': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])

    return (<>
    <h1>{window.drdData.nonce}</h1>
    </>)
}