import React from 'react';
import logo from './logo.svg';
import './index.css';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                {/* Navigation Bar */}
                <nav className="App-nav">
                    <h1>Musify</h1>
                    <div>
                        <a href="#home">Home</a>
                        <a href="#signin">Sign-in/up</a>
                    </div>
                </nav>

                {/* Main Content */}
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default Home;
