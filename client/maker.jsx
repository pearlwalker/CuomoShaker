const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleCuomo = (e, onCuomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#cuomoName').value;
    const age = e.target.querySelector('#cuomoAge').value;

    if (!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { name, age }, onCuomoAdded);
    return false;
};

const CuomoForm = (props) => {
    return (
        <form
            name="cuomoForm"
            onSubmit={(e) => handleCuomo(e, props.triggerReload)}
            method="POST"
            className="cuomoForm"
            action="/shaker"
            id="cuomoForm"
        >
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="cuomoName" placeholder="Cuomo Name" />
            <label htmlFor="age">Age: </label>
            <input type="number" name="age" id="cuomoAge" min="0" />
            <input className="shakeCuomoSubmit" type="submit" value="Shake Cuomo" />
        </form>
    );
};

const CuomoList = (props) => {
    const [cuomos, setCuomos] = useState(props.cuomos);

    useEffect(() => {
        const loadCuomosFromServer = async () => {
            const response = await fetch('/getCuomos');
            const data = await response.json();
            setCuomos(data.cuomos);
        };
        loadCuomosFromServer();
    }, [props.reloadCuomos]);

    if (cuomos.length === 0) {
        return (
            <div className="cuomoList">
                <h3 className="emptyCuomo">No Cuomos Yet!</h3>
            </div>
        )
    }
    const cuomoNodes = Cuomos.map(cuomo => {
        return (
            <div key={cuomo.id} className="cuomo" >
                <img src="/assets/img/cuomoface.jpeg" alt="Cuomo face" className="cuomoFace" />
                <h3 className="cuomoName">Name: {cuomo.name}</h3>
                <h3 className="cuomoAge">Age: {cuomo.age}</h3>
            </div>
        );
    });
    return (
        <div className="cuomoList">
            {cuomoNodes}
        </div>
    );
};

const App = () => {
    const [reloadCuomos, setReloadCuomos] = useState(false);

    return (
        <div>
            <div id="shakeCuomo">
                <CuomoForm triggerReload={() => setReloadCuomos(!reloadCuomos)} />
            </div>
            <div id="cuomos">
                <CuomoList cuomos={[]} reloadCuomos={reloadCuomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};

window.onload = init;
