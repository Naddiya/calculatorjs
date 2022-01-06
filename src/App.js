import './App.css';
import React, { useEffect, useState } from 'react';
import { data } from './data';

const App = () => {
    const calculatorKeys = data;
    const operators = ["/", "X", "+", "-", "="];
    const [display, setDisplay] = useState([]);
    const [operation, setOperation] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [operator, setOperator] = useState("+");
    const [currentResult, setCurrentResult] = useState(0);

    useEffect(() => {
        if (operation.length > 0) {
            setCurrentNumber(parseInt(operation.join('')));
        }
    }, [currentNumber, operation]);

    const handleClick = (e) => {
        const value = e.target.textContent;
        handleDisplay(value);
        if (value === "AC") {
            setDisplay([]);
            setOperation([]);
            setCurrentNumber(0);
            setCurrentResult(0);
        } else if (Number(value) || value === "0" || value === ".") {
            setOperation(oldOp => [...oldOp, value]);
        } else if (operators.includes(value)) {
            setOperation([]);
            setOperator(value);
            if (currentResult === 0) {
                setCurrentResult(currentResult + currentNumber);
            } else if (currentResult !== 0) {
                handleCalculation(value);
            }
        }
    };

    const handleDisplay = (value) => {
        if (value !== "=" && value !== "AC") {
            setDisplay(oldDisplay => [...oldDisplay, value]);
        }
    };

    const handleCalculation = (value) => {
        if (value && operator === "+") {
            setCurrentResult(prevResult => prevResult + currentNumber);
        } else if (value && operator === "-") {
            setCurrentResult(prevResult => prevResult - currentNumber);
        } else if (value && operator === "/") {
            setCurrentResult(prevResult => prevResult / currentNumber);
        } else if (value && operator === "X") {
            setCurrentResult(prevResult => prevResult * currentNumber);
        } else if (value === "=") {
            if (operator === "+") {
                setCurrentResult(prevResult => prevResult + currentNumber);
            } else if (operator === "-") {
                setCurrentResult(prevResult => prevResult - currentNumber);
            } else if (operator === "/") {
                setCurrentResult(prevResult => prevResult / currentNumber);
            } else if (operator === "X") {
                setCurrentResult(prevResult => prevResult * currentNumber);
            }
        }
    };

    return (
        <div id="App">
            <div className="calculator" >
                <div className="calculator-display" >
                    <div className='calculator-display-operation'>
                        {display}
                    </div>
                    <div className="calculator-display-result">
                        {currentResult || 0}
                    </div>
                </div>
                <div className="calculator-keys">
                    {calculatorKeys.map((n) => (
                        <div className={`calculator-keys-key calculator-keys-key-${n.layout}`}
                            key={n.keyValue}
                            id={n.id}
                            onClick={handleClick}
                        >
                            {n.keyValue}
                        </div>
                    ))}
                </div>
            </div>
            <footer className="designer">
                <p>Designed by Peter Weinberg</p>
                <p className="coder">and Coded By Nadia</p>
            </footer>
        </div>
    );
};

export default App;
