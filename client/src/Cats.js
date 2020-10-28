import React, { useEffect, useState } from 'react';
import { Link, Redirect, Switch, Route, useHistory } from 'react-router-dom';

const Cats = () => {
    const history = useHistory();
    const [cats, setCats] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/cat/all-cats");
            const data = await res.json();
            setCats(data);
        })();
    }, []);

    const logout = () => {
        document.cookie.split(";").forEach(c => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        history.go("/login");
    };

    const deleteCat = async (e, id) => {
        e.stopPropagation();
        await fetch(`/cat/delete-cat/${id}`, {
            method: "DELETE"
        });
        setCats(cats.filter(cat => cat.id !== id));
    }

    return (
        <div>
            <div onClick={logout} style={{ position: "absolute", left: 0, top: 0 }}>
                logout
            </div>
            Cats
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {
                    cats.map(cat => (
                        <div key={cat.id} style={{ position: "relative", border: "2px solid orange", width: "30%", margin: "2%" }} onClick={() => history.push(`/update-cat/${cat.id}`)}>
                            <img src="/garbage2.png" style={{ width: "15%", position: "absolute", left: 0 }} onClick={e => deleteCat(e, cat.id)} />
                            <div>
                                {cat.name}
                            </div>
                            <img src={cat.imagePath} width="70%" />
                        </div>
                    ))
                }
            </div>
            <div>
                <Link to="/new-cat">
                    new cat
                </Link>
            </div>
        </div>
    );
}

export default Cats;