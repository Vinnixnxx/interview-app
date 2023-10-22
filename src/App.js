import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  //Variables and Hooks
  //Company data
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [employeesNumber, setEmployeesNumber] = useState(0);
  const [desc, setDesc] = useState("");
  //Employee data
  const [employees, setEmployees] = useState([]);
  
  const [submitted, setSubmitted] = useState(false);

  //Functions

  //Handles new employee data
  const handleEmployee = (e) => {
    const index = e.target.value;
    setEmployeesNumber(index);
    const tempEmployee = Array.from({ length: index }, (_, i) => ({
      name: "",
      email: "",
      jobTitle: "",
      age: "",
      cv: null,
      id: i,
    }));
    setEmployees(tempEmployee);
  };

  //Sets new employee values to corresponding fields
  const setEmployeeValue = (employees, field, value, index) => {
    let tempEmployee = [...employees];
    tempEmployee[index][field] = value;
    return tempEmployee;
  };

  //Creates and returns valid json array format
  const insertJsonData = () => {
    let data = [...employees];
    const validEmployees = employees.filter((employee) => employee.name !== "");

    data = {
      companyName: companyName,
      companyEmail: companyEmail,
      employeesNumber: employeesNumber,
      description: desc,
      employees: [],
    };

    for (let i = 0; i < employeesNumber; i++) {
      data.employees.push(employees[i]);
    }

    return data;
  };

  //Posts employee data to server
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const data = insertJsonData();
    console.log(data);

    try {
      const response = await fetch("/result", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const parseResponse = await response.json();
      if (response.ok) {
        console.log("Sent data to: localhost:8000");
      } else {
        console.error(
          "Error: You might have to start server.js or configure it!"
        );
      }
    } catch (e) {
      console.error(e.message);
    }
    window.scrollTo(0, document.body.scrollHeight);
  };

  /*useEffect (() => {
    console.log(employees);
  },[employees])*/

  //Return Jsx
  return (
    <>
      <div className="App">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-container">
            <div className="form-holder">
              <div className="form-text-holder">
                <p className="form-title">Company Data</p>
                <p className="form-item">Company Name:</p>
                <input
                  className="form-item"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <p className="form-item-email">Email:</p>
                <input
                  className="form-item-email"
                  type="email"
                  required
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
                <p className="form-item">Number of Employees:</p>
                <input
                  className="form-item"
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={employeesNumber}
                  onChange={handleEmployee}
                />
                <p className="form-item">Description:</p>
                <textarea
                  className="form-item"
                  rows="4"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="form-holder">
              <input type="submit" value="Submit" />
            </div>
          </div>
          {employees.map((employee, i /*Render employees dynamically*/) => (
            <div className="form-container" key={employee.id}>
              <div className="form-holder">
                <div className="form-text-holder">
                  <p className="form-title">Employee Data</p>
                  <p className="form-item">Name:</p>
                  <input
                    className="form-item"
                    type="text"
                    required
                    value={employee.name}
                    onChange={(e) =>
                      setEmployees(
                        setEmployeeValue(employees, "name", e.target.value, i)
                      )
                    }
                  />
                  <p className="form-item-email">Email:</p>
                  <input
                    className="form-item-email"
                    type="email"
                    required
                    value={employee.email}
                    onChange={(e) =>
                      setEmployees(
                        setEmployeeValue(employees, "email", e.target.value, i)
                      )
                    }
                  />

                  <p className="form-item">Job Title:</p>
                  <select
                    className="form-item"
                    required
                    value={employee.jobTitle}
                    onChange={(e) =>
                      setEmployees(
                        setEmployeeValue(
                          employees,
                          "jobTitle",
                          e.target.value,
                          i
                        )
                      )
                    }
                  >
                    <option>Select a title!</option>
                    <option>Accountant</option>
                    <option>Software Developer</option>
                    <option>Software Tester</option>
                    <option>Manager</option>
                  </select>
                  <p className="form-item">Age:</p>
                  <input
                    className="form-item"
                    type="number"
                    min="18"
                    max="100"
                    required
                    value={employee.age}
                    onChange={(e) =>
                      setEmployees(
                        setEmployeeValue(employees, "age", +e.target.value, i)
                      )
                    }
                  />
                  <p className="form-item">CV:</p>
                  <input
                    className="form-item"
                    type="file"
                    accept="application/pdf"
                    required
                    value={employee.cv}
                    onChange={(e) =>
                      setEmployees(
                        setEmployeeValue(employees, "cv", e.target.value, i)
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <div>
            {submitted ? (
              <div className="form-holder">
                <p>Submitted!</p>

                <pre>{JSON.stringify(insertJsonData(), null, 2)}</pre>

                <a href="">New submission</a>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
