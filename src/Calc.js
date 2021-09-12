import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
const Calc = () => {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [people, setPeople] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const peopleInput = useRef(null);
  const tipAmountRef = useRef(null);
  const totalAmountRef = useRef(null);
  const billRef = useRef(null);

  const calculateTipAmount = () => {
    const totalTip = (tip * bill) / 100;
    const perPerson = totalTip / people;
    setTipAmount(() => perPerson.toFixed(2));
    tipAmountRef.current.textContent = perPerson.toFixed(2);
  };
  const calculateTotalAmount = () => {
    const totalTip = (tip * bill) / 100;
    const perPerson = +(totalTip / people).toFixed(2);
    const total = bill / people + perPerson;
    totalAmountRef.current.textContent = total.toFixed(2);
  };

  const changePeople = (e) => {
    const error = document.querySelector(".error");
    if (e.target.value == 0) {
      error.classList.remove("no-error");
      peopleInput.current.classList.add("red-border");
    } else {
      error.classList.add("no-error");
      setPeople(e.target.value);
      peopleInput.current.classList.remove("red-border");
    }
  };

  const reset = () => {
    billRef.current.value = "";
    setBill(0);
    peopleInput.current.value = "";
    setPeople(0);
    tipAmountRef.current.textContent = "0.00";
    totalAmountRef.current.textContent = "0.00";
  };

  useEffect(() => {
    const tipButtons = document.querySelectorAll(".percent");
    tipButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        setTip(() => e.target.textContent);
        tipButtons.forEach((button) => {
          button.classList.remove("selected");
        });
        button.classList.add("selected");
      });
    });
  }, []);

  useEffect(() => {
    if (bill > 0 && tip > 0 && people > 0) {
      calculateTipAmount();
      calculateTotalAmount();
    }
  }, [bill, tip, people]);

  return (
    <Container>
      <Name>
        Spli <br />
        Tter
      </Name>
      <Calculator>
        <div className="left">
          <div className="bill">
            <span>Bill</span>
            <div className="input-control">
              <input
                type="number"
                placeholder="0"
                ref={billRef}
                onChange={(e) => {
                  setBill(e.target.value);
                }}
              />
            </div>
            <span>Select Tip %</span>
          </div>
          <Grid>
            <button className="percent">5</button>
            <button className="percent">10</button>
            <button className="percent selected">15</button>
            <button className="percent">25</button>
            <button className="percent">50</button>
            <input
              type="number"
              placeholder="Custom"
              className="percent custom"
              onChange={(e) => {
                setTip(e.target.value);
              }}
            />
          </Grid>
          <People>
            <div className="flex">
              <span>Number of People</span>
              <span className="no-error error">Can't be zero!</span>
            </div>

            <div className="input-control">
              <input
                type="number"
                placeholder="0"
                ref={peopleInput}
                onChange={changePeople}
              />
            </div>
          </People>
        </div>
        <div className="right">
          <div className="mb-small">
            <h4>
              Tip Amount <br />
              <span>/ person</span>
            </h4>
            <h1 ref={tipAmountRef}>0.00</h1>
          </div>
          <div>
            <h4>
              Total <br />
              <span>/ person</span>
            </h4>
            <h1 ref={totalAmountRef}>0.00</h1>
          </div>
          <button className="reset" onClick={reset}>
            Reset
          </button>
        </div>
      </Calculator>
    </Container>
  );
};

const Container = styled.div`
  width: 45%;
`;
const Name = styled.h1`
  text-align: center;
  text-transform: uppercase;
  color: hsl(186, 14%, 43%);
  font-size: 1.8rem;
  letter-spacing: 0.7rem;
  margin-bottom: 6rem;
`;
const Calculator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1.3rem;

  .left,
  .right {
    width: 50%;
  }
  .left {
    margin-right: 3rem;
  }
  .right {
    background-color: hsl(183, 100%, 15%);
    border-radius: 1.3rem;
    color: #fff;
    padding: 3.5rem 2.5rem;
    position: relative;
    div {
      display: flex;

      h4 {
        font-weight: lighter;
        font-size: 1.3rem;
      }
      h1 {
        margin-left: auto;
        color: hsl(172, 67%, 45%);

        &::before {
          content: "$";
          margin-right: 2px;
        }
      }
    }
    .reset {
      border: 0;
      width: 85%;
      padding: 1rem;
      font-family: inherit;
      text-transform: uppercase;
      background-color: hsl(172, 67%, 45%);
      border-radius: 0.8rem;
      font-weight: bold;
      color: hsl(186, 14%, 20%);
      font-size: 1.7rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 30px;
      cursor: pointer;
      transition: all 250ms;

      &:hover {
        background-color: hsl(172, 67%, 60%);
      }
    }
  }
  .bill {
    display: flex;
    flex-direction: column;
  }
  .input-control {
    position: relative;
    margin-bottom: 1.5rem;
  }
  .input-control::before {
    content: "$";
    position: absolute;
    z-index: 1;
    font-size: 2rem;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: hsl(184, 14%, 56%);
  }
  span {
    color: hsl(186, 14%, 43%);
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }
  .error {
    color: rgba(245, 66, 66, 0.8);
  }
  .no-error {
    display: none;
  }
  .red-border {
    border: 2px solid rgba(245, 66, 66, 0.8);
  }

  input {
    border: 0;
    text-align: right;
    font-size: 2rem;
    font-family: inherit;
    background-color: hsl(189, 41%, 97%);
    border: 2px solid transparent;
    /* margin-top: 1rem; */
    border-radius: 0.5rem;
    padding: 5px 1rem;
    position: relative;
    width: 100%;
    transition: all 250ms;
    &:focus {
      outline: none;
      border: 2px solid hsl(172, 67%, 45%);
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-bottom: 2rem;
  .percent {
    border: 0;
    padding: 0.9rem;
    color: #fff;
    background-color: hsl(183, 100%, 15%);
    font-family: inherit;
    font-size: 1.6rem;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    border: 2px solid transparent;
    transition: background-color 250ms;
    &:after {
      content: "%";
    }
    &:hover {
      background-color: hsl(183, 100%, 20%);
    }
  }
  .selected {
    background-color: hsl(172, 67%, 45%);
    color: hsl(183, 100%, 15%);

    &:hover {
      background-color: hsl(172, 67%, 50%);
    }
  }
  .custom {
    color: hsl(186, 14%, 43%);
    background-color: hsl(189, 41%, 97%);
    text-align: center;
    cursor: text;
    border: 2px solid transparent;
    &:hover {
      background-color: transparent;
    }
  }
`;

const People = styled.div`
  .input-control::before {
    content: "";
    background-image: url("/images/icon-person.svg");
    width: 15px;
    height: 15px;
    display: block;
    background-repeat: no-repeat;
    position: absolute;
  }
`;

export default Calc;
